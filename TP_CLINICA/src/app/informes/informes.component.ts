import { Component, ElementRef, ViewChild } from '@angular/core';
import { ExcelService } from '../services/excel.service';
import { LogsService } from '../services/logs.service';
import { Perfil } from '../models/enums/perfil';
import { FormatoService } from '../services/formato.service';
import { SortBySecondsPipe } from '../shared/pipes/sort-by-seconds.pipe';
import { HorariosService } from '../services/horarios.service';
import { EspecialidadService } from '../services/especialidad.service';
import { FormGroup, FormControl } from '@angular/forms';
import { validarCorreo, validarCampoTexto, validarCampoFecha } from '../validators/validaciones';
import { UsuarioService } from '../services/usuarios.service';
import { SwalService } from '../services/swal.service';
import { Chart } from 'chart.js';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.css']
})
export class InformesComponent {
  @ViewChild('graficosC', { static: true }) graficosC!: any;
  @ViewChild('radioTorta', { static: true }) radioTorta!: any;
  // @ViewChild('graficosT', { static: true }) graficosT!: any;
  labels: any = [];
  data: any = [];
  titulo: any;
  suscripcionLogs: any;
  suscripcionTurnos: any;
  cargando: boolean = false;
  turnos: any;
  pipeTiempo: any;
  especialidades: any;
  especialistas: any;
  form: any;
  filaSeleccionada: any;
  mostrar: boolean = true;
  tituloPDF: string = '';
  ultimoGrafico: number = -1;

  constructor(
    private excelService: ExcelService,
    private logService: LogsService,
    private especialidadService: EspecialidadService,
    private usuarioService: UsuarioService,
    private turnosService: HorariosService,
    private formato: FormatoService,
    private swalService: SwalService,
  ) { }

  async ngOnInit() {
    this.cargarForm();
    this.cargando = true;
    this.pipeTiempo = new SortBySecondsPipe();
    this.especialidades = await this.especialidadService.obtenerListaDeEspecialidades();
    let usuarios = await this.usuarioService.obtenerListaDeUsuarios();
    this.especialistas = usuarios.filter(x => x['perfil'] == Perfil.especialista);
    this.suscripcionTurnos = this.turnosService.obtenerListadoDeItemsObservable().subscribe(x => {
      this.turnos = x;
      this.cargando = false;
    });
  }

  ngOnDestroy() {
    if (this.suscripcionLogs)
      this.suscripcionLogs.unsubscribe();

    if (this.suscripcionTurnos)
      this.suscripcionTurnos.unsubscribe();
  }

  // seleccionDeFila(itemSeleccionado: any) {
  //   this.filaSeleccionada = itemSeleccionado;
  // }

  get fechaFin() {
    return this.form?.get('fechaFin');
  }
  set fechaFin(value: any) {
    this.form?.get('fechaFin')?.patchValue(value);;
  }

  get fechaInicio() {
    return this.form?.get('fechaInicio');
  }
  set fechaInicio(value: any) {
    this.form?.get('fechaInicio')?.patchValue(value);;
  }

  get fechaFin2() {
    return this.form?.get('fechaFin2');
  }
  set fechaFin2(value: any) {
    this.form?.get('fechaFin2')?.patchValue(value);;
  }

  get fechaInicio2() {
    return this.form?.get('fechaInicio2');
  }
  set fechaInicio2(value: any) {
    this.form?.get('fechaInicio2')?.patchValue(value);;
  }

  public obtenerErrores(errores: any): string[] {
    return Object.keys(errores);
  }

  cargarForm() {
    this.form = new FormGroup
      (
        {
          fechaInicio: new FormControl('',
            {
              validators: [validarCampoFecha()],
            }
          ),
          fechaFin: new FormControl('',
            {
              validators: [validarCampoFecha()
              ]
            }
          ),
          // fechaInicio2: new FormControl('',
          //   {
          //     validators: [validarCampoFecha()],
          //   }
          // ),
          // fechaFin2: new FormControl('',
          //   {
          //     validators: [validarCampoFecha()
          //     ]
          //   }
          // ),
        },
      );
  }

