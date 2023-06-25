import { Component } from '@angular/core';
import { Perfil } from 'src/app/models/enums/perfil';
import { HcService } from 'src/app/services/hc.service';
import { PdfService } from 'src/app/services/pdf.service';
import { SwalService } from 'src/app/services/swal.service';
import { UsuarioService } from 'src/app/services/usuarios.service';
import { SortBySecondsPipe } from 'src/app/shared/pipes/sort-by-seconds.pipe';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { HorariosService } from 'src/app/services/horarios.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  // animations: [
  //   trigger('fadeAnimation', [
  //     transition(':enter', [
  //       style({ opacity: 0 }),
  //       animate('1000ms', style({ opacity: 1 }))
  //     ]),
  //     transition(':leave', [
  //       animate('1000ms', style({ opacity: 0 }))
  //     ])
  //   ])
  // ]
})
export class PerfilComponent {
  usuario: any;
  horarios: any[] = [];
  tieneHorarios: boolean = true;
  esAdmin: boolean = false;
  cargando: boolean = false;
  esUsuario: boolean = false;
  esEspecialista: boolean = false;
  usuarioObservable: any;
  suscripcion: any;
  mostrarHC: boolean = false;
  historiaClinica: any;
  ordenPipe: any;
  spinner: boolean = false;
  especialistas: any;
  filaSeleccionada: any;
  constructor(
    private usuarioService: UsuarioService,
    private horarioService: HorariosService,
    private pdfService: PdfService,
    private historiaService: HcService, private swalService: SwalService
  ) { }

  async ngOnInit() {
    this.usuario = await this.usuarioService.obtenerUsuarioActual();
    this.ordenPipe = new SortBySecondsPipe();
    if (this.usuario) {
      this.esAdmin = this.usuario.perfil == Perfil.administrador;
      this.esEspecialista = this.usuario.perfil == Perfil.especialista;
      this.esUsuario = this.usuario.perfil == Perfil.paciente;
    }
    this.suscripcion = this.usuarioService.traerUsuarioPorId_Observable(this.usuario.id).subscribe(x => {
      if (x && x.length > 0) {
        this.usuarioObservable = x[0];
      }
    });

    if (this.esUsuario) {
      this.spinner = true;

      let turnos = await this.horarioService.obtenerListaDeItems();
      turnos = turnos.filter(x => x['idPaciente'] == this.usuario.id);
      turnos = turnos.map(x => x['medico']);

      const listaUnica = turnos.filter(
        (medico: any, index, self) =>
          index === self.findIndex((p: any) => p.id === medico.id)
      );
      this.especialistas = listaUnica;
      this.spinner = false;
    }
  }

  cargarHorarios() {
  }

