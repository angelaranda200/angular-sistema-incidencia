import { Area } from "./area";
import { Rol } from "./rol";
import { Servicios } from "./servicios";

export class Usuarios {
    idUsuario!:number;
    username!:string;
    nombres!:string;
    apellidos!:string;
    password!:string;
    email!:string;
    telefono!:string;
    celular!:string;
    status:string='Ok';
    fecha_creado!:string;
    indicator:string='si';
    area!:Area;
    usuarioRoles:Rol[]=[];
    servicio:Servicios[]=[];
}
