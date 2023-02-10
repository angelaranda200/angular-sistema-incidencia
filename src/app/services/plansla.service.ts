import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PlanSla } from '../interfaces/plan-sla';

@Injectable({
  providedIn: 'root'
})
export class PlanslaService {

  private url_Api:string=`${environment.base_Url}/api/plansla`

  constructor(private http:HttpClient) { }

  getPlanSla():Observable<PlanSla[]>{
    return this.http.get<PlanSla[]>(`${this.url_Api}`);
  }

  postPlanSla(ps:PlanSla):Observable<PlanSla>{
    return this.http.post<PlanSla>(`${this.url_Api}`,ps);
  }

  putPlanSla(ps:PlanSla,id:number):Observable<PlanSla>{
    return this.http.put<PlanSla>(`${this.url_Api}/${id}`,ps);
  }

  deletePlanSla(id:number):Observable<PlanSla>{
    return this.http.delete<PlanSla>(`${this.url_Api}/${id}`);
  }
}
