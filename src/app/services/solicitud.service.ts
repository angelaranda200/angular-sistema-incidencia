import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Solicitud } from '../interfaces/solicitud';
import { ImageProcessingService } from './image-processing.service';

@Injectable({
  providedIn: 'root'
})


export class SolicitudService {

  private url_Api:string=`${environment.base_Url}/api/tickets`

  constructor(private http:HttpClient,
    private imageprocessingService:ImageProcessingService) { }

  getSolicitud():Observable<Solicitud[]>{
    return this.http.get<Solicitud[]>(`${this.url_Api}`);
  }

  getSolicitudById(id:number):Observable<Solicitud>{
    return this.http.get<Solicitud>(`${this.url_Api}/${id}`)
    .pipe(
      map(p=>this.imageprocessingService.createImage(p))
    )
  }

  postSolicitud(solicitud:FormData):Observable<Solicitud>{
    return this.http.post<Solicitud>(`${this.url_Api}`,solicitud);
  }

  putSolicitud(solicitud:FormData):Observable<Solicitud>{
    return this.http.put<Solicitud>(`${this.url_Api}`,solicitud);
  }

  /*putSolicitud(solicitud:Solicitud,id:number):Observable<Solicitud>{
    return this.http.put<Solicitud>(`${this.url_Api}/${id}`,solicitud);
  }*/

  deleteSolicitud(id:number):Observable<Solicitud>{
    return this.http.delete<Solicitud>(`${this.url_Api}/${id}`);
  }

  downloadAdjuntoTicket(nombrefoto:string): Observable<Blob>{
    return this.http.get(`${environment.base_Url}/api/solicitud/${nombrefoto}`, {
      responseType: 'blob'
    });
  }
}
