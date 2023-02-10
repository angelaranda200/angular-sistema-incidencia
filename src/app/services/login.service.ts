import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuarios } from '../interfaces/usuarios';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject = new Subject<boolean>();
  url_Api:string=`${environment.base_Url}`;


  constructor(private http:HttpClient) { }

  getUserCurrent(){
    return this.http.get(`${this.url_Api}/current-user`)
  }

  generateToken(loginData:any){
    return this.http.post(`${this.url_Api}/generate-token`,loginData)
  }

  loginUser(token:any){
    localStorage.setItem('token',token);
    this.loginStatusSubject.next(true);
    return true;
  }

  isLoggedIn(){
    let tokenString=localStorage.getItem('token');
    if(tokenString== undefined || tokenString=='' ||  tokenString==null){
      return false;
    }else{
      return true;
    }
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user')
    return true;
  }

  getToken(){
    return localStorage.getItem('token')
  }

  setUser(user:any){
    localStorage.setItem('user',JSON.stringify(user))
  }

  getUser(){
    let userStr = localStorage.getItem('user');
    if(userStr!=null){
      return JSON.parse(userStr);
    }else{
      this.logout();
      return null;
    }
  }

  getUserRole(){
    let user = this.getUser();
    //return user.authorities[0].authority;
    return user.usuarioRoles[0].nombreRole;
  }
}
