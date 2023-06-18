import { Acceso } from "../enums/acceso";
import { Perfil } from "../enums/perfil";

export class Usuario {
  id: string = '';
  correo: string = '';
  nombre: string = '';
  apellido: string = '';
  dni: number = 0;
  imagen1: string = '';
  imagen2: string = '';
  edad: number = 0;
  obraSocial: number = 0
  habilitado: Acceso = Acceso.espera; 
  correoRegistrado: boolean = false;
  perfil : Perfil = Perfil.paciente;
  fechaRegistro : Date = new Date();
  tieneHC : boolean = false;
}