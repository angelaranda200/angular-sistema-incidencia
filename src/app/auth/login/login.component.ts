import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;
  submitted:boolean=false
  loginData:FormGroup = this.fb.group({
    username:['',Validators.required],
    password:['',Validators.required]
  })

  constructor(private fb:FormBuilder,
              private loginservice:LoginService,
              private router:Router) { }

  ngOnInit(): void {
  }

  formSubmit(){
    this.submitted=true
    const {valid} = this.loginData
    if(valid){
      this.loginservice.generateToken(this.loginData.value).subscribe(
        (res:any)=>{
          console.log(res);
          this.loginservice.loginUser(res.token);
  
          this.loginservice.getUserCurrent().subscribe(
            (user:any)=>{
              this.loginservice.setUser(user);
              console.log(user);
  
              if(this.loginservice.getUserRole()=='ADMIN'){
                  this.router.navigateByUrl('/dashboard')
                  this.loginservice.loginStatusSubject.next(true);
              }else if(this.loginservice.getUserRole()=='USUARIO'){
                  this.router.navigateByUrl('/dashboard');
                  this.loginservice.loginStatusSubject.next(true);
              }else{
                this.loginservice.logout();
              }
              
            }
          )
        },
        err=>{
          console.log(err);
          
        }
      )
    }else {
      return
    }
    
  }

}
