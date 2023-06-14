import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../models/class/usuario';
import { AuthService } from '../services/auth.service';
import { UsuarioService } from '../services/usuarios.service';
import { validarCampoTexto, validarCorreo } from '../validators/validaciones';
import { ToastService } from '../services/toast.service';
import Swal from 'sweetalert2';
import { SwalService } from '../services/swal.service';
import { Acceso } from '../models/enums/acceso';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form!: FormGroup;
  cargando: boolean = false;
  loaderTexto = 'Iniciando Sesión';

  constructor(private router: Router,
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private swalService: SwalService,
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
                validarCampoTexto(6, 100, null, false)
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
      mensajeError += 'Hay campos con errores, por favor corríjalos para iniciar sesión. </br>';

    // if (hayCamposVacios)
    //   mensajeError += 'Hay campos vacíos, por favor complételos para iniciar sesión.';

    if (hayError || hayCamposVacios) {
      this.toastService.error(mensajeError, 'Aviso.');
      this.cargando = false;
    }

    if (!hayError && !hayCamposVacios) {
      this.loguearUsuario();
    }
  }

  public obtenerErrores(errores: any): string[] {
    return Object.keys(errores);
  }


  loguearUsuario() {
    let mensajeError = '';

    this.authService.logIn(this.correo?.value, this.clave?.value)
      .then(async x => {
        let idUsuario = x.user?.uid;
        let verificado = x.user?.emailVerified;
        if (verificado) {

          if (idUsuario != null) {
            await this.usuarioService.traerUsuarioPorId(idUsuario)
              .then(x => {
                if (x != null) {
                  let usuario = x as any;

                  if (usuario.habilitado == Acceso.habilitado) {
                    this.toastService.exito(`Bienvenido/a ${usuario.nombre}, ${usuario.apellido} !`, 'Login exitoso!');
                    this.usuarioService.cargarUsuarioActual(usuario);
                    setTimeout(() => {
                      this.router.navigate(['home']);
                      this.cargando = false;
                    }, 1000);
                  }
                  else {
                    this.authService.logOut();
                    this.swalService.error('Su cuenta no esta habilitada para iniciar sesión.');
                    this.cargando = false;
                  }
                } else
                  mensajeError = 'Ha ocurrido un error al intentar cargar los datos del usuario.';
              }).catch(err => {
              });
          } else
            mensajeError = 'Ha ocurrido un error al intentar cargar los datos del usuario.';
        } else {
          this.authService.logOut();
          this.usuarioService.limpiarUsuarioActual();
          this.swalService.error('¡Debe verificar su correo electrónico! Por favor, revise su bandeja de entrada (incluyendo la carpeta de Spam) y haga clic en el enlace de verificación para completar el proceso.');
          this.cargando = false;
        }

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
          this.toastService.error(mensajeError, 'Aviso.');
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
      correo: 'takak82746@aaorsi.com',
      clave: '111111',
      imagen : '../assets/fotosPerfil/u1.jpg'
    },
    {
      correo: 'jiyivo3885@aaorsi.com',
      clave: '111111',
      imagen : '../assets/fotosPerfil/u2.jpg'
    },
    {
      correo: 'kecon57023@aaorsi.com',
      clave: '111111',
      imagen : '../assets/fotosPerfil/u3.jpg'
    },
    {
      correo: 'yosadoj637@aaorsi.com',
      clave: '111111',
      imagen : '../assets/fotosPerfil/m1.jpg'
    },
    {
      correo: 'fowibis816@aaorsi.com',
      clave: '111111',
      imagen : '../assets/fotosPerfil/m2.jpg'
    },
    {
      correo: 'ritakoh205@akoption.com',
      clave: '111111',
      imagen : '../assets/fotosPerfil/a1.png'
    }
  ];

  cargarUsuarioDefault(usuario: any) {
    this.correo?.setValue(usuario.correo);
    this.clave?.setValue(usuario.clave);
  }
}
