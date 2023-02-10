import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Servicios } from '../interfaces/servicios';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  private url_Api:string=`${environment.base_Url}/api/servicios`

  constructor(private http:HttpClient) { }

  getServicios():Observable<Servicios[]>{
    return this.http.get<Servicios[]>(`${this.url_Api}`)
  }

  postServicio(servicio:Servicios):Observable<Servicios>{
    return this.http.post<Servicios>(`${this.url_Api}`,servicio);
  }

  putServicio(servicio:Servicios,id:number):Observable<Servicios>{
    return this.http.put<Servicios>(`${this.url_Api}/${id}`,servicio);
  }
  
  deleteServicio(id:number):Observable<Servicios>{
    return this.http.delete<Servicios>(`${this.url_Api}/${id}`);
  }
}
