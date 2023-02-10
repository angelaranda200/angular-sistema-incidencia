import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Incidencia } from '../interfaces/incidencia';

@Injectable({
  providedIn: 'root'
})
export class IncidenciaService {

  private url_Api:string=`${environment.base_Url}/api/incidencias`

  constructor(private http:HttpClient) { }

  getIncidencia():Observable<Incidencia[]>{
    return this.http.get<Incidencia[]>(`${this.url_Api}`);
  }

  postIncidencia(incidencia:Incidencia):Observable<Incidencia>{
    return this.http.post<Incidencia>(`${this.url_Api}`,incidencia);
  }

  putIncidencia(incidencia:Incidencia,id:number):Observable<Incidencia>{
    return this.http.put<Incidencia>(`${this.url_Api}/${id}`,incidencia);
  }

  deleteIncidencia(id:number):Observable<Incidencia>{
    return this.http.delete<Incidencia>(`${this.url_Api}/${id}`);
  }
}