  //public usuario: any = null;
  public especialidades: any;
  especialidad_elegida: string = '0';
  // tieneHorarios: boolean | any;
  horariosActuales: any;
  dias_check: Array<any> = [
    { dia: 'lunes', trabaja: false, ingreso: 0, salida: 0 },
    { dia: 'martes', trabaja: false, ingreso: 0, salida: 0 },
    { dia: 'miércoles', trabaja: false, ingreso: 0, salida: 0 },
    { dia: 'jueves', trabaja: false, ingreso: 0, salida: 0 },
    { dia: 'viernes', trabaja: false, ingreso: 0, salida: 0 },
    { dia: 'sábado', trabaja: false, ingreso: 0, salida: 0 }
  ];
  listaHorarios: string[] = ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
  listaHorariossalida: string[] = ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];

  // constructor(private horariosSrv: HorariosService, private router: Router) {
  //   let ls = localStorage.getItem('usuario_clinica');
  //   if (ls != null) {
  //     this.usuario = JSON.parse(ls);
  //     this.especialidades = this.usuario.espe;
  //   }
  // }


  guardar() {
    let especialidad_guardar = {
      uidEspecialista: this.usuario.uid,
      especialidad: this.especialidad_elegida,
      horarios: this.dias_check
    }

    if (this.tieneHorarios) {

      console.log('tiene horarios previos.->actualizar:: ' + this.horariosActuales.doc_id)


      //  this.horariosSrv.actualizarHorario( this.horariosActuales.doc_id, especialidad_guardar).finally(() => {
      //     this.router.navigate(['miperfil'])
      //   });
      // } else {
      //   console.log('no tiene horarios previos->cargar de cero')

      // this.horariosSrv.setItem(especialidad_guardar).finally(() =>
      //           this.router.navigate(['miperfil'])
      //         );
    }

  }


  capturar() {
    console.log(this.especialidad_elegida);
    //   this.horariosSrv.traerHorariosEspecialista_Especialidad(this.usuario.uid, this.especialidad_elegida).subscribe((res) => {
    //      if(res.length==1){
    //       console.log(res[0].doc_id)

    //       this.horariosActuales= res[0];
    //        this.tieneHorarios=true;
    //      }else{
    //        this.tieneHorarios=false;
    //      }  
    //      console.log('hroarios= '+this.tieneHorarios) 
    // })
  }

  async verHC() {
    this.cargando = true;
    //if (this.usuario.tieneHC) {

    let hc = await this.historiaService.traerListaFiltradaPor_UN_Campo('pacienteId', this.usuario.id);

    if (hc && hc.length > 0) {
      this.historiaClinica = hc[0];
      this.mostrarHC = true;
      this.cargando = false;
    }
    //  }
    else {
      this.cargando = false;
      this.swalService.info('No posee historia clínica aún.');
    }
  }

  cerrarHC() {
    this.mostrarHC = false;
  }

  async descargarPDF() {
    this.cargando = true;
    //  if (this.usuario.tieneHC) {
    let hc: any = await this.historiaService.traerListaFiltradaPor_UN_Campo('pacienteId', this.usuario.id);

    if (hc && hc.length > 0) {
      hc = hc[0];
      let contenido: string[] = [];
      let titulo = `Historia Clínica: ${this.usuario.apellido}, ${this.usuario.nombre}`;

      let sub1 = "Datos Actuales:";
      let sub2 = "Historial:";
      let altura = 'Altura: ' + hc['altura'] + ' mt. ';
      let peso = 'Peso: ' + hc['peso'] + 'kg. ';
      let temperatura = 'Temperatura: ' + hc['temperatura'] + '°C. ';
      let presion = 'Presión: ' + `${hc['presion1']}/${hc['presion2']}mmHg. `;

      let datosFijos = altura + peso + temperatura + presion;

      contenido.push(sub1);
      contenido.push(datosFijos);
      contenido.push(sub2);

      let datos = this.ordenPipe.transform(hc['datos'], true);
      for (let i = 0; i < datos.length; i++) {
        let dato = datos[i];
        let fecha = new Date(dato.fechaHC).toLocaleString();
        let texto =
          `Fecha: ${fecha}. Especialista: ${dato.medico.apellido}, ${dato.medico.nombre}. Especialidad: ${dato.especialidad}. Altura: ${dato.altura} mt. Peso: ${dato.peso} kg. Temperatura: ${dato.temperatura} °C. Presión: ${dato.presion1}/${dato.presion2}mmHg. Datos Adicionales: `;

        if (dato.hayDatos) {
          for (let prop in dato) {
            if (prop != 'medico' && prop != 'altura' &&
              prop != 'especialidad' && prop != 'fechaHC' &&
              prop != 'hayDatos' && prop != 'presion1' &&
              prop != 'presion2' && prop != 'peso' && prop != 'temperatura'
            ) {
              texto += `${prop}: ${dato[prop]}. `;
            }
          }
        } else {
          texto += ' - ';
        }

        contenido.push(texto);
      }

      this.pdfService.generatePDF(titulo, contenido);

      this.cargando = false;
    }
    // }
    else {
      this.cargando = false;
      this.swalService.info('No posee historia clínica aún.');
    }
  }



 async seleccionEspecialista(especialista: any) {
    this.cargando = true;
    //  if (this.usuario.tieneHC) {
    let hc: any = await this.historiaService.traerListaFiltradaPor_UN_Campo('pacienteId', this.usuario.id);
   
    if (hc && hc.length > 0) {
      hc = hc[0];
      let contenido: string[] = [];
      let titulo = `Historia Clínica: ${this.usuario.apellido}, ${this.usuario.nombre}`;

      let sub1 = "Datos Actuales:";
      let sub2 = "Historial:";
      let altura = 'Altura: ' + hc['altura'] + ' mt. ';
      let peso = 'Peso: ' + hc['peso'] + 'kg. ';
      let temperatura = 'Temperatura: ' + hc['temperatura'] + '°C. ';
      let presion = 'Presión: ' + `${hc['presion1']}/${hc['presion2']}mmHg. `;

      let datosFijos = altura + peso + temperatura + presion;

      contenido.push(sub1);
      contenido.push(datosFijos);
      contenido.push(sub2);

      let datos = this.ordenPipe.transform(hc['datos'], true);
      datos = datos.filter((x:any) => x.medico.id == especialista.id);
      for (let i = 0; i < datos.length; i++) {
        let dato = datos[i];
        let fecha = new Date(dato.fechaHC).toLocaleString();
        let texto =
          `Fecha: ${fecha}. Especialista: ${dato.medico.apellido}, ${dato.medico.nombre}. Especialidad: ${dato.especialidad}. Altura: ${dato.altura} mt. Peso: ${dato.peso} kg. Temperatura: ${dato.temperatura} °C. Presión: ${dato.presion1}/${dato.presion2}mmHg. Datos Adicionales: `;

        if (dato.hayDatos) {
          for (let prop in dato) {
            if (prop != 'medico' && prop != 'altura' &&
              prop != 'especialidad' && prop != 'fechaHC' &&
              prop != 'hayDatos' && prop != 'presion1' &&
              prop != 'presion2' && prop != 'peso' && prop != 'temperatura'
            ) {
              texto += `${prop}: ${dato[prop]}. `;
            }
          }
        } else {
          texto += ' - ';
        }

        contenido.push(texto);
      }

      this.pdfService.generatePDF(titulo, contenido);

      this.cargando = false;
    }
    // }
    else {
      this.cargando = false;
      this.swalService.info('No posee historia clínica aún.');
    }
  }
}