import { map } from 'rxjs/operators';
import { ImageProcessingService } from 'src/app/services/image-processing.service';
import { Solicitud } from 'src/app/interfaces/solicitud';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SolicitudService } from './solicitud.service';

@Injectable({
  providedIn: 'root'
})
export class TicketResolveService implements Resolve<Solicitud>{

  solicitudForm!:FormGroup;

  constructor(private fb:FormBuilder,
              private solicitudService:SolicitudService,
              private imageprocessingService:ImageProcessingService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<Solicitud> {
    const id = route.params['idTickets']
    if(id){
        return this.solicitudService.getSolicitudById(id)
        // .pipe(
        //   map(p=>this.imageprocessingService.createImage(p))
        // )
      
    }else{
      return of(this.getTicketDetails().value)
    }
  }

  getTicketDetails(){
    return this.fb.group({
      idTicket:[0],
      vencido:[''],
      descripcion:[''],
      fecha_creacion:[''],
      fecha_vencimiento:[''],
      fecha_cierre:[''],
      fecha_actualizacion:[''],
      ultimo_mensaje:[''],
      ultima_respuesta:[''],
      numero:[''],
      adjuntotickets:this.fb.array([/*this.adjuntoTicketForm*/]),
      usuario:[''],
      estado_ticket:[''],
      prioridad:[''],
      incidencia:[''],
      area:[''],
      tienda:[''],
      hilos_ticket:this.fb.array([/*this.hiloTicketForm()*/])
    })
  }
}