  descargarLogs() {
    this.suscripcionLogs = this.logService.obtenerListadoDeItemsObservable().subscribe(x => {
      this.cargando = true;
      let logsOrdenados = this.ordenarLogs(x);
      let logs = logsOrdenados.map((x: any) => {
        let pefil = x['usuario'].perfil == Perfil.especialista ? 'Especialista' :
          x['usuario'].perfil == Perfil.administrador ? 'Administrador' : 'Paciente';

        let dia = new Date(x['dia'].seconds * 1000);
        let fecha = this.formato.fechaToString(dia, false, true);
        return { Fecha_Log: fecha, Nombre_Usuario: x['usuario'].apellido + ', ' + x['usuario'].nombre, Perfil: pefil }
      });

      this.excelService.obtenerExcelDeVariasHojas(
        [logs],
        'Informe de Logs', ['Logs de Usuarios'],
        [40, 30, 20]);

      this.cargando = false;
    });
  }

  ordenarLogs(array: any) {
    array.sort((a: any, b: any) => {
      if (a.diaInt < b.diaInt) {
        return -1;
      }
      else if (a.diaInt > b.diaInt) {
        return 1;
      }
      return 0;
    });
    return array;
  }

  obtenerTurnosPorEspecialidad() {
    this.cargando = true;
    let torta = this.radioTorta.nativeElement.checked;
    this.ultimoGrafico = 1;

    this.data = [];
    this.labels = [];
    let turnos = this.turnos.filter((x: any) => x.ocupado == true);
    let especialidades = this.especialidades;

    let totalTurnos = turnos.length;
    let totalEspecialidades = especialidades.length;
    let datos = {} as any;

    for (let i = 0; i < totalEspecialidades; i++) {
      //datos[especialidades[i].nombre] = turnos.filter((x: { idEspecialidad: any; }) => x.idEspecialidad == especialidades[i].id).length;
      let cantidadTurnos = turnos.filter((x: { idEspecialidad: any; }) => x.idEspecialidad == especialidades[i].id).length;


      this.labels.push(`${especialidades[i].nombre}`);
      this.data.push(cantidadTurnos);
    }

    this.titulo = 'Turnos por especialidad';
    this.tituloPDF = 'TurnosPorEspecialidad';

    setTimeout(() => {
      this.mostrar = true;
      this.graficosC.charts(torta ? 1 : 0);
      this.cargando = false;

    }, 1000);
  }

  obtenerTurnosPorDia() {
    let torta = this.radioTorta.nativeElement.checked;
    this.cargando = true;
    this.ultimoGrafico = 2;

    this.data = [];
    this.labels = [];
    let turnos = this.turnos.filter((x: any) => x.ocupado == true);
    let totalTurnos = turnos.length;

    let lunes = turnos.filter((x: any) => {
      let fecha = new Date(x.fechaDate.seconds * 1000);
      return fecha.getDay() == 1;
    }).length;

    this.labels.push(`Lunes`);
    this.data.push(lunes);

    let martes = turnos.filter((x: any) => {
      let fecha = new Date(x.fechaDate.seconds * 1000);
      return fecha.getDay() == 2;
    }).length;

    this.labels.push(`Martes`);
    this.data.push(martes);

    let miercoles = turnos.filter((x: any) => {
      let fecha = new Date(x.fechaDate.seconds * 1000);
      return fecha.getDay() == 3;
    }).length;

    this.labels.push(`Miércoles`);
    this.data.push(miercoles);

    let jueves = turnos.filter((x: any) => {
      let fecha = new Date(x.fechaDate.seconds * 1000);
      return fecha.getDay() == 4;
    }).length;

    this.labels.push(`Jueves`);
    this.data.push(jueves);

    let viernes = turnos.filter((x: any) => {
      let fecha = new Date(x.fechaDate.seconds * 1000);
      return fecha.getDay() == 5;
    }).length;

    this.labels.push(`Viernes`);
    this.data.push(viernes);

    let sabado = turnos.filter((x: any) => {
      let fecha = new Date(x.fechaDate.seconds * 1000);
      return fecha.getDay() == 6;
    }).length;

    this.labels.push(`Sábado`);
    this.data.push(sabado);
    this.titulo = 'Turnos por día';
    this.tituloPDF = 'TurnosPorDia';

    setTimeout(() => {
      this.mostrar = true;
      this.graficosC.charts(torta ? 1 : 0);
      this.cargando = false;

    }, 1000);
  }

