import { Usuarios } from 'src/app/interfaces/usuarios';
import { Solicitud } from 'src/app/interfaces/solicitud';
export interface HiloTicket {
    idHiloTicket:number;
    contenido:string;
    fecha_creacion:string;
    //tickets:Solicitud;
    usuario:Usuarios;
}
