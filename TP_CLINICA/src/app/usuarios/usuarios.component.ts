import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Acceso } from 'src/app/models/enums/acceso';
import { Perfil } from 'src/app/models/enums/perfil';
import { FormatoService } from 'src/app/services/formato.service';
import { SolicitudesService } from 'src/app/services/solicitudes.service';
import { ToastService } from 'src/app/services/toast.service';
import { UsuarioService } from 'src/app/services/usuarios.service';
import { AuthService } from '../services/auth.service';
import { LocalstorageService } from '../services/localstorage.service';
import { ExcelService } from '../services/excel.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {
  ocultarBotonUsuarios: boolean = false;
  //ocultarBotonRegistro: boolean = false;
  ocultarBotonUsuariosEnEspera: boolean = false;
  filaSeleccionada: any;
  listadoUsuarios: any[] = [];
  usuariosEnEspera: number = -1;
  spinner: boolean = false;
  suscripcionEnEspera: any;
  usuario: any;
  cargando: boolean = true;
  suscripcion: any;
  constructor(private solicitudService: SolicitudesService,
    private localStorage: LocalstorageService,
    private usuarioService: UsuarioService,
    private toastService: ToastService,
    private excelService: ExcelService,
    private authService: AuthService, private router: Router) { }

  async ngOnInit() {
    this.obtenerUsuarioActual();
    this.ocultarBotones();
    this.obtenerUsuariosEnEspera();
    this.obtenerUsuarios();
  }

  async obtenerUsuarioActual() {
    this.cargando = true;
    this.usuario = await this.usuarioService.obtenerUsuarioActual();
    this.cargando = false;
  }

  ngOnDestroy() {
    if (this.suscripcionEnEspera)
      this.suscripcionEnEspera.unsubscribe();

    if (this.suscripcion)
      this.suscripcion.unsubscribe();
  }

  cerrarSesion() {
    this.usuarioService.cerrarSesionUsuario();
  }

  getUsuarioEnEspera() {
    return this.solicitudService.usuariosEnEspera;
  }

  ocultarBotones(ruta: string = '') {
    let rutaAEvaluar = ''
    if (ruta != '')
      rutaAEvaluar = ruta;
    else
      rutaAEvaluar = this.router.url;

    this.ocultarBotonUsuarios = rutaAEvaluar == '/usuarios' || rutaAEvaluar.includes('/registro');
    this.ocultarBotonUsuariosEnEspera = rutaAEvaluar.includes('/usuarios/usuarios-en-espera');
    //this.ocultarBotonRegistro = rutaAEvaluar.includes('/registro');
  }

  async obtenerUsuariosEnEspera() {
    this.spinner = true;

    if (this.suscripcionEnEspera)
      this.suscripcionEnEspera.unsubscribe();

    this.suscripcionEnEspera = this.solicitudService.traerListaDeSolicitudesFiltradaConObservable('habilitado', Acceso.espera).subscribe(x => {
      if (this.usuariosEnEspera == -1)
        this.usuariosEnEspera = x.length;

      if (this.usuariosEnEspera < x.length)
        this.toastService.informacion('Un nuevo usuario solicita habilitación', 'Aviso.', 3000);
      this.usuariosEnEspera = x.length;
      this.solicitudService.usuariosEnEspera = x.length;
    });
  }

  async obtenerUsuarios() {
    this.spinner = true;

    if (this.suscripcion)
      this.suscripcion.unsubscribe();

    this.suscripcion = this.usuarioService.obtenerListadoDeUsuariosObservable().subscribe(x => {
      this.spinner = true;
      this.listadoUsuarios = x;
      this.spinner = false;
    });
  }

  descargarExcel() {
    this.cargando = true;
    let pacientes = this.listadoUsuarios.filter(x => x.perfil == Perfil.paciente);
    let especialistas = this.listadoUsuarios.filter(x => x.perfil == Perfil.especialista);
    let administradores = this.listadoUsuarios.filter(x => x.perfil == Perfil.administrador);

    let pacientesEx = pacientes.map(x => {
      return { Id: x.id, Nombre: x.nombre, Apellido: x.apellido, Correo: x.correo, Dni: x.dni, Edad: x.edad, Perfil: 'Paciente' }
    });

    let especialistasEx = especialistas.map(x => {
      return { Id: x.id, Nombre: x.nombre, Apellido: x.apellido, Correo: x.correo, Dni: x.dni, Edad: x.edad, Perfil: 'Especialista' }
    });

    let adminsEx = administradores.map(x => {
      return { Id: x.id, Nombre: x.nombre, Apellido: x.apellido, Correo: x.correo, Dni: x.dni, Edad: x.edad, Perfil: 'Administrador' }
    });


    this.excelService.obtenerExcelDeVariasHojas(
      [pacientesEx, especialistasEx, adminsEx], 
      'Usuarios', ['Pacientes', 'Especialistas', 'Administradores'],
      [40,20,20,30,10,5,15]);

    this.cargando = false;
  }
}