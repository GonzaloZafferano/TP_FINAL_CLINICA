import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Usuario } from 'src/app/models/class/usuario';
import { ValidacionAsync } from 'src/app/models/class/validacionAsync';
import { Acceso } from 'src/app/models/enums/acceso';
import { AuthService } from 'src/app/services/auth.service';
import { FirestorageService } from 'src/app/services/firestorage.service';
import { FormatoService } from 'src/app/services/formato.service';
import { HcService } from 'src/app/services/hc.service';
import { SwalService } from 'src/app/services/swal.service';
import { ToastService } from 'src/app/services/toast.service';
import { UsuarioService } from 'src/app/services/usuarios.service';
import { validarCampoTexto, validarCampoNumero, validarSiDniExisteAsync, validarCampoArchivo, validarCorreo, validarSiCorreoExisteAsync, validarConfirmacionDeClave, validarCampoNumero_V2, validarCamposKeyValue, validarCamposKeyValue_v2, validarCamposKeyValue_v3 } from 'src/app/validators/validaciones';
import { v4 } from 'uuid';

@Component({
  selector: 'app-cargar-historia',
  templateUrl: './cargar-historia.component.html',
  styleUrls: ['./cargar-historia.component.css']
})
export class CargarHistoriaComponent {
  form!: FormGroup;
  cargando: boolean = false;
  @Output() onHCCompleta: EventEmitter<any> = new EventEmitter();
  @Output() onHCCancelada: EventEmitter<any> = new EventEmitter();
  @Input() paciente: any;
  usuarioActual: any;
  HC: any;
  esNueva: boolean = false;
  //Propiedades
  get altura() {
    return this.form?.get('altura');
  }
  set altura(value: any) {
    this.form?.get('altura')?.patchValue(value);;
  }

  get peso() {
    return this.form?.get('peso');
  }
  set peso(value: any) {
    this.form?.get('peso')?.patchValue(value);;
  }

  get temperatura() {
    return this.form?.get('temperatura');
  }
  set temperatura(value: any) {
    this.form?.get('temperatura')?.patchValue(value);;
  }

  get dni() {
    return this.form?.get('dni');
  }
  set dni(value: any) {
    this.form?.get('dni')?.patchValue(value);;
  }

  get presion1() {
    return this.form?.get('presion1');
  }
  set presion1(value: any) {
    this.form?.get('presion1')?.patchValue(value);;
  }

  get presion2() {
    return this.form?.get('presion2');
  }
  set presion2(value: any) {
    this.form?.get('presion2')?.patchValue(value);;
  }

  get opcionalNombre1() {
    return this.form?.get('opcionalNombre1');
  }
  set opcionalNombre1(value: any) {
    this.form?.get('opcionalNombre1')?.patchValue(value);;
  }

  get opcionalNombre2() {
    return this.form?.get('opcionalNombre2');
  }
  set opcionalNombre2(value: any) {
    this.form?.get('opcionalNombre2')?.patchValue(value);;
  }

  get opcionalNombre3() {
    return this.form?.get('opcionalNombre3');
  }
  set opcionalNombre3(value: any) {
    this.form?.get('opcionalNombre3')?.patchValue(value);;
  }

  get opcionalValor1() {
    return this.form?.get('opcionalValor1');
  }
  set opcionalValor1(value: any) {
    this.form?.get('opcionalValor1')?.patchValue(value);;
  }

  get opcionalValor2() {
    return this.form?.get('opcionalValor2');
  }
  set opcionalValor2(value: any) {
    this.form?.get('opcionalValor2')?.patchValue(value);;
  }

  get opcionalValor3() {
    return this.form?.get('opcionalValor3');
  }
  set opcionalValor3(value: any) {
    this.form?.get('opcionalValor3')?.patchValue(value);;
  }

  constructor(private router: Router,
    private authService: AuthService,
    private formato: FormatoService,
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    private swalService: SwalService,
    private hcService: HcService,
    private firestorageService: FirestorageService,
    private toastService: ToastService) {
  }

