import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuarios } from '../interfaces/usuarios';
import { map,catchError,tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  url_Api:string=`${environment.base_Url}/api/usuarios`;

  constructor(private http:HttpClient) { }

  getUsuarios():Observable<Usuarios[]>{
    return this.http.get<Usuarios[]>(`${this.url_Api}`);
  }

  postUsuarios(usuario:Usuarios):Observable<Usuarios>{
    return this.http.post<Usuarios>(`${this.url_Api}`,usuario)
    .pipe(
      catchError(e=>{

        if(e.status==400){
          return throwError(e);
        }
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
          
        }
        return throwError(e);
      })
    );
  }

  putUsuario(usuario:Usuarios,id:number):Observable<Usuarios>{
    return this.http.put<Usuarios>(`${this.url_Api}/${id}`,usuario);
  }

  deleteUsuario(id:number):Observable<Usuarios>{
    return this.http.delete<Usuarios>(`${this.url_Api}/${id}`);
  }
}
