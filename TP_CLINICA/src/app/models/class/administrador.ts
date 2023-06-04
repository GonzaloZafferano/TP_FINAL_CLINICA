import { Acceso } from "../enums/acceso";
import { Perfil } from "../enums/perfil";

export class Administrador {
  id: string = '';
  correo: string = '';
  nombre: string = '';
  apellido: string = '';
  dni: number = 0;
  imagen: string = '';
  edad: number = 0;
  habilitado: Acceso = Acceso.espera;
  correoRegistrado: boolean = false;
  perfil : Perfil = Perfil.administrador;
  fechaRegistro : Date = new Date();
}