import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../models/class/usuario';
import { AuthService } from '../services/auth.service';
import { UsuarioService } from '../services/usuarios.service';
import { validarCorreo } from '../validators/validaciones';
import { ToastService } from '../services/toast.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form!: FormGroup;
  usuario: Usuario = new Usuario();
  cargando: boolean = false;

  constructor(private router: Router, private authService: AuthService, private usuarioService: UsuarioService, 
    private toastService: ToastService
    ) { }

  ngOnInit(): void {

    this.form = new FormGroup
      (
        {
          correo: new FormControl('',
            {
              validators: [validarCorreo()],
            }
          ),
          clave: new FormControl('',
            {
              validators: [
                Validators.minLength(6)
              ]
            }
          ),
        },
      );
  }

  get correo() {
    return this.form.get('correo');
  }
  get clave() {
    return this.form.get('clave');
  }

  iniciarSesion() {
    this.cargando = true;
    let hayError = false;
    let hayCamposVacios = false;

    for (const control in this.form.controls) {
      if (this.form.controls.hasOwnProperty(control)) {
        const item = this.form.controls[control];
        if (item.errors)
          hayError = true;
        if (item.value == null || item.value == '')
          hayCamposVacios = true;
      }
    }

    let mensajeError = '';
    if (hayError)
      mensajeError += 'Hay campos con errores, por favor corríjalos para poder registrarse. </br>';

    if (hayCamposVacios)
      mensajeError += 'Hay campos vacíos, por favor complételos para poder registrarse.';

    if (hayError || hayCamposVacios){
      this.toastService.error(mensajeError, 'Error.');
      this.cargando = false;
    }

    if (!hayError && !hayCamposVacios) {
      this.loguearUsuario();
    }
  }

  loguearUsuario() {
    let mensajeError = '';

    this.authService.registrarUsuario(this.correo?.value, this.clave?.value)
      .then(async x => {
        let idUsuario = x.user?.uid;

        if (idUsuario != null) {
          await this.usuarioService.traerUsuarioPorId(idUsuario)
            .then(x => {
              if (x != null) {
                let usuario = x as any;
               // this.usuario.clave = usuario.clave;
               // this.usuario.correo = usuario.correo;
              // this.usuario.usuario = usuario.usuario;
                this.usuario.id = usuario.id;
              // this.usuario.fechaRegistro = usuario.fechaRegistro;

               
                this.toastService.exito(`Bienvenido/a ${this.usuario}!`, 'Login exitoso!');

              
      
                this.router.navigate(['../home']);

                setTimeout(() => {
                  this.cargando = false;
                }, 1000);
              } else
                mensajeError = 'Ha ocurrido un error al intentar cargar los datos del usuario.';
            }).catch();
        } else
          mensajeError = 'Ha ocurrido un error al intentar cargar los datos del usuario.';

        if (mensajeError != '') {
          this.toastService.error(mensajeError);
          this.cargando = false;
        }
      })
      .catch((e) => {
        switch (e.code) {
          case 'auth/invalid-email':
            mensajeError = "Formato de correo electrónico inválido.";
            break;
          case 'auth/missing-password':
            mensajeError = "Falta ingresar la contraseña.";
            break;
          case 'auth/weak-password':
            mensajeError = "La contraseña debe contener al menos 6 caracteres.";
            break;
          case 'auth/wrong-password':
            mensajeError = 'La contraseña ingresada es inválida.';
            break;
          case 'auth/user-not-found':
            mensajeError = 'Usuario no encontrado.';
            break;
          default:
            mensajeError = "Ha ocurrido un error y no se pudo cargar el usuario.";
            break;
        }
        if (mensajeError != '') {
          this.toastService.error(mensajeError, 'Ha ocurrido un error.');
          this.cargando = false;
        }
      });
  }

  private limpiarFormulario() {
    this.form.reset();
    for (const control in this.form.controls) {
      if (this.form.controls.hasOwnProperty(control)) {
        const item = this.form.controls[control];
        item.setValue('');
      }
    }
  }

  listaUsuarios: any = [
    {
      correo: 'prueba@prueba.com',
      clave: '111111'
    },
    {
      correo: 'test@test.com',
      clave: '111111'
    },
    {
      correo: 'gonzalo@prueba.com',
      clave: '111111'
    }
  ];

  cargarUsuarioDefault(index: number) {
    this.correo?.setValue(this.listaUsuarios[index].correo);
    this.clave?.setValue(this.listaUsuarios[index].clave);
  }
}
