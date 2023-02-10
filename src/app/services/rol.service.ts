import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Rol } from '../interfaces/rol';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private url_Api:string=`${environment.base_Url}/api/roles`

  constructor(private http:HttpClient) { }

  getRoles():Observable<Rol[]>{
    return this.http.get<Rol[]>(`${this.url_Api}`)
  }

  postRol(rol:Rol):Observable<Rol>{
    return this.http.post<Rol>(`${this.url_Api}`,rol);
  }

  putRol(rol:Rol,id:number):Observable<Rol>{
    return this.http.put<Rol>(`${this.url_Api}/${id}`,rol);
  }

  deleteRol(id:number):Observable<Rol>{
    return this.http.delete<Rol>(`${this.url_Api}/${id}`);
  }
}
