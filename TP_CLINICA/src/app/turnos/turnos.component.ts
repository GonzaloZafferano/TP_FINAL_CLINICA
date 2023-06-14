import { Component } from '@angular/core';
import { HorariosService } from '../services/horarios.service';
import { SwalService } from '../services/swal.service';
import { UsuarioService } from '../services/usuarios.service';

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css']
})
export class TurnosComponent {
  spinner: boolean = false;
  cargando: boolean = false;
  filaSeleccionada: any = null;
  listado: any = null;
  suscripcion: any;
  usuarioActual: any;
  limpiarAutocomplete: boolean = false;
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
  }


  //{valor, texto, filtro}  ||filtro 0 para especialistas, 1 para especialidades
  cargarDatos(item: any) {
    this.spinner = true;
    this.eliminarSuscripcion();

    if (item.filtro) {
      this.suscripcion = this.horariosService.
      traerListaFiltradaPor_DOS_Campos_D_I_Observable('estadoTurno', 'Libre','idEspecialidad', item.valor).subscribe(x => {
     
          this.listado = x;
          this.spinner = false;
        });
    } else {
      this.suscripcion = this.horariosService.
      traerListaFiltradaPor_DOS_Campos_D_I_Observable('estadoTurno', 'Libre','idMedico', item.valor).subscribe(x => {
  
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

  cancelar(item: any, indice: number) {
    let comentarios = document.getElementById('comentarioPaciente' + indice) as HTMLInputElement;  
    if (comentarios.value?.trim() != '') {
      this.cargando = true;
      item.estadoTurno = 'Cancelado';
      item.comentarioMedico = "Administrador: " + comentarios.value.trim();
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
  }

  ////////////////////-------------BUSCADOR----------------//////////////////////////////////////////
  //LO DECLARO DE ESTA FORMA PARA QUE EL COMPONENTE 
  //QUE LLAME A ESTA FUNCION PUEDA ACCEDER A LAS VARIABLES DE ESTE COMPONENTE
  buscarEspecialistaOEspecialidad = async (dato: any) => {
    this.eliminarSuscripcion();
    dato = dato.trim();
    dato = dato.toLowerCase();
    let turnos = await this.horariosService.traerListaFiltradaPor_UN_Campo_DESIGUALDAD('estadoTurno', 'Libre');

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
}
