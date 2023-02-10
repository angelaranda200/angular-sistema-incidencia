import { Area } from './../interfaces/area';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  private url_Api:string=`${environment.base_Url}/api/areas`

  constructor(private http:HttpClient) { }

  getAreas():Observable<Area[]>{
    return this.http.get<Area[]>(`${this.url_Api}`);
  }

  postArea(area:Area):Observable<Area>{
    return this.http.post<Area>(`${this.url_Api}`,area);
  }

  putArea(area:Area,id:number):Observable<Area>{
    return this.http.put<Area>(`${this.url_Api}/${id}`,area);
  }

  deleteArea(id:number):Observable<Area>{
    return this.http.delete<Area>(`${this.url_Api}/${id}`);
  }
}
