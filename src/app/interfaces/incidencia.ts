import { PlanSla } from "./plan-sla";

export class Incidencia {
    idIncidencia!:number;
    nombre!:string;
    descripcion!:string;
    status!:string;
    indicator!:string;
    plan_sla!:PlanSla;;
}
