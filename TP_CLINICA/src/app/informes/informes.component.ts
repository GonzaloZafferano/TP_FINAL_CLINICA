import { Component } from '@angular/core';
import { ExcelService } from '../services/excel.service';
import { LogsService } from '../services/logs.service';
import { Perfil } from '../models/enums/perfil';
import { FormatoService } from '../services/formato.service';
import { SortBySecondsPipe } from '../shared/pipes/sort-by-seconds.pipe';
import { HorariosService } from '../services/horarios.service';
import { EspecialidadService } from '../services/especialidad.service';

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
  constructor(
    private excelService: ExcelService,
    private logService: LogsService,
    private especialidadService: EspecialidadService,
    private turnosService: HorariosService,
    private formato: FormatoService
  ) { }

  async ngOnInit() {
    this.cargando = true;
    this.pipeTiempo = new SortBySecondsPipe();
    this.especialidades = await this.especialidadService.obtenerListaDeEspecialidades();
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

    debugger;
  }

}

