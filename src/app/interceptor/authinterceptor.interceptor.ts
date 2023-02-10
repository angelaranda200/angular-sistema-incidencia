import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';




@Injectable()
export class AuthinterceptorInterceptor implements HttpInterceptor {

  constructor(private loginService:LoginService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    let authReq = req;
    const token = this.loginService.getToken()
    if(token!=null){
      authReq=authReq.clone({
        setHeaders:{Authorization: `Bearer ${token}` }
      })
    }

    return next.handle(authReq);
  }
}

export const authInterceptorProvider=[
  {
    provide:HTTP_INTERCEPTORS,
    useClass:AuthinterceptorInterceptor,
    multi:true
  }
]