  async ngOnInit() {
    this.form = new FormGroup
      (
        {
          altura: new FormControl('', { validators: [validarCampoNumero_V2(0.2, 2.5)], }),
          peso: new FormControl('', { validators: [validarCampoNumero_V2(1, 300)], }),
          temperatura: new FormControl('', { validators: [validarCampoNumero_V2(30, 45)], }),
          presion1: new FormControl('', { validators: [validarCampoNumero_V2(50, 140, null, true)], }),
          presion2: new FormControl('', { validators: [validarCampoNumero_V2(40, 90, null, true)], }),
          opcionalNombre1: new FormControl('',),
          opcionalNombre2: new FormControl('',),
          opcionalNombre3: new FormControl('',),
          opcionalValor1: new FormControl('',),
          opcionalValor2: new FormControl('',),
          opcionalValor3: new FormControl('',),
        },
        [validarCamposKeyValue(1, 20, null, true, false),
        validarCamposKeyValue_v2(1, 20, null, true, false),
        validarCamposKeyValue_v3(1, 20, null, true, false),
        ]
      );

    this.usuarioActual = this.usuarioService.usuarioAuth;

    let hc = await this.hcService.traerListaFiltradaPor_UN_Campo('pacienteId', this.paciente.id);

    if (hc.length > 0) {
      this.HC = hc[0];

      this.altura = this.HC.altura;
      this.peso = this.HC.peso;
      this.presion1 = this.HC.presion1;
      this.presion2 = this.HC.presion2;
      this.temperatura = this.HC.temperatura;
    }
    else {
      this.esNueva = true;
      this.HC = {} as any;
      this.HC.datos = [];
      this.HC.id = v4();
      this.HC.usuario = this.paciente;
    }
  }

  public obtenerErrores(errores: any): string[] {
    if (this.cargando)
      return [];
    return Object.keys(errores);
  }

  cargarHC() {
    if (this.formEsValido()) {
      this.HC.altura = this.altura.value;
      this.HC.peso = this.peso.value;
      this.HC.temperatura = this.temperatura.value;
      this.HC.presion1 = this.presion1.value;
      this.HC.presion2 = this.presion2.value;

      let hayDatos = false;
      let datos = {} as any;
      datos.id
      datos.fechaHC = new Date().getTime();
      if (this.opcionalNombre1.value != '') {
        datos[this.opcionalNombre1.value] = this.opcionalValor1.value;
        hayDatos = true;
      }
      if (this.opcionalNombre2.value != '') {
        datos[this.opcionalNombre2.value] = this.opcionalValor2.value;
        hayDatos = true;

      }
      if (this.opcionalNombre3.value != '') {
        datos[this.opcionalNombre3.value] = this.opcionalValor3.value;
        hayDatos = true;
      }
      datos.altura = this.altura.value;
      datos.peso = this.peso.value;
      datos.temperatura = this.temperatura.value;
      datos.presion1 = this.presion1.value;
      datos.presion2 = this.presion2.value;
      datos.medico = this.usuarioActual;
      datos.especialidad = this.paciente?.especialidad;

      datos.hayDatos = hayDatos;
      //SI ES TRUE, LOS RECORRO DESPUES. SI ES FALSE, PONGO - : - Se puede hacer en un pipe.

      this.HC.datos.push(datos);

      if (!this.esNueva) {
        this.hcService.modificarItem(this.HC).finally(() => {
          this.onHCCompleta.emit({ paciente: this.paciente, datos: datos, cargo: hayDatos });
        });
      } else {
        this.paciente.tieneHC = true;
        this.paciente.HCId = this.HC.id;
        this.HC.pacienteId = this.paciente.id;
        this.HC.paciente = this.paciente;
        this.hcService.cargarItemConIdAsignado(this.HC).finally(() => {
          this.onHCCompleta.emit({ paciente: this.paciente, datos: datos, cargo: hayDatos });
        });
      }
    }
    else
      this.toastService.error('Hay campos con errores. <br>Por favor corrijalos y vuelva a intentar', 'Aviso.');
  }


  private formEsValido() {
    for (const control in this.form.controls) {
      if (this.form.controls.hasOwnProperty(control)) {
        const item = this.form.controls[control];
        if (item?.errors)
          return false;
      }
    }
    return true;
  }

  public limpiarFormulario() {
    this.form.reset();
    for (const control in this.form.controls) {
      if (this.form.controls.hasOwnProperty(control)) {
        const item = this.form.controls[control];
        item.setValue('');
      }
    }
  }

  cancelaHC() {
    this.onHCCancelada.emit();
  }
}
