import { Component, OnInit } from '@angular/core';
import { Solicitud } from 'src/app/interfaces/solicitud';
import { LoginService } from 'src/app/services/login.service';
import { SolicitudService } from 'src/app/services/solicitud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user:any = null;
  ticketAbierto:Solicitud[]=[]
  ticketCerrado:Solicitud[]=[]
  tickets:Solicitud[]=[]

  constructor(public loginService:LoginService,
              private solicitudService:SolicitudService) { }

  ngOnInit(): void {
    this.user = this.loginService.getUser();

    this.getSolicitudes()
    this.getTicketAbierto()
    this.getTicketCerrado()
  }

  getSolicitudes(){
    this.solicitudService.getSolicitud().subscribe(
      data=>{
        this.tickets=data
        console.log(this.tickets.length);
        
        
       
        
        
        
      }
    )
  }

  getTicketAbierto(){
    this.solicitudService.getSolicitud().subscribe(
      data=>{
        
        for(let i=0;i<data.length;i++){
          if(data[i].estado_ticket.nombre.includes("ABIERTO")){
              //console.log(data[i]);
              this.ticketAbierto.push(data[i])
          }
        }
       console.log(this.ticketAbierto);
          
      }
    )
  }

  getTicketCerrado(){
    this.solicitudService.getSolicitud().subscribe(
      data=>{
        
        for(let i=0;i<data.length;i++){
          if(data[i].estado_ticket.nombre.includes("FINALIZADO")){
              //console.log(data[i]);
              this.ticketCerrado.push(data[i])
          }
        }
       console.log(this.ticketCerrado);
          
      }
    )
  }



}
