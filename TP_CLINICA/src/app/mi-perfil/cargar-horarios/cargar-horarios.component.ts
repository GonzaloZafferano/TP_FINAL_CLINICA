import { Component } from '@angular/core';
import { Form, FormControl, FormGroup } from '@angular/forms';
import { Turno } from 'src/app/models/class/horarios';
import { TipoIgualdad } from 'src/app/models/enums/TipoIgualdad';
import { HorariosService } from 'src/app/services/horarios.service';
import { SwalService } from 'src/app/services/swal.service';
import { ToastService } from 'src/app/services/toast.service';
import { UsuarioService } from 'src/app/services/usuarios.service';
import { validarCampoTexto, validarCampoNumero, validarSiDniExisteAsync, validarCampoArchivo, validarCorreo, validarSiCorreoExisteAsync, validarSiEspecialidadExisteAsync, validarConfirmacionDeClave, validarCampoOtro, validarCampoSelect } from 'src/app/validators/validaciones';

@Component({
  selector: 'app-cargar-horarios',
  templateUrl: './cargar-horarios.component.html',
  styleUrls: ['./cargar-horarios.component.css']
})
export class CargarHorariosComponent {
  titulo: string = 'Cargando...';
  form!: FormGroup;
  //usuario: any;
  usuarioObservable: any;
  horariosActuales: any = [];
  horariosFinVisibles: any = [];
  horariosInicioVisibles: any = [];
  spinner: boolean = false;
  turnos: any = [];
  suscripcionMisHorarios: any;
  suscripcionMisTurnosGenerados: any;
  cargando: boolean = false;

  constructor(private horarioService: HorariosService,
    private toastService: ToastService,
    private swalService: SwalService,
    private usuarioService: UsuarioService
  ) {
  }

  removerSuscripciones() {
    if (this.suscripcionMisHorarios)
      this.suscripcionMisHorarios.unsubscribe();
    if (this.suscripcionMisTurnosGenerados)
      this.suscripcionMisTurnosGenerados.unsubscribe();
  }

  ngOnDestroy() {
    this.removerSuscripciones();
  }

  async ngOnInit() {
    this.validar();
    this.usuarioObservable = await this.usuarioService.obtenerUsuarioActual();

    this.suscripcionMisTurnosGenerados = this.horarioService.traerListaDeItemsFiltradaConObservable('idMedico', this.usuarioObservable.id).subscribe(x => {
      this.horariosActuales = x;
    });

    this.horariosFinVisibles = this.horariosFin;
    this.horariosInicioVisibles = this.horariosInicio;

    this.suscripcionMisHorarios = this.usuarioService.traerUsuarioPorId_Observable(this.usuarioObservable.id).subscribe(x => {
      if (x && x.length > 0) {
        this.usuarioObservable = x[0];
      }
    });
  }

  get dia() {
    return this.form?.get('dia');
  }
  set dia(value: any) {
    this.form?.get('dia')?.patchValue(value);
  }

  get horaInicio() {
    return this.form?.get('horaInicio');
  }
  set horaInicio(value: any) {
    this.form?.get('horaInicio')?.patchValue(value);
  }

  get horaFin() {
    return this.form?.get('horaFin');
  }
  set horaFin(value: any) {
    this.form?.get('horaFin')?.patchValue(value);
  }

  get selectEspecialidades() {
    return this.form?.get('selectEspecialidades');
  }
  set selectEspecialidades(value: any) {
    this.form?.get('selectEspecialidades')?.patchValue(value);
  }


  validar(): void {
    this.form = new FormGroup
      (
        {
          dia: new FormControl('', { validators: [validarCampoSelect()], }),
          horaInicio: new FormControl('', { validators: [validarCampoSelect()], }),
          horaFin: new FormControl('', { validators: [validarCampoSelect()] }),
          selectEspecialidades: new FormControl('', { validators: [validarCampoSelect()] }),
        }
      );
  }


