import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Tienda } from '../interfaces/tienda';

@Injectable({
  providedIn: 'root'
})
export class TiendaService {

  private url_Api:string=`${environment.base_Url}/api/tiendas`

  constructor(private http:HttpClient) { }

  getTienda():Observable<Tienda[]>{
    return this.http.get<Tienda[]>(`${this.url_Api}`);
  }

  postTienda(tienda:Tienda):Observable<Tienda>{
    return this.http.post<Tienda>(`${this.url_Api}`,tienda);
  }

  putTienda(tienda:Tienda,id:number):Observable<Tienda>{
    return this.http.put<Tienda>(`${this.url_Api}/${id}`,tienda);
  }

  deleteTienda(id:number):Observable<Tienda>{
    return this.http.delete<Tienda>(`${this.url_Api}/${id}`);
  }
}
