import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn = false;
  user = null;

  opened = false;
  panelOpenState = false;
  constructor(public login:LoginService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.login.isLoggedIn();
    this.user = this.login.getUser();
    // this.login.loginStatusSubject.asObservable().subscribe(
    //   (data:any)=>{
    //     this.isLoggedIn = this.login.isLoggedIn();
    //     this.user = this.login.getUser();
    //     console.log(data);
        
    //   },
    //   err=>{
    //     console.log(err);
        
    //   }
    // )
  }

  logout(){
    this.login.logout();
    this.isLoggedIn == false;
    this.user == null;
    this.login.loginStatusSubject.next(false);
  }

}
