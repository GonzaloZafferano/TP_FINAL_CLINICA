import { Dia } from "../types/dias";
import { EstadoTurno } from "../types/estadoTurno";

export class Turno {
    dia: string = '';
    diaN : number = 0;
    fechaString : string = '';
    fechaDate? : Date;
    horaInicio: number = 0;
    horaFin: number = 0;    
    
    motivo: string = '';    
    detalle: string = '';
    diagnostico: string = '';
    ocupado: boolean = false;
    estadoTurno? : EstadoTurno;
    duracion : number = 0;
    
    idMedico: string = '';
    idEspecialidad: number = 0;
    nombreEspecialista : string = '';
    especialidad: string = '';

    idPaciente : string = '';
    nombrePaciente : string = '';
}