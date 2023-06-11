import { Component } from '@angular/core';
import { HorariosService } from 'src/app/services/horarios.service';
import { SwalService } from 'src/app/services/swal.service';
import { UsuarioService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-turnos-especialista',
  templateUrl: './turnos-especialista.component.html',
  styleUrls: ['./turnos-especialista.component.css']
})
export class TurnosEspecialistaComponent {
  spinner: boolean = false;
  cargando: boolean = false;
  filaSeleccionada: any = null;
  listado: any = null;
  suscripcion: any;
  usuarioActual: any;
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
      this.cargando = true;
      item.estadoTurno = 'Realizado';
      item.comentarioMedico = input.value;
      delete item['mostrarDetalle'];
      delete item['mostrarComentario'];
      this.horariosService.modificarItem(item).then(x => {
        this.swalService.exito('Turno Finalizado!', 'Aviso.');
      }).finally(() => this.cargando = false);
    } else {
      this.swalService.warning('Debe ingresar una reseña/comentario y diagnóstico realizado.', 'Aviso.');
    }
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
  }

  ////////////////////-------------BUSCADOR----------------//////////////////////////////////////////
  //LO DECLARO DE ESTA FORMA PARA QUE EL COMPONENTE 
  //QUE LLAME A ESTA FUNCION PUEDA ACCEDER A LAS VARIABLES DE ESTE COMPONENTE
  buscarPacienteOEspecialidad = async (dato: any) => {
    this.eliminarSuscripcion();
    dato = dato.trim();
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
}