  obtenerTurnosSolicitados() {
    if (!this.form.invalid) {
      this.cargando = true;
      this.ultimoGrafico = 3;

      let torta = this.radioTorta.nativeElement.checked;

      this.data = [];
      this.labels = [];
      let fechaInicio = this.fechaInicio.value;
      let fechaFin = this.fechaFin.value;
      let fi = fechaInicio.split('/');
      let ff = fechaFin.split('/');

      let fechaInicial = new Date(fi[2], parseInt(fi[1]) - 1, fi[0]);
      let fechaFinal = new Date(ff[2], parseInt(ff[1]) - 1, ff[0]);

      if (fechaFinal.getTime() < fechaInicial.getTime() || fechaFinal.getTime() == fechaInicial.getTime()) {
        this.swalService.info('La fecha final no puede ser menor o igual que la fecha inicial.', 'Aviso.');
      } else {

        let turnosSolicitados = this.turnos.filter((x: any) => {
          if (x.ocupado == true && x.fechaSolicitud != null && x.fechaSolicitud != undefined &&
            x.fechaSolicitud >= fechaInicial.getTime() && x.fechaSolicitud <= fechaFinal.getTime())
            return true;
          return false;
        });

        let totalTurnosSolicitados = turnosSolicitados.length;
        let turnosPorEspecialista = [];
        for (let i = 0; i < this.especialistas.length; i++) {
          let especialista = this.especialistas[i];
          let cantidadTurnos = turnosSolicitados.filter((x: any) => {
            return x.idMedico == especialista.id;
          }).length;

          this.labels.push(`${especialista.apellido}, ${especialista.nombre}`);
          this.data.push(cantidadTurnos);
          //turnosPorEspecialista.push({ nombre: especialista.nombre, apellido: especialista.apellido, cantidadTurnos: cantidadTurnos });
        }

        this.titulo = 'Turnos solicitados por médico entre ' + this.fechaInicio?.value + ' - ' + this.fechaFin?.value,
          this.tituloPDF = 'TurnosSolicitadosPorMedico';

        setTimeout(() => {
          this.mostrar = true;
          this.graficosC.charts(torta ? 1 : 0);
          this.cargando = false;

        }, 1000);
      }
    }
  }

  obtenerTurnosFinalizados() {
    if (!this.form.invalid) {
      let torta = this.radioTorta.nativeElement.checked;
      this.cargando = true;
      this.ultimoGrafico = 4;

      this.data = [];
      this.labels = [];
      let fechaInicio = this.fechaInicio.value;
      let fechaFin = this.fechaFin.value;
      let fi = fechaInicio.split('/');
      let ff = fechaFin.split('/');

      let fechaInicial = new Date(fi[2], parseInt(fi[1]) - 1, fi[0]);
      let fechaFinal = new Date(ff[2], parseInt(ff[1]) - 1, ff[0]);

      if (fechaFinal.getTime() < fechaInicial.getTime() || fechaFinal.getTime() == fechaInicial.getTime()) {
        this.swalService.info('La fecha final no puede ser menor o igual que la fecha inicial.', 'Aviso.');
      } else {

        let turnosFinalizados = this.turnos.filter((x: any) => {
          if (x.ocupado == true && x.fechaFinalizacion != null && x.fechaFinalizacion != undefined &&
            x.fechaFinalizacion >= fechaInicial.getTime() && x.fechaFinalizacion <= fechaFinal.getTime())
            return true;
          return false;
        });

        let totalTurnosFinalizados = turnosFinalizados.length;
        let turnosPorEspecialista = [];
        for (let i = 0; i < this.especialistas.length; i++) {
          let especialista = this.especialistas[i];
          let cantidadTurnos = turnosFinalizados.filter((x: any) => {
            return x.idMedico == especialista.id;
          }).length;
          this.labels.push(`${especialista.apellido}, ${especialista.nombre}`);
          this.data.push(cantidadTurnos);
          //turnosPorEspecialista.push({ nombre: especialista.nombre, apellido: especialista.apellido, cantidadTurnos: cantidadTurnos });
        }
        this.tituloPDF = 'TurnosFinalizadosPorMedico';
        this.titulo = 'Turnos finalizados por médico entre ' + this.fechaInicio?.value + ' - ' + this.fechaFin?.value,

          setTimeout(() => {
            this.mostrar = true;
            this.graficosC.charts(torta ? 1 : 0);
            this.cargando = false;
          }, 1000);
      }
    }
  }


  public cambioCheck(event: any) {
    if (this.ultimoGrafico != -1) {
      switch (this.ultimoGrafico) {
        case 1:
          this.obtenerTurnosPorEspecialidad();
          break;
        case 2:
          this.obtenerTurnosPorDia();
          break;
        case 3:
          this.obtenerTurnosSolicitados();
          break;
        case 4:
          this.obtenerTurnosFinalizados();
          break;
      }
    }
  }
}

