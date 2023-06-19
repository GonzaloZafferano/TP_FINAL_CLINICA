import { Component } from '@angular/core';
import { Perfil } from '../models/enums/perfil';
import { HcService } from '../services/hc.service';
import { UsuarioService } from '../services/usuarios.service';
import { HorariosService } from '../services/horarios.service';
import { TipoIgualdad } from '../models/enums/TipoIgualdad';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent {
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
  constructor(private usuarioService: UsuarioService, private horarioService: HorariosService, private historiaService: HcService) { }

  async ngOnInit() {
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
    if (item.tieneHC) {
      this.cargando = true;
      let hc = await this.historiaService.traerListaFiltradaPor_UN_Campo('pacienteId', item.id);

      if (hc && hc.length > 0) {
        this.historiaClinica = hc[0];
        this.mostrarHC = true;
      } else {
        this.cerrarHC();
      }
    }
  }
}
