import { Component } from '@angular/core';
import { Perfil } from '../models/enums/perfil';
import { HcService } from '../services/hc.service';
import { UsuarioService } from '../services/usuarios.service';
import { HorariosService } from '../services/horarios.service';
import { TipoIgualdad } from '../models/enums/TipoIgualdad';
import { DatosTurnoPipe } from '../shared/pipes/datos-turno.pipe';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent {
  datoDetalle : any;
  filaSeleccionada: any;
  listado: any[] = [];
  spinner: boolean = false;
  suscripcion: any;
  suscripcionEnEspera: any;
  cargando: boolean = false;
  historiaClinica: any;
  usuarioActual: any;
  hizoBusqueda: boolean = false;
  mostrarHC: boolean = false;
  turnos: any;
  turnosDePaciente: any;
  pacientesSeleccionados: any;
  mostrarDetalles: boolean = false;
  mostrarDetallesTurno: boolean = false;
  datosTurnoPipe: any;
  constructor(private usuarioService: UsuarioService,
    private horarioService: HorariosService, private historiaService: HcService) { }

  async ngOnInit() {
    this.datosTurnoPipe = new DatosTurnoPipe();
    this.usuarioActual = await this.usuarioService.obtenerUsuarioActual();
    this.obtenerUsuarios();
  }

  ngOnDestroy() {
    if (this.suscripcion)
      this.suscripcion.unsubscribe();

    if (this.suscripcionEnEspera)
      this.suscripcionEnEspera.unsubscribe();
  }

  async obtenerUsuarios() {
    //this.spinner = true;

    if (this.suscripcion)
      this.suscripcion.unsubscribe();

    this.suscripcion = this.horarioService.obtenerListadoDeItemsObservable().subscribe(async x => {
      this.spinner = true;
      this.hizoBusqueda = true;
      this.turnos = x;
      let todosLosTurnosFiltrados = x.filter(x => x['idMedico'] == this.usuarioActual.id && x['estadoTurno'] == 'Realizado');;

      let sinDuplicados = todosLosTurnosFiltrados.filter((objetoDeTurno, index, arrayEspecialidades) => {
        return index === arrayEspecialidades.findIndex((o) =>
          o['idPaciente'] === objetoDeTurno['idPaciente']
        );
      });

      let ids = sinDuplicados.map(x => x['idPaciente']);
      if (ids && ids.length > 0) {
        let usuarios = await this.usuarioService.traerListaFiltradaPor_UN_CampoConCondicion_Observable('id', TipoIgualdad.in, ids);
        this.listado = usuarios;
      }
      this.spinner = false;
    });
  }

  seleccionDeFila(itemSeleccionado: any) {
    this.filaSeleccionada = itemSeleccionado;
  }

  obtenerUrlImagen(usuario: any) {
    if (usuario.perfil != Perfil.paciente)
      return usuario.imagen;
    return usuario.imagen1;
  }

  cerrarHC() {
    this.cargando = false;
    this.mostrarHC = false;
  }

  async mostrarHistoria(item: any) {    
    // if (item.tieneHC) {
    this.cargando = true;
    let hc = await this.historiaService.traerListaFiltradaPor_UN_Campo('pacienteId', item.id);

    if (hc && hc.length > 0) {
      this.historiaClinica = hc[0];
      this.mostrarHC = true;
    } else {
      this.cerrarHC();
    }
    this.cargando = false;
    // }
  }

  async pacienteSeleccionado(paciente: any) {
    this.cargando = true;
    this.turnosDePaciente = this.turnos.filter((x: any) => x['idMedico'] == this.usuarioActual.id && x['idPaciente'] == paciente.id);
    
    this.pacientesSeleccionados =  this.listado.filter(x => x.id == paciente.id);
    this.mostrarDetalles = true;  
    this.cargando = false;
  }

  verDetallesTurno(item: any) {
    if (item && item.datos) {
      let datos = this.datosTurnoPipe.transform(item.datos);
      //this.swalService.info(datos, 'Detalles del Control');
      this.datoDetalle = datos;
      this.mostrarDetallesTurno = true;
    }
  }
  cerrarDetalles() {
    this.mostrarDetallesTurno = false;
  }

  mostrarDetalle(item: any) {
    item.mostrarDetalle = !item.mostrarDetalle;
  }

  mostrarComentario(item: any) {
    item.mostrarComentario = !item.mostrarComentario;
  }
}