  dias: string[] = ['', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  horariosInicio: string[] = ['', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
  horariosFin: string[] = ['', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];
  horariosSabadoInicio: string[] = ['', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00'];
  horariosSabadoFin: string[] = ['', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00'];
  //horariosInicioVisibles: string[] = [];
  //horariosFinVisibles: string[] = [];

  public obtenerErrores(errores: any): string[] {
    return Object.keys(errores);
  }

  seleccion(event: any) {
    if (event.currentTarget.value.includes('Sábado')) {
      this.horariosFinVisibles = this.horariosSabadoFin;
      this.horariosInicioVisibles = this.horariosSabadoInicio;
    } else {
      this.horariosFinVisibles = this.horariosFin;
      this.horariosInicioVisibles = this.horariosInicio;
    }
  }

  async guardar() {
    this.titulo = 'Cargando...';
    this.cargando = true;
    if (!this.form.invalid) {

      let sePuedeCargar = true;
      let dia = this.dia?.value;
      let horaInicio = parseInt(this.horaInicio?.value?.split(':')[0]);
      let horaFin = parseInt(this.horaFin?.value?.split(':')[0]);
      let selectElement = document.getElementById("selectEspecialidades") as any;
      let selectedIndex = selectElement?.selectedIndex;
      let especialidad = selectElement?.options[selectedIndex].text;

      if (horaInicio < horaFin) {

        for (let i = 0; i < this.horariosActuales.length; i++) {
          let horarioActual = this.horariosActuales[i];

          if (horarioActual.dia == dia &&
            ((horarioActual.horaInicio < horaFin &&
              horarioActual.horaInicio > horaInicio) ||
              (horarioActual.horaFIn < horaFin &&
                horarioActual.horaFIn > horaInicio) ||
              (horarioActual.horaFIn == horaFin &&
                horarioActual.horaInicio == horaInicio))) {

            let horarioExistente = `${horarioActual.dia} - ${horarioActual.horaInicio}:00 - ${horarioActual.horaFIn}:00`;
            this.toastService.error('Error. Conflicto con el horario. <br> Ya existe un horario:<br>' + horarioExistente + '<br>Un horario no puede incluir a otro existente.', 'Aviso.', 4000);
            sePuedeCargar = false;
            break;
          }
        }

        //SI SE PUEDE CARGAR, NO EXISTE CONFLICTOS DE HORARIOS, ENTONCES HAGO PUSH AL HORARIO.
        if (sePuedeCargar) {

          await this.generarFechasParaTurnos(especialidad, dia, horaInicio, horaFin);
          if (!this.usuarioObservable.horarios)
            this.usuarioObservable.horarios = [];

            let diaN = -1; 
            switch (dia.toLowerCase()) {
              case 'lunes':
                diaN = 1;
                break;
              case 'martes':
                diaN = 2;
                break;
              case 'miércoles':
                diaN = 3;
                break;
              case 'jueves':
                diaN = 4;
                break;
              case 'viernes':
                diaN = 5;
                break;
              case 'sábado':
                diaN = 6;
                break;
            }

          this.usuarioObservable.horarios.push({ dia: dia, diaN : diaN, horaInicio: horaInicio, horaFin: horaFin, especialidad: especialidad });
          this.usuarioService.modificarUsuario(this.usuarioObservable);
          this.limpiarSelects();
          this.toastService.exito('Se ha guardado el horario con exito!', 'Aviso.');
          this.cargando = false;
        }
      }
      else {
        this.toastService.error('La hora de inicio no puede ser mayor o igual que la hora fin.', 'Aviso.')
      }
    }
    this.cargando = false;
  }

  limpiarSelects() {
    this.horaFin = '';
    this.dia = '';
    this.horaInicio = '';
    this.selectEspecialidades = '';
  }

  async generarFechasParaTurnos(especialidad: string, diaSeleccionado: string, horaInicio: number, horaFin: number) {
    let dia = -1; 
    switch (diaSeleccionado.toLowerCase()) {
      case 'lunes':
        dia = 1;
        break;
      case 'martes':
        dia = 2;
        break;
      case 'miércoles':
        dia = 3;
        break;
      case 'jueves':
        dia = 4;
        break;
      case 'viernes':
        dia = 5;
        break;
      case 'sábado':
        dia = 6;
        break;
    }
    const fechas = [];
    const today = new Date();
    let fecha = new Date(today);

    for (let i = 0; i < 4; i++) {
      fecha.setDate(fecha.getDate() + ((dia - fecha.getDay() + 7) % 7)); // Ajusta la fecha al próximo viernes
      let fechaFormateada = fecha.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
      fechas.push(fechaFormateada);
      fecha.setDate(fecha.getDate() + 7); // Añade 7 días para obtener el siguiente viernes

      let horario = new Turno();
      horario.fechaString = fechaFormateada;
      horario.dia = diaSeleccionado;
      horario.diaN = dia;
      horario.horaFIn = horaFin;
      horario.horaInicio = horaInicio;
      horario.idEspecialidad = this.selectEspecialidades?.value;
      horario.nombreEspecialidad = especialidad;
      horario.idMedico = this.usuarioObservable.id;
      horario.estadoTurno = 'Libre';

      await this.horarioService.cargarItemSinIdAsignado(horario);
    }

    //let fechaDate = new Date('2023/06/07');  
    //console.log(fechas); // Aquí puedes hacer lo que necesites con las fechas generadas
  }

  async eliminarTurno(turno: any) {

    this.cargando = true;
    this.titulo = 'Eliminando...';

    let horariosABorrar = this.horariosActuales.filter((x: any) => x.dia == turno.dia && x.horaFin == turno.horaFIn && x.horaInicio == turno.horaInicio);
    let hayTurnosOcupados = horariosABorrar.filter((x: any) => x.ocupado == true);

    if (hayTurnosOcupados.length > 0) {
      this.swalService.error('Tiene turnos ocupados en el horario que quiere borrar. Primero, cancele o rechace los turnos y vuelva a intentar.', 'Aviso');
      this.cargando = false;
    } else {
      for (let i = 0; i < horariosABorrar.length; i++) {
        await this.horarioService.eliminarItem(horariosABorrar[i].id);
      }

      this.usuarioObservable.horarios = this.usuarioObservable.horarios.filter((x: any) => x != turno);
      this.usuarioService.modificarUsuario(this.usuarioObservable).then(x => {
        this.swalService.exito('Se han eliminado los horarios!', 'Aviso');
        this.cargando = false;
      }).finally(() => {
        this.cargando = false;
      });
    }

  }
}
