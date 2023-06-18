import { Component } from '@angular/core';
import { Perfil } from 'src/app/models/enums/perfil';
import { HcService } from 'src/app/services/hc.service';
import { SwalService } from 'src/app/services/swal.service';
import { UsuarioService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {
  usuario: any;
  horarios: any[] = [];
  tieneHorarios: boolean = true;
  esAdmin: boolean = false;
  cargando: boolean = false;
  esUsuario: boolean = false;
  esEspecialista: boolean = false;
  usuarioObservable: any;
  suscripcion: any;
  mostrarHC: boolean = false;
  historiaClinica: any;
  constructor(
    private usuarioService: UsuarioService,
    private historiaService: HcService, private swalService: SwalService
  ) { }

  async ngOnInit() {
    this.usuario = await this.usuarioService.obtenerUsuarioActual();

    if (this.usuario) {
      this.esAdmin = this.usuario.perfil == Perfil.administrador;
      this.esEspecialista = this.usuario.perfil == Perfil.especialista;
      this.esUsuario = this.usuario.perfil == Perfil.paciente;
    }
    this.suscripcion = this.usuarioService.traerUsuarioPorId_Observable(this.usuario.id).subscribe(x => {
      if (x && x.length > 0) {
        this.usuarioObservable = x[0];
      }
    });
  }

  cargarHorarios() {

  }

  //public usuario: any = null;
  public especialidades: any;
  especialidad_elegida: string = '0';
  // tieneHorarios: boolean | any;
  horariosActuales: any;
  dias_check: Array<any> = [
    { dia: 'lunes', trabaja: false, ingreso: 0, salida: 0 },
    { dia: 'martes', trabaja: false, ingreso: 0, salida: 0 },
    { dia: 'miércoles', trabaja: false, ingreso: 0, salida: 0 },
    { dia: 'jueves', trabaja: false, ingreso: 0, salida: 0 },
    { dia: 'viernes', trabaja: false, ingreso: 0, salida: 0 },
    { dia: 'sábado', trabaja: false, ingreso: 0, salida: 0 }
  ];
  listaHorarios: string[] = ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
  listaHorariossalida: string[] = ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];

  // constructor(private horariosSrv: HorariosService, private router: Router) {
  //   let ls = localStorage.getItem('usuario_clinica');
  //   if (ls != null) {
  //     this.usuario = JSON.parse(ls);
  //     this.especialidades = this.usuario.espe;
  //   }
  // }


  guardar() {
    let especialidad_guardar = {
      uidEspecialista: this.usuario.uid,
      especialidad: this.especialidad_elegida,
      horarios: this.dias_check
    }

    if (this.tieneHorarios) {

      console.log('tiene horarios previos.->actualizar:: ' + this.horariosActuales.doc_id)


      //  this.horariosSrv.actualizarHorario( this.horariosActuales.doc_id, especialidad_guardar).finally(() => {
      //     this.router.navigate(['miperfil'])
      //   });
      // } else {
      //   console.log('no tiene horarios previos->cargar de cero')

      // this.horariosSrv.setItem(especialidad_guardar).finally(() =>
      //           this.router.navigate(['miperfil'])
      //         );
    }

  }


  capturar() {
    console.log(this.especialidad_elegida);
    //   this.horariosSrv.traerHorariosEspecialista_Especialidad(this.usuario.uid, this.especialidad_elegida).subscribe((res) => {
    //      if(res.length==1){
    //       console.log(res[0].doc_id)

    //       this.horariosActuales= res[0];
    //        this.tieneHorarios=true;
    //      }else{
    //        this.tieneHorarios=false;
    //      }  
    //      console.log('hroarios= '+this.tieneHorarios) 
    // })
  }

  async verHC() {
    this.cargando = true;
    if(this.usuario.tieneHC){
      let hc = await this.historiaService.traerItemPorId(this.usuario.HCId);    
      if (hc) {
        this.historiaClinica = hc;
        this.mostrarHC = true;
        this.cargando = false;
      }
    }
    else {
      this.cargando = false;
      this.swalService.info('No posee historia clínica aún.');
    }
  }

  cerrarHC(){
    this.mostrarHC = false;
  }
}