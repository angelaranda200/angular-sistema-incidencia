import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Prioridad } from '../interfaces/prioridad';

@Injectable({
  providedIn: 'root'
})
export class PrioridadService {

  private url_Api:string=`${environment.base_Url}/api/prioridad`

  constructor(private http:HttpClient) { }

  getPrioridad():Observable<Prioridad[]>{
    return this.http.get<Prioridad[]>(`${this.url_Api}`);
  }

  postPrioridad(prioridad:Prioridad):Observable<Prioridad>{
    return this.http.post<Prioridad>(`${this.url_Api}`,prioridad);
  }

  putPrioridad(prioridad:Prioridad,id:number):Observable<Prioridad>{
    return this.http.put<Prioridad>(`${this.url_Api}/${id}`,prioridad);
  }

  deletePrioridad(id:number):Observable<Prioridad>{
    return this.http.delete<Prioridad>(`${this.url_Api}/${id}`);
  }
}
