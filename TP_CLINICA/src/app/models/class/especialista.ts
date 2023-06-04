import { Acceso } from "../enums/acceso";
import { Perfil } from "../enums/perfil";

export class Especialista {
  id: string = '';
  correo: string = '';
  nombre: string = '';
  apellido: string = '';
  dni: number = 0;
  imagen: string = '';
  edad: number = 0;
  correoRegistrado: boolean = false;
  perfil: Perfil = Perfil.especialista;
  especialidades: any[] = [];
  fechaRegistro: Date = new Date();
  habilitado: Acceso = Acceso.espera;
}







