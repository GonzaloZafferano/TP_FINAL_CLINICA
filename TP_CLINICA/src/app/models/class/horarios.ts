import { Dia } from "../types/dias";
import { EstadoTurno } from "../types/estadoTurno";

export class Turno {
    dia: string = '';
    diaN : number = 0;
    fechaString : string = '';
    fechaDate? : Date;
    horaInicio: number = 0;
    horaFIn: number = 0;
    
    motivo: string = '';    
    detalle: string = '';
    diagnostico: string = '';
    ocupado: boolean = false;
    estadoTurno? : EstadoTurno;
    
    idMedico: string = '';
    idEspecialidad: number = 0;
    nombreEspecialidad: string = '';

    idPaciente : string = '';
    nombrePaciente : string = '';
}