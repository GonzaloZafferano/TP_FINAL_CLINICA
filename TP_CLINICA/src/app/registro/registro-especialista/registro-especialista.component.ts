import { Component } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { forkJoin } from "rxjs";
import { Especialista } from "src/app/models/class/especialista";
import { ValidacionAsync } from "src/app/models/class/validacionAsync";
import { Acceso } from "src/app/models/enums/acceso";
import { Perfil } from "src/app/models/enums/perfil";
import { AuthService } from "src/app/services/auth.service";
import { EspecialidadService } from "src/app/services/especialidad.service";
import { FirestorageService } from "src/app/services/firestorage.service";
import { FormatoService } from "src/app/services/formato.service";
import { SolicitudesService } from "src/app/services/solicitudes.service";
import { SwalService } from "src/app/services/swal.service";
import { ToastService } from "src/app/services/toast.service";
import { UsuarioService } from "src/app/services/usuarios.service";
import { validarCorreo, validarSiCorreoExisteAsync, validarConfirmacionDeClave, validarCampoTexto, validarCampoNumero, validarCampoArchivo, validarSiDniExisteAsync, validarCampoSelect, validarCampoOtro, validarSiEspecialidadExisteAsync } from "src/app/validators/validaciones";
import { v4 } from 'uuid';

@Component({
  selector: 'app-registro-especialista',
  templateUrl: './registro-especialista.component.html',
  styleUrls: ['./registro-especialista.component.css']
})

export class RegistroEspecialistaComponent {
  form!: FormGroup;
  cargando: boolean = false;
  archivos: any = [];
  validarDni: ValidacionAsync;
  validarCorreo: ValidacionAsync;
  validarEspecialidad: ValidacionAsync;
  especialidades: any[] = [];
  especialidadesVisibles: any[] = [];
  especialidadesSeleccionadas: any[] = [];
  textoCarga: string = 'Cargando...';
  suscripcion: any;
  usuarioActual: any;
  //Propiedades
  get nombre() {
    return this.form?.get('nombre');
  }
  set nombre(value: any) {
    this.form?.get('nombre')?.patchValue(value);
  }

  get apellido() {
    return this.form?.get('apellido');
  }
  set apellido(value: any) {
    this.form?.get('apellido')?.patchValue(value);
  }

  get edad() {
    return this.form?.get('edad');
  }
  set edad(value: any) {
    this.form?.get('edad')?.patchValue(value);
  }

  get dni() {
    return this.form?.get('dni');
  }
  set dni(value: any) {
    this.form?.get('dni')?.patchValue(value);
  }

  get correo() {
    return this.form?.get('correo');
  }
  set correo(value: any) {
    this.form?.get('correo')?.patchValue(value);
  }

  get clave() {
    return this.form?.get('clave');
  }
  set clave(value: any) {
    this.form?.get('clave')?.patchValue(value);
  }

  get confirmarClave() {
    return this.form?.get('confirmarClave');
  }
  set confirmarClave(value: any) {
    this.form?.get('confirmarClave')?.patchValue(value);
  }

  get imagen1() {
    return this.form?.get('imagen1');
  }
  set imagen1(value: any) {
    this.form?.get('imagen1')?.patchValue(value);
  }

  get especialidad() {
    return this.form?.get('especialidad');
  }
  set especialidad(value: any) {
    this.form?.get('especialidad')?.patchValue(value);
  }

  get selectEspecialidades() {
    return this.form?.get('selectEspecialidades');
  }
  set selectEspecialidades(value: any) {
    this.form?.get('selectEspecialidades')?.patchValue(value);
  }

  get otroEspecialidad() {
    return this.form?.get('otroEspecialidad');
  }
  set otroEspecialidad(value: any) {
    this.form?.get('otroEspecialidad')?.patchValue(value);
  }

  get otro() {
    return this.form?.get('otro');
  }
  set otro(value: any) {
    this.form?.get('otro')?.patchValue(value);
  }

  constructor(private router: Router,
    private authService: AuthService,
    private swalService: SwalService,
    private especialidadService: EspecialidadService,
    private formatoService: FormatoService,
    private formato: FormatoService,
    private usuarioService: UsuarioService,
    private firestorageService: FirestorageService,
    private solicitudService: SolicitudesService,
    private especialidadesServices: EspecialidadService,
    private toastService: ToastService) {
    this.validarCorreo = new ValidacionAsync();
    this.validarDni = new ValidacionAsync();
    this.validarEspecialidad = new ValidacionAsync();
    this.usuarioActual = null;
  }

  ngOnInit(): void {
    this.usuarioService.obtenerUsuarioActual().then(x => {
      this.usuarioActual = x;
    });

    this.especialidadesServices.obtenerListadoDeEspecialidadesObservable()
      .subscribe(x => {
        this.especialidades = x.map((x: any) => { return { nombre: x.nombre, id: x.id } });
        this.especialidades.unshift({ nombre: 'Otro', id: 0 });
        this.especialidadesVisibles = this.especialidades;
      });

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
          especialidad: new FormControl('', { validators: [validarCampoTexto(1, 150, null)], }),
          otro: new FormControl('',),
          otroEspecialidad: new FormControl('',
            {
              validators: [validarCampoTexto(1, 150, null)],
              asyncValidators: validarSiEspecialidadExisteAsync(this.especialidadesServices, this.validarEspecialidad, this.formato),
              updateOn: "blur"
            }
          ),
          selectEspecialidades: new FormControl('',),
        },
        [validarConfirmacionDeClave(6),
        validarCampoOtro(3, 30, 'otro', 'otroEspecialidad', null, false, true)]
      );
  }

  public obtenerErrores(errores: any): string[] {
    if (this.cargando)
      return [];
    return Object.keys(errores);
  }

  registrarUsuario() {
    if (this.formEsValido())
      this.realizarSolicitud();
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

    if (this.validarCorreo.validando || this.validarDni.validando || this.validarEspecialidad.validando)
      return false;
    return true;
  }

  private realizarSolicitud() {
    this.cargando = true;

    this.desuscribir();

    let especialista = {} as any;
    especialista.id = v4();
    especialista.nombre = this.nombre.value;
    especialista.apellido = this.apellido.value;
    especialista.dni = this.dni.value;
    especialista.correo = this.formato.eliminarEspaciosYPasarAMin_May(this.correo.value);
    especialista.edad = this.edad.value;
    especialista.habilitado = Acceso.espera;
    especialista.correoRegistrado = true;
    especialista.otroEspecialidad = this.otro.value ? this.formato.eliminarEspaciosYPasarAMin_May(this.otroEspecialidad.value) : '';
    especialista.especialidades = this.especialidadesSeleccionadas.length > 0 ? this.especialidadesSeleccionadas : [];
    especialista.fechaRegistro = new Date();

    if (this.usuarioActual == null) {
      this.solicitudService.cargarSolicitudConIdAsignado(especialista)
        .then(x => {
          this.esperandoHabilitacion(especialista);
        })
    } else if (this.usuarioActual.perfil == Perfil.administrador) {
      this.aceptarAutomaticamente(especialista);
    }
  }

  aceptarAutomaticamente(usuario: any) {
    usuario.habilitado = Acceso.habilitado;

    if (usuario.otroEspecialidad != '') {
      let otraEspecialidad = { id: v4(), nombre: this.formatoService.eliminarEspaciosYPasarAMin_May(usuario.otroEspecialidad) };
      this.especialidadService.cargarEspecialidadConIdAsignado(otraEspecialidad).then(x => {
        usuario.especialidades.push(otraEspecialidad);
        this.cargarUsuarioAceptado(usuario);
      });
    } else {
      this.cargarUsuarioAceptado(usuario);
    }
  }

  cargarUsuarioAceptado(especialista: any) {
    this.authService.registrarUsuarioConVerificacion(this.correo?.value, this.clave?.value)
      .then(x => {
        let idUsuario = x.user?.uid;
        if (idUsuario != null && idUsuario != undefined) {
          this.solicitudService.eliminarSolicitud(especialista.id).then(x => {
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
                let usuario = new Especialista();
                usuario.apellido = especialista.apellido;
                usuario.correo = especialista.correo;
                usuario.correoRegistrado = especialista.correoRegistrado;
                usuario.dni = especialista.dni;
                usuario.edad = especialista.edad;
                usuario.especialidades = especialista.especialidades;
                usuario.fechaRegistro = especialista.fechaRegistro;
                usuario.imagen = urls[0];;
                usuario.nombre = especialista.nombre;
                usuario.id = idUsuario ?? '';
                usuario.habilitado = Acceso.habilitado;

                this.usuarioService.cargarUsuarioConIdAsignado(usuario).then(x => {
                  this.cargando = false;

                  if (this.usuarioActual == null) {
                    this.toastService.exito('Se ha habilitado su ingreso!', 'Aviso.', 3500);
                  }
                  this.authService.logOut();
                  this.usuarioService.limpiarUsuarioActual();
                  this.swalService.exito('El registro se ha completado exitosamente. Por favor, ingrese a su cuenta para verificar su correo electrónico y, a continuación, inicie sesión.', 'AVISO');
                  this.router.navigate(['../login']);
                });
              }
            });
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
    this.limpiarEspecialidad();
    this.textoCarga = 'Cargando...';
  }

  limpiarEspecialidad() {
    this.especialidadesSeleccionadas = [];
    this.especialidadesVisibles = this.especialidades;
    this.selectEspecialidades.enable();
    this.selectEspecialidades = -1;
    this.especialidad = '';
    this.otroEspecialidad = '';
    this.otro = false;
  }

  checked(event: any) {
    if (!event.target.checked)
      this.limpiarEspecialidad();
  }

  seleccion(event: any) {
    let id = event.target.value;
    let especialidad = this.especialidades.filter(x => x.id == id)[0];

    if (especialidad.id == 0) {
      this.especialidad = especialidad.nombre;
      this.otro = true;
      this.selectEspecialidades.disable();
    } else {
      if (this.especialidad.value == '')
        this.especialidad = especialidad.nombre;
      else
        this.especialidad = `${this.especialidad.value}/${especialidad.nombre}`;

      this.especialidadesSeleccionadas.push(especialidad);
      this.especialidadesVisibles = this.especialidades.filter(x => !this.especialidadesSeleccionadas.includes(x));
      this.selectEspecialidades = -1;
    }
  }

  async esperandoHabilitacion(especialista: any) {
    this.desuscribir();

    this.textoCarga = 'Aguarde unos instantes. Esperando habilitación...';
    this.suscripcion = this.solicitudService.traerSolicitudPorId_Observable(especialista.id).subscribe((x: any) => {
      if (x && x.length == 1) {
        let usuario = x[0];
        if (usuario && usuario.habilitado != Acceso.espera) {
          if (usuario.habilitado == Acceso.habilitado) {
            this.cargarUsuarioAceptado(usuario);
          }
          else if (usuario.habilitado == Acceso.rechazado) {
            this.solicitudService.eliminarSolicitud(usuario.id).then(x => {
              this.cargando = false;
              this.toastService.error('Se ha rechazado su solicitud. Motivo: ' + usuario.mensajeEstado, 'Aviso', 4000);
            });
          }
        }
      }
    });
  }

  desuscribir() {
    if (this.suscripcion)
      this.suscripcion.unsubscribe();
  }
}
