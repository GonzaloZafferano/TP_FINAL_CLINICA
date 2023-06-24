import { Component } from '@angular/core';
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

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.css']
})
export class InformesComponent {
  suscripcionLogs: any;
  suscripcionTurnos: any;
  cargando: boolean = false;
  turnos: any;
  pipeTiempo: any;
  especialidades: any;
  especialistas: any;
  form: any;
  filaSeleccionada: any;
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
          fechaInicio2: new FormControl('',
            {
              validators: [validarCampoFecha()],
            }
          ),
          fechaFin2: new FormControl('',
            {
              validators: [validarCampoFecha()
              ]
            }
          ),
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
    let turnos = this.turnos;
    let especialidades = this.especialidades;

    let totalTurnos = turnos.length;
    let totalEspecialidades = especialidades.length;
    let datos = {} as any;

    for (let i = 0; i < totalEspecialidades; i++) {
      datos[especialidades[i].nombre] = turnos.filter((x: { idEspecialidad: any; }) => x.idEspecialidad == especialidades[i].id).length;
    }
  }

  obtenerTurnosPorDia() {
    let turnos = this.turnos;
    let totalTurnos = turnos.length;

    let lunes = turnos.filter((x: any) => {
      let fecha = new Date(x.fechaDate.seconds * 1000);
      return fecha.getDay() == 1;
    }).length;
    let martes = turnos.filter((x: any) => {
      let fecha = new Date(x.fechaDate.seconds * 1000);
      return fecha.getDay() == 2;
    }).length;
    let miercoles = turnos.filter((x: any) => {
      let fecha = new Date(x.fechaDate.seconds * 1000);
      return fecha.getDay() == 3;
    }).length;
    let jueves = turnos.filter((x: any) => {
      let fecha = new Date(x.fechaDate.seconds * 1000);
      return fecha.getDay() == 4;
    }).length;
    let viernes = turnos.filter((x: any) => {
      let fecha = new Date(x.fechaDate.seconds * 1000);
      return fecha.getDay() == 5;
    }).length;
    let sabado = turnos.filter((x: any) => {
      let fecha = new Date(x.fechaDate.seconds * 1000);
      return fecha.getDay() == 6;
    }).length;
  }

  obtenerTurnosSolicitados() {
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

        turnosPorEspecialista.push({ nombre: especialista.nombre, apellido: especialista.apellido, cantidadTurnos: cantidadTurnos });
      }
    }
  }

  obtenerTurnosFinalizados() {
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

        turnosPorEspecialista.push({ nombre: especialista.nombre, apellido: especialista.apellido, cantidadTurnos: cantidadTurnos });
      }

      debugger;
    }

  }

  seleccionDeFila(itemSeleccionado: any) {
    this.filaSeleccionada = itemSeleccionado;
  }
}

