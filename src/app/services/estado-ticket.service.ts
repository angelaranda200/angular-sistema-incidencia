import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EstadoTicket } from '../interfaces/estado-ticket';

@Injectable({
  providedIn: 'root'
})
export class EstadoTicketService {

  private url_Api:string=`${environment.base_Url}/api/estadostickets`

  constructor(private http:HttpClient) { }

  getEstadoTicket():Observable<EstadoTicket[]>{
    return this.http.get<EstadoTicket[]>(`${this.url_Api}`);
  }

  postEstadoTicket(et:EstadoTicket):Observable<EstadoTicket>{
    return this.http.post<EstadoTicket>(`${this.url_Api}`,et);
  }

  putEstadoTicket(et:EstadoTicket,id:number):Observable<EstadoTicket>{
    return this.http.put<EstadoTicket>(`${this.url_Api}/${id}`,et);
  }

  delete(id:number):Observable<EstadoTicket>{
    return this.http.delete<EstadoTicket>(`${this.url_Api}/${id}`);
  }
}
