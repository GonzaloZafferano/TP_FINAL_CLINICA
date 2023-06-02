import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Usuario } from "../models/class/usuario";
import { validarSiUsuarioExisteAsync, validarCorreo, validarSiCorreoExisteAsync, validarConfirmacionDeClave } from "../validators/validaciones";
import { UsuarioService } from "../services/usuarios.service";
import { AuthService } from "../services/auth.service";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  form!: FormGroup;
  cargando: boolean = false;

  constructor(private router: Router, private authService: AuthService, private usuarioService: UsuarioService, 
    //private toastPredeterminado: ToastPredeterminadosService
    ) { }

  ngOnInit(): void {
    this.form = new FormGroup
      (
        {
          nombreUsuario: new FormControl('',
            {
              validators: [Validators.pattern('^[a-zA-Z1-9]+$')],
              asyncValidators: validarSiUsuarioExisteAsync(this.usuarioService),
              updateOn: 'blur'
            }
          ),
          correo: new FormControl('',
            {
              validators: [validarCorreo()],
              asyncValidators: validarSiCorreoExisteAsync(this.usuarioService),
              updateOn: 'blur',
            }
          ),
          clave: new FormControl('',
            {
              validators: [
                Validators.minLength(6)
              ]
            }
          ),
          confirmarClave: new FormControl('')
        },
        [validarConfirmacionDeClave(6)]
      );
  }

  get nombreUsuario() {
    return this.form.get('nombreUsuario');
  }
  get correo() {
    return this.form.get('correo');
  }
  get clave() {
    return this.form.get('clave');
  }
  get confirmarClave() {
    return this.form.get('confirmarClave');
  }

  registrarUsuario() {
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

    if (hayError || hayCamposVacios) {
  //    this.toastPredeterminado.error(mensajeError, 'Registro inválido.');
      this.cargando = false;
    }

    if (!hayError && !hayCamposVacios) {
      this.registrarUsuarioEnFirestore();
    }
  }

  private registrarUsuarioEnFirestore() {
    let mensajeError = '';
    this.authService.registrarUsuario(this.correo?.value, this.clave?.value)
      .then(x => {
        let idUsuario = x.user?.uid;

        if (idUsuario != null) {
          let usuario = new Usuario();
          this.limpiarFormulario();
          this.usuarioService.cargarUsuarioConIdAsignado(usuario)
            .then(
              x => {
             //this.logDeUsuario.cargarUsuarioConIdAsignado(new Log(usuario.id));
             //   this.toastPredeterminado.exito('El registro se ha completado exitosamente!.', 'Registro exitoso');
             
                this.router.navigate(['../home']);

                setTimeout(() => {
                  this.cargando = false;                  
                }, 1000);
              }
            )
        } else {
        //  this.toastPredeterminado.error('Ha ocurrido un error al intentar guardar los datos del usuario registrado.', 'Ha ocurrido un error.');
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
          case 'auth/email-already-in-use':
            mensajeError = "El correo electrónico ingresado ya está en uso.";
            break;
          default:
            mensajeError = "Ha ocurrido un error y no se pudo registrar el usuario.";
            break;
        }

        if (mensajeError != '') {
         // this.toastPredeterminado.error(mensajeError, 'Ha ocurrido un error!');
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
}
