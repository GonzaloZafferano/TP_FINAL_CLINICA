import { Component } from '@angular/core';
import { HorariosService } from 'src/app/services/horarios.service';
import { SwalService } from 'src/app/services/swal.service';
import { UsuarioService } from 'src/app/services/usuarios.service';
import { DatosTurnoPipe } from 'src/app/shared/pipes/datos-turno.pipe';

@Component({
  selector: 'app-turnos-paciente',
  templateUrl: './turnos-paciente.component.html',
  styleUrls: ['./turnos-paciente.component.css']
})
export class TurnosPacienteComponent {
  spinner: boolean = false;
  cargando: boolean = false;
  completarEncuesta: boolean = false;
  filaSeleccionada: any = null;
  listado: any = null;
  turnoParaEncuesta: any;
  suscripcion: any;
  usuarioActual: any;
  limpiarAutocomplete: boolean = false;
  datosTurnoPipe: any;
  mostrarDetalles: boolean = false;
  datoDetalle: any;
  tituloBuscador: string = 'Busque por  (especialista) Nombre | Apellido | Dni | (especialidad) | Nombre';
  constructor(private horariosService: HorariosService,
    private usuarioService: UsuarioService,
    private swalService: SwalService) { }

  seleccionDeFila(itemSeleccionado: any) {
    this.filaSeleccionada = itemSeleccionado;
  }

  ngOnDestoy() {
    this.eliminarSuscripcion();
  }

  eliminarSuscripcion() {
    if (this.suscripcion)
      this.suscripcion.unsubscribe();
  }

  async ngOnInit() {
    this.usuarioActual = await this.usuarioService.obtenerUsuarioActual();
    //this.cargarDatos();
    this.datosTurnoPipe = new DatosTurnoPipe();
  }


  //{valor, texto, filtro}  ||filtro 0 para especialistas, 1 para especialidades
  cargarDatos(item: any) {
    this.spinner = true;
    this.eliminarSuscripcion();

    if (item.filtro) {
      this.suscripcion = this.horariosService.
        traerListaFiltradaPor_DOS_CamposObservable('idPaciente', this.usuarioActual.id, 'idEspecialidad', item.valor).subscribe(x => {
          this.listado = x;
          this.spinner = false;
        });
    } else {
      this.suscripcion = this.horariosService.
        traerListaFiltradaPor_DOS_CamposObservable('idPaciente', this.usuarioActual.id, 'idMedico', item.valor).subscribe(x => {
          this.listado = x;
          this.spinner = false;
        });
    }
  }

  mostrarDetalle(item: any) {
    item.mostrarDetalle = !item.mostrarDetalle;
  }

  mostrarComentario(item: any) {
    item.mostrarComentario = !item.mostrarComentario;
  }

  abrirEncuesta(item: any) {
    this.turnoParaEncuesta = item;
    this.completarEncuesta = true;
  }

  calificarOK(item: any, indice: number) {
    if (!item.calificado) {
      let comentarios = document.getElementById('comentarioPaciente' + indice) as HTMLInputElement;

      if (comentarios.value?.trim() != '') {
        this.cargando = true;
        item.calificacionOK = !item.calificacionOK;
        item.calificacionNOOK = false;
        item.calificado = true;
        //item.detalle = 'Paciente: \nCalificación: Buena. \nComentarios: ' + comentarios.value.trim() + '\n' + item?.detalle + '\n';
        item.comentarioPaciente = 'Calificacion: Buena. \nComentario: ' + comentarios.value.trim();
        delete item['mostrarDetalle'];
        delete item['mostrarComentario'];
        this.horariosService.modificarItem(item).then(x => {
          this.swalService.exito('Atención calificada!', 'Aviso.');
          this.cargando = false;
        });
      } else {
        this.swalService.warning('Debe ingresar un comentario para calificar la atencion.', 'Aviso.');
      }
    }
  }

  calificarNOOK(item: any, indice: number) {
    if (!item.calificado) {
      let comentarios = document.getElementById('comentarioPaciente' + indice) as HTMLInputElement;

      if (comentarios.value?.trim() != '') {
        this.cargando = true;
        item.calificacionNOOK = !item.calificacionNOOK;
        item.calificacionOK = false;
        item.calificado = true;
        item.comentarioPaciente = 'Calificacion: Mala. \nComentario: ' + comentarios.value.trim();
        delete item['mostrarDetalle'];
        delete item['mostrarComentario'];
        this.horariosService.modificarItem(item).then(x => {
          this.swalService.exito('Atención calificada!', 'Aviso.');
          this.cargando = false;
        });
      } else {
        this.swalService.warning('Debe ingresar un comentario para calificar la atencion.', 'Aviso.');
      }
    }
  }

  cancelar(item: any, indice: number) {
    let comentarios = document.getElementById('comentarioPaciente' + indice) as HTMLInputElement;
    if (comentarios.value?.trim() != '') {
      this.cargando = true;
      item.estadoTurno = 'Cancelado';
      item.comentarioPaciente = comentarios.value.trim();
      delete item['mostrarDetalle'];
      delete item['mostrarComentario'];
      this.horariosService.modificarItem(item).then(x => {
        this.swalService.exito('Turno cancelado!', 'Aviso.');
        this.cargando = false;
      });
    } else {
      this.swalService.warning('Debe ingresar un comentario para cancelar el turno.', 'Aviso.');
    }
  }

  limpiar() {
    this.listado = null;
    this.limpiarAutocomplete = !this.limpiarAutocomplete;
    const inputTexto = document.getElementById('inputTexto') as HTMLInputElement;
    inputTexto.disabled = false;
    inputTexto.value = '';
  }

  guardarEncuesta(turno: any) {
    this.cargando = true;
    this.completarEncuesta = false;
    this.turnoParaEncuesta = null;
    this.horariosService.modificarItem(turno).finally(() => {
      this.cargando = false;
    });
  }

  encuestaCancelada() {
    this.completarEncuesta = false;
    this.turnoParaEncuesta = null;
  }

  ////////////////////-------------BUSCADOR----------------//////////////////////////////////////////
  //LO DECLARO DE ESTA FORMA PARA QUE EL COMPONENTE 
  //QUE LLAME A ESTA FUNCION PUEDA ACCEDER A LAS VARIABLES DE ESTE COMPONENTE
  buscarEspecialistaOEspecialidad = async (dato: any) => {
    this.eliminarSuscripcion();
    dato = dato.trim();
    dato = dato.toLowerCase();
    let turnos = await this.horariosService.traerListaFiltradaPor_UN_Campo('idPaciente', this.usuarioActual.id);

    //Especialistas
    let especialistas = turnos.filter((x: any) => {
      if (x.medico.nombre.toLowerCase().includes(dato) || x.medico.apellido.toLowerCase().includes(dato) || x.medico.dni.toString().includes(dato)) {
        x.filtro = 0;
        return true;
      }
      return false;
    }).map((x: any) => {
      return { texto: `Especialista: ${x.medico.apellido} ${x.medico.nombre} - ${x.medico.dni}`, valor: x.medico.id, filtro: x.filtro }
    });

    //Elimino especialistas DUPLICADOS.
    /*
    element: El elemento actual del array que se está iterando.
    index (opcional): El índice del elemento actual en el array.
    array (opcional): El array original en el que se está aplicando el filtro.
    */
    especialistas = especialistas.filter((objetoDeTurno, index, arrayEspecialistas) => {
      return index === arrayEspecialistas.findIndex((o) =>
        o.valor === objetoDeTurno.valor
      );
    });

    //Especialidades
    let especialidades = turnos.filter((x: any) => {
      if (x.especialidad.toLowerCase().includes(dato)) {
        x.filtro = 1;
        return true;
      }
      return false;
    }).map((x: any) => {
      return { texto: `Especialidad: ${x.especialidad}`, valor: x.idEspecialidad, filtro: x.filtro }
    });

    //Elimino especialidades DUPLICADOS.
    especialidades = especialidades.filter((objetoDeTurno, index, arrayEspecialidades) => {
      return index === arrayEspecialidades.findIndex((o) =>
        o.valor === objetoDeTurno.valor
      );
    });

    let resultado = especialidades.concat(...especialistas);
    return resultado;
  }

  transformarTexto = (item: any) => {
    return item.texto;
  }

  limpiarDatos() {
    this.listado = null;
    this.filaSeleccionada = null;
  }

  obtenerItemSeleccionado(item: any) {
    this.cargarDatos(item);
  }
  ////////////////////-------------FIN BUSCADOR----------------//////////////////////////////////////////



  /////////////////////////////////////FILTRO DE TURNOS AVANZADO
  async buscar2(input: any) {
    let dato = input.value;
    dato = dato.trim();
    dato = dato.toLowerCase();
    if (dato != '') {
      this.cargando = true;

      let idPaciente = this.usuarioActual.id;
      let turnos = await this.horariosService.obtenerListaDeItems();
      let turnosOcupados = turnos.filter(x => x['estadoTurno'] != 'Libre' && x['idPaciente'] == idPaciente);
      let turnosFiltrados = turnosOcupados.filter(x => {

        // EL ESPECIALISTA NO SE BUSCA A SI MISMO
        if (x['nombreEspecialista'].toLowerCase().includes(dato))
          return true;

        if (x['medico']) {
          if (x['medico']?.dni.toLowerCase().includes(dato)) {
            return true;
          }
        }

        if (x['especialidad'].toLowerCase().includes(dato))
          return true;

        // if (x['nombrePaciente'].toLowerCase().includes(dato))
        //   return true;

        // if (x['paciente']){
        //   if(x['paciente']?.dni.toLowerCase().includes(dato)){
        //     return true;
        //   }
        // }

        if (x['comentarioMedico'].toLowerCase().includes(dato))
          return true;
        if (x['comentarioPaciente'].toLowerCase().includes(dato))
          return true;

        if (x['estadoTurno'].toLowerCase().includes(dato))
          return true;

        //ES LA FECHA DEL TURNO. 
        if (x['fechaString'].includes(dato))
          return true;

        //Historia Clinica
        let hc = x['datos'];

        if (hc) {
          if (hc['altura'] && hc['altura'].toString().includes(dato))
            return true;

          if (hc['presion1'] && hc['presion1'].toString().includes(dato))
            return true;

          if (hc['presion2'] && hc['presion2'].toString().includes(dato))
            return true;

          if (hc['presion1'] && hc['presion2']) {
            if (`${hc['presion1'].toString()}/${hc['presion2'].toString()}`.includes(dato)) {
              return true;
            }
          }

          if (hc['peso'] && hc['peso'].toString().includes(dato))
            return true;

          if (hc['temperatura'] && hc['temperatura'].toString().includes(dato))
            return true;

          for (let prop in hc) {
            if (prop != 'medico' && prop != 'altura' &&
              prop != 'especialidad' && prop != 'fechaHC' &&
              prop != 'hayDatos' && prop != 'presion1' &&
              prop != 'presion2' && prop != 'peso' && prop != 'temperatura'
            ) {
              if (hc[prop] && hc[prop].toString().toLowerCase().includes(dato)) {
                return true;
              }
            }
          }
        }
        return false;
      });
      this.listado = turnosFiltrados;
      this.cargando = false;
    }
  }

  verDetalles(item: any) {
    if (item && item.datos) {
      let datos = this.datosTurnoPipe.transform(item.datos);
      //this.swalService.info(datos, 'Detalles del Control');
      this.datoDetalle = datos;
      this.mostrarDetalles = true;
    }
  }

  async keyDown(event: any, item: any) {
    if (event.key === 'Enter' || event.keyCode === 13) {
      await this.buscar2(item);
    }
  }

  cerrarDetalles() {
    this.mostrarDetalles = false;
  }
}
