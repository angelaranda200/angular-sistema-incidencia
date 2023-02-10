import { Area } from "./area";
import { EstadoTicket } from "./estado-ticket";
import { FileHandle } from "./file-handle.model";
import { HiloTicket } from "./hilo-ticket";
import { Incidencia } from "./incidencia";
import { Prioridad } from "./prioridad";
import { Tienda } from "./tienda";
import { Usuarios } from "./usuarios";

export class Solicitud {
    idTicket!:number;
    vencido!:string; //no
    descripcion!:string; //no
    fecha_creacion!:string;
    fecha_vencimiento!:string;
    fecha_cierre!:string;
    fecha_actualizacion!:string;
    ultimo_mensaje!:string; //no
    ultima_respuesta!:string; //no
    numero!:string; //no
    adjuntotickets:FileHandle[]=[];
    usuario!:Usuarios;
    estado_ticket!:EstadoTicket;
    prioridad!:Prioridad;
    incidencia!:Incidencia;
    area!:Area;
    tienda!:Tienda;
    hilos_ticket:HiloTicket[]=[];
    
}
