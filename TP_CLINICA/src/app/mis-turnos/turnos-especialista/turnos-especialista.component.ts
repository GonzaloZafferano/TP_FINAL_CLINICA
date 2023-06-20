import { Component, ElementRef, ViewChild } from '@angular/core';
import { HorariosService } from 'src/app/services/horarios.service';
import { SwalService } from 'src/app/services/swal.service';
import { UsuarioService } from 'src/app/services/usuarios.service';
import { DatosTurnoPipe } from 'src/app/shared/pipes/datos-turno.pipe';

@Component({
  selector: 'app-turnos-especialista',
  templateUrl: './turnos-especialista.component.html',
  styleUrls: ['./turnos-especialista.component.css']
})
export class TurnosEspecialistaComponent {
  @ViewChild('inputTexto', { static: false }) inputTexto: ElementRef | undefined;
  spinner: boolean = false;
  cargandoHC: boolean = false;
  pacienteHc: any;
  cargando: boolean = false;
  filaSeleccionada: any = null;
  listado: any = null;
  suscripcion: any;
  usuarioActual: any;
  datosTurnoPipe: any;
  mostrarDetalles: boolean = false;
  datoDetalle: any;
  limpiarAutocomplete: boolean = false;
  tituloBuscador: string = 'Busque por  (paciente) Nombre | Apellido | Dni | (especialidad) | Nombre';
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
    this.datosTurnoPipe = new DatosTurnoPipe();
    //this.cargarDatos();
  }


  //{valor, texto, filtro}  ||filtro 0 para especialistas, 1 para especialidades
  cargarDatos(item: any) {
    this.spinner = true;
    this.eliminarSuscripcion();

    if (item.filtro) {
      this.suscripcion = this.horariosService.
        traerListaFiltradaPor_TRES_Campos_I_I_D_Observable('idMedico', this.usuarioActual.id, 'idEspecialidad', item.valor, 'estadoTurno', 'Libre').subscribe(x => {
          this.listado = x;
          this.spinner = false;
        });
    } else {
      this.suscripcion = this.horariosService.
        traerListaFiltradaPor_DOS_CamposObservable('idMedico', this.usuarioActual.id, 'idPaciente', item.valor).subscribe(x => {
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

  cancelar(item: any, input: HTMLTextAreaElement) {
    if (input?.value?.trim() != '') {
      this.cargando = true;
      item.estadoTurno = 'Cancelado';
      item.comentarioMedico = input?.value.trim();
      delete item['mostrarComentario'];
      delete item['mostrarDetalle'];
      this.horariosService.modificarItem(item).then(x => {
        this.swalService.exito('Turno cancelado!', 'Aviso.');
        this.cargando = false;
      });
    } else {
      this.swalService.warning('Debe ingresar un comentario para CANCELAR el turno.', 'Aviso.');
    }
  }

  aceptar(item: any) {
    this.cargando = true;
    item.estadoTurno = 'Aceptado';
    delete item['mostrarDetalle'];
    delete item['mostrarComentario'];
    this.horariosService.modificarItem(item).then(x => {
      this.swalService.exito('Turno Aceptado!', 'Aviso.');
    }).finally(() => this.cargando = false);
  }

  realizado(item: any, indice: number) {
    const input = document.getElementById('realizado' + indice) as HTMLInputElement;
    if (input.value && input.value != '') {
      this.item = item;
      this.indice = indice;
      this.inputActual = input;
      item.paciente.especialidad = item.especialidad;
      this.pacienteHc = item.paciente;
      this.cargandoHC = true;
      // this.cargando = true;
      // item.estadoTurno = 'Realizado';
      // item.comentarioMedico = input.value;
      // item.fechaFinalizacion = new Date().getTime();
      // delete item['mostrarDetalle'];
      // delete item['mostrarComentario'];
      // this.horariosService.modificarItem(item).then(x => {
      //   this.swalService.exito('Turno Finalizado!', 'Aviso.');
      // }).finally(() => this.cargando = false);
    } else {
      this.swalService.warning('Debe ingresar una reseña/comentario y diagnóstico realizado.', 'Aviso.');
    }
  }

  item: any;
  indice: any;
  inputActual: any;

  finalizarTurno(evento: any) {
    this.cargandoHC = false;
    this.cargando = true;
    this.item.estadoTurno = 'Realizado';
    this.item.comentarioMedico = this.inputActual.value;
    this.item.fechaFinalizacion = new Date().getTime();
    delete this.item['mostrarDetalle'];
    delete this.item['mostrarComentario'];

    //if (evento.cargo) {
    this.item.datos = evento.datos;
    //}

    this.horariosService.modificarItem(this.item).then(x => {
      delete this.pacienteHc['especialidad'];
      this.pacienteHc.tieneHC = true;
      this.usuarioService.modificarUsuario(this.pacienteHc).finally(() => {
        this.swalService.exito('Turno Finalizado!', 'Aviso.');
        this.cargando = false
      })
    }).finally(() => {

      //this.cargando = false
    }
    );
  }

  hcCargada(evento: any) {
    //{paciente : this.paciente, datos: datos, cargo : hayDatos}
    this.finalizarTurno(evento);
  }

  cancelaHC() {
    this.cargandoHC = false;
  }

  async keyDown(event: any, item: any) {
    if (event.key === 'Enter' || event.keyCode === 13) {
      await this.buscar2(item);
    }
  }
  cerrarDetalles() {
    this.mostrarDetalles = false;
  }
  rechazar(item: any, input: HTMLTextAreaElement) {
    if (input?.value?.trim() != '') {
      this.cargando = true;
      item.estadoTurno = 'Rechazado';
      item.comentarioMedico = input?.value.trim();
      delete item['mostrarDetalle'];
      delete item['mostrarComentario'];
      this.horariosService.modificarItem(item).then(x => {
        this.swalService.exito('Turno Rechazado!', 'Aviso.');
        this.cargando = false;
      });
    } else {
      this.swalService.warning('Debe ingresar un comentario para RECHAZAR el turno.', 'Aviso.');
    }
  }

  limpiar() {
    this.listado = null;
    this.limpiarAutocomplete = !this.limpiarAutocomplete;
    const inputTexto = document.getElementById('inputTexto') as HTMLInputElement;
    inputTexto.disabled = false;
    inputTexto.value = '';
  }

  ////////////////////-------------BUSCADOR----------------//////////////////////////////////////////
  //LO DECLARO DE ESTA FORMA PARA QUE EL COMPONENTE 
  //QUE LLAME A ESTA FUNCION PUEDA ACCEDER A LAS VARIABLES DE ESTE COMPONENTE
  buscarPacienteOEspecialidad = async (dato: any) => {
    this.eliminarSuscripcion();
    dato = dato.trim();
    dato = dato.toLowerCase();
    let turnos = await this.horariosService.traerListaFiltradaPor_DOS_Campos_IGUALDAD_DESIGUALDAD('idMedico', this.usuarioActual.id, 'estadoTurno', 'Libre');

    //Especialistas
    let pacientes = turnos.filter((x: any) => {
      if (x.paciente.nombre.toLowerCase().includes(dato) || x.paciente.apellido.toLowerCase().includes(dato) || x.paciente.dni.toString().includes(dato)) {
        x.filtro = 0;
        return true;
      }
      return false;
    }).map((x: any) => {
      return { texto: `Paciente: ${x.paciente.apellido} ${x.paciente.nombre} - ${x.paciente.dni}`, valor: x.paciente.id, filtro: x.filtro }
    });

    //Elimino especialistas DUPLICADOS.
    /*
    element: El elemento actual del array que se está iterando.
    index (opcional): El índice del elemento actual en el array.
    array (opcional): El array original en el que se está aplicando el filtro.
    */
    pacientes = pacientes.filter((objetoDeTurno, index, arrayEspecialistas) => {
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

    let resultado = especialidades.concat(...pacientes);
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

      let idMedico = this.usuarioActual.id;
      let turnos = await this.horariosService.obtenerListaDeItems();
      let turnosOcupados = turnos.filter(x => x['estadoTurno'] != 'Libre' && x['idMedico'] == idMedico);
      let turnosFiltrados = turnosOcupados.filter(x => {

        //EL ESPECIALISTA NO SE BUSCA A SI MISMO
        // if (x['nombreEspecialista'].includes(dato))
        //   return true;

        // if (x['medico']){
        //   if(x['medico']?.dni.toLowerCase().includes(dato)){
        //     return true;
        //   }
        // }

        if (x['especialidad'].toLowerCase().includes(dato))
          return true;

        if (x['nombrePaciente'].toLowerCase().includes(dato))
          return true;

        if (x['paciente']) {
          if (x['paciente']?.dni.toLowerCase().includes(dato)) {
            return true;
          }
        }

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
            if(`${hc['presion1'].toString()}/${hc['presion2'].toString()}`.includes(dato)){
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
}

