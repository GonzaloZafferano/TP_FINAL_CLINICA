import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { forkJoin } from "rxjs";
import { Administrador } from "src/app/models/class/administrador";
import { Usuario } from "src/app/models/class/usuario";
import { ValidacionAsync } from "src/app/models/class/validacionAsync";
import { Acceso } from "src/app/models/enums/acceso";
import { AuthService } from "src/app/services/auth.service";
import { FirestorageService } from "src/app/services/firestorage.service";
import { FormatoService } from "src/app/services/formato.service";
import { SwalService } from "src/app/services/swal.service";
import { ToastService } from "src/app/services/toast.service";
import { UsuarioService } from "src/app/services/usuarios.service";
import { validarCorreo, validarSiCorreoExisteAsync, validarConfirmacionDeClave, validarCampoTexto, validarCampoNumero, validarCampoArchivo, validarSiDniExisteAsync } from "src/app/validators/validaciones";

@Component({
  selector: 'app-registro-admin',
  templateUrl: './registro-admin.component.html',
  styleUrls: ['./registro-admin.component.css']
})

export class RegistroAdminComponent {
  form!: FormGroup;
  cargando: boolean = false;
  archivos: any = [];
  validarDni: ValidacionAsync;
  validarCorreo: ValidacionAsync;

  //Propiedades
  get nombre() {
    return this.form?.get('nombre');
  }
  set nombre(value: any) {
    this.form?.get('nombre')?.patchValue(value);;
  }

  get apellido() {
    return this.form?.get('apellido');
  }
  set apellido(value: any) {
    this.form?.get('apellido')?.patchValue(value);;
  }

  get edad() {
    return this.form?.get('edad');
  }
  set edad(value: any) {
    this.form?.get('edad')?.patchValue(value);;
  }

  get dni() {
    return this.form?.get('dni');
  }
  set dni(value: any) {
    this.form?.get('dni')?.patchValue(value);;
  }

  get correo() {
    return this.form?.get('correo');
  }
  set correo(value: any) {
    this.form?.get('correo')?.patchValue(value);;
  }

  get clave() {
    return this.form?.get('clave');
  }
  set clave(value: any) {
    this.form?.get('clave')?.patchValue(value);;
  }

  get confirmarClave() {
    return this.form?.get('confirmarClave');
  }
  set confirmarClave(value: any) {
    this.form?.get('confirmarClave')?.patchValue(value);;
  }

  get imagen1() {
    return this.form?.get('imagen1');
  }
  set imagen1(value: any) {
    this.form?.get('imagen1')?.patchValue(value);;
  }

  constructor(private router: Router,
    private authService: AuthService,
    private formato: FormatoService,
    private usuarioService: UsuarioService,
    private swalService : SwalService,
    private firestorageService: FirestorageService,
    private toastService: ToastService) {
    this.validarCorreo = new ValidacionAsync();
    this.validarDni = new ValidacionAsync();
  }

  ngOnInit(): void {
    this.form = new FormGroup
      (
        {
          nombre: new FormControl('', { validators: [validarCampoTexto(3, 30, null, true, true)], }),
          apellido: new FormControl('', { validators: [validarCampoTexto(3, 30, null, true, true)], }),
          edad: new FormControl('', { validators: [validarCampoNumero(18, 99)] }),
          dni: new FormControl('',
            {
              validators: [validarCampoNumero(10000000, 99999999)],
              asyncValidators: validarSiDniExisteAsync(this.usuarioService, this.validarDni),
              updateOn: "blur"
            }),
          imagen1: new FormControl('', { validators: [validarCampoArchivo()] }),
          correo: new FormControl('',
            {
              validators: [validarCorreo()],
              asyncValidators: validarSiCorreoExisteAsync(this.usuarioService, this.validarCorreo, this.formato),
              updateOn: "blur"
            }),
          clave: new FormControl('', { validators: [validarCampoTexto(6, 20, null, false, false)], }),
          confirmarClave: new FormControl('', { validators: [validarCampoTexto(6, 20, null, false, false)], }),
        },
        [validarConfirmacionDeClave(6)]
      );
  }

  public obtenerErrores(errores: any): string[] {
    if (this.cargando)
      return [];
    return Object.keys(errores);
  }

  registrarUsuario() {
    if (this.formEsValido())
      this.registrarUsuarioEnFirestore();
    else
      this.toastService.error('Hay campos con errores. <br>Por favor corrijalos y vuelva a intentar', 'Registro inválido.');
  }

  cargarArchivo(indice: number, event: any) {
    this.archivos[indice] = event?.target?.files[0];
  }

  private formEsValido() {
    for (const control in this.form.controls) {
      if (this.form.controls.hasOwnProperty(control)) {
        const item = this.form.controls[control];
        if (item?.errors)
          return false;
      }
    }

    if (this.validarCorreo.validando || this.validarDni.validando)
      return false;
    return true;
  }

  private registrarUsuarioEnFirestore() {
    this.cargando = true;

    this.authService.registrarUsuarioConVerificacion(this.correo?.value, this.clave?.value)
      .then(x => {
        let idUsuario = x.user?.uid;
        if (idUsuario != null) {
          let observables: any[] = [];

          //Creo un observable por cada archivo (lo guardo en un array), y me suscribo a ellos.
          for (const archivo of this.archivos) {
            let observable = this.firestorageService.guardarArchivo(archivo, 'fotosUsuario/' + this.nombre.value + '_' + Math.floor(Math.random() * 1000) + '_' + this.formato.fechaToString(new Date(), false, true));
            observable.subscribe(url => {
              return url;
            });
            observables.push(observable);
          }

          forkJoin(observables).subscribe((urls: any) => {
            if (urls && urls.length == 1) {

              let administrador = new Administrador();
              administrador.id = idUsuario ?? '';
              administrador.nombre = this.nombre.value;
              administrador.apellido = this.apellido.value;
              administrador.dni = this.dni.value;
              administrador.correo = this.formato.eliminarEspaciosYPasarAMin_May(this.correo.value);
              administrador.edad = this.edad.value;
              administrador.habilitado = Acceso.habilitado;
              administrador.correoRegistrado = true;
              administrador.imagen = urls[0];
              administrador.fechaRegistro = new Date();

              this.usuarioService.cargarUsuarioConIdAsignado(administrador)
                .then(x => {              
                  this.limpiarFormulario();
                  this.cargando = false;
                  this.toastService.exito('El registro se ha completado exitosamente!.', 'Registro exitoso');
                  this.authService.logOut();
                  this.usuarioService.limpiarUsuarioActual();
                  this.swalService.exito('El registro se ha completado exitosamente. Por favor, ingrese a su cuenta para verificar su correo electrónico y, a continuación, inicie sesión.', 'AVISO');
                  this.router.navigate(['../login']);
                })
            }
          })
        }
        else {
          this.toastService.error('Ha ocurrido un error al intentar guardar los datos del usuario registrado.', 'Ha ocurrido un error.');
          this.cargando = false;
        }
      })
      .catch((e) => {
        this.obtenerErrorAuth(e);
      });
  }

  obtenerErrorAuth(e: any) {
    let mensajeError = '';
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
      this.toastService.error(mensajeError, 'Ha ocurrido un error!');
      this.cargando = false;
    }
  }

  public limpiarFormulario() {
    this.form.reset();
    this.archivos = [];
    for (const control in this.form.controls) {
      if (this.form.controls.hasOwnProperty(control)) {
        const item = this.form.controls[control];
        item.setValue('');
      }
    }
  }
}
