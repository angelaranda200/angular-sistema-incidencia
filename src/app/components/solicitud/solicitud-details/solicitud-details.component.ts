import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Area } from 'src/app/interfaces/area';
import { EstadoTicket } from 'src/app/interfaces/estado-ticket';
import { HiloTicket } from 'src/app/interfaces/hilo-ticket';
import { Incidencia } from 'src/app/interfaces/incidencia';
import { Prioridad } from 'src/app/interfaces/prioridad';
import { Solicitud } from 'src/app/interfaces/solicitud';
import { Tienda } from 'src/app/interfaces/tienda';
import { Usuarios } from 'src/app/interfaces/usuarios';
import { AreaService } from 'src/app/services/area.service';
import { EstadoTicketService } from 'src/app/services/estado-ticket.service';
import { ImageProcessingService } from 'src/app/services/image-processing.service';
import { IncidenciaService } from 'src/app/services/incidencia.service';
import { LoginService } from 'src/app/services/login.service';
import { PrioridadService } from 'src/app/services/prioridad.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { TiendaService } from 'src/app/services/tienda.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-solicitud-details',
  templateUrl: './solicitud-details.component.html',
  styleUrls: ['./solicitud-details.component.css']
})
export class SolicitudDetailsComponent implements OnInit {

  solicitudForm!:FormGroup;
  adjuntoTicketForm!:FormGroup;
  user:Usuarios=null;

  estadoTickets:EstadoTicket[]=[];
  solicitudes:Solicitud[]=[];
  areas:Area[]=[];
  incidencias:Incidencia[]=[];
  prioridades:Prioridad[]=[];
  tiendas:Tienda[]=[];
  usuarios:Usuarios[]=[];
  hilosTicket:HiloTicket[]=[]

  abierto:EstadoTicket;

  constructor(
              private solicitudService:SolicitudService,
              private fb:FormBuilder,
              private etService:EstadoTicketService,
              private sanitizer:DomSanitizer,
              private areaService:AreaService,
              private prioridadService:PrioridadService,
              private incidenciaService:IncidenciaService,
              private tiendaService:TiendaService,
              private loginService:LoginService,
              private usuariosService:UsuariosService,
              public activatedRoute:ActivatedRoute,
              private imageprocessingService:ImageProcessingService,
              private router:Router
  ) { }

  ngOnInit(): void {
    this.getEstadoTicket();
    this.getArea();
    this.getIncidencias();
    this.getPrioridades();
    this.getTiendas();
    this.getUsuarios();
    
    

    this.user = this.loginService.getUser();

    this.solicitudForm=this.fb.group({
      idTicket:[0],
      vencido:[''],
      descripcion:[''],
      fecha_creacion:[''],
      fecha_vencimiento:[''],
      fecha_cierre:[''],
      fecha_actualizacion:[''],
      ultimo_mensaje:[''],
      ultima_respuesta:[''],
      numero:[''],
      adjuntotickets:this.fb.array([]),
      usuario:this.user,
      estado_ticket:[''],
      prioridad:[''],
      incidencia:[''],
      area:[''],
      tienda:[''],
      hilos_ticket:this.fb.array([])
    })

    this.solicitudForm.controls['idTicket'].setValue(this.activatedRoute.snapshot.data['ticket'].idTicket)
    this.solicitudForm.controls['usuario'].setValue(this.activatedRoute.snapshot.data['ticket'].usuario)
    this.solicitudForm.controls['estado_ticket'].setValue(this.activatedRoute.snapshot.data['ticket'].estado_ticket)
    this.solicitudForm.controls['prioridad'].setValue(this.activatedRoute.snapshot.data['ticket'].prioridad)
    this.solicitudForm.controls['tienda'].setValue(this.activatedRoute.snapshot.data['ticket'].tienda);
    this.solicitudForm.controls['incidencia'].setValue(this.activatedRoute.snapshot.data['ticket'].incidencia);
    this.solicitudForm.controls['area'].setValue(this.activatedRoute.snapshot.data['ticket'].area);
    this.solicitudForm.controls['fecha_creacion'].setValue(this.activatedRoute.snapshot.data['ticket'].fecha_creacion)
    
    this.solicitudForm.controls['hilos_ticket'].patchValue(this.activatedRoute.snapshot.data['ticket'].hilos_ticket.forEach(ht=>{
        this.hiloTicketArr.push(this.fb.group(ht))
    }))
     
    this.solicitudForm.controls['adjuntotickets'].patchValue(this.activatedRoute.snapshot.data['ticket'].adjuntotickets.forEach(at=>{
      this.adjuntoTicketArr.push(this.fb.group(at))
    }));
    this.hilosTicket = this.activatedRoute.snapshot.data['ticket'].hilos_ticket
  }
  getUsuarios(){
    this.usuariosService.getUsuarios().subscribe(
      res=>{
        this.usuarios=res;
      }
    )
  }

  getEstadoTicket(){
    this.etService.getEstadoTicket().subscribe(
      res=>{
        this.estadoTickets=res;
        this.abierto = res[3]
      }
    )
  }
  getSolicitud(){
    this.solicitudService.getSolicitud().subscribe(
      res=>{
          this.solicitudes=res;
      }
    )
  }

  getArea(){
    this.areaService.getAreas().subscribe(
      res=>{
        this.areas=res;
      }
    )
  }

  getIncidencias(){
    this.incidenciaService.getIncidencia().subscribe(
      res=>{
        this.incidencias=res;
      }
    )
  }

  getPrioridades(){
    this.prioridadService.getPrioridad().subscribe(
      res=>{
        this.prioridades=res;
      }
    )
  }

  getTiendas(){
    this.tiendaService.getTienda().subscribe(
      res=>{
        this.tiendas=res;
      }
    )
  }

  get adjuntoTicketArr(){
    return this.solicitudForm.get('adjuntotickets') as FormArray
  }

  get hiloTicketArr(){
    return this.solicitudForm.get('hilos_ticket') as FormArray
  }

  hiloTicketForm(){
    return this.fb.group({
      idHiloTicket:[''],
      contenido:[''],
      fecha_creacion:[''],
      usuario:this.user
    })
  }

  compararEstado(o1:EstadoTicket,o2:EstadoTicket):boolean{
    if(o1 === undefined && o2 === undefined){
      return true;
    }
      return o1 === null || o2 === null || o1 === undefined || o2 === undefined   ? false : o1.idEstadoTicket === o2.idEstadoTicket;
  }

  compararPrioridad(o1:Prioridad,o2:Prioridad):boolean{
    if(o1 === undefined && o2 === undefined){
      return true;
    }
      return o1 === null || o2 === null || o1 === undefined || o2 === undefined   ? false : o1.idPrioridad === o2.idPrioridad;
  }

  compararArea(o1:Area,o2:Area):boolean{
    if(o1 === undefined && o2 === undefined){
      return true;
    }
      return o1 === null || o2 === null || o1 === undefined || o2 === undefined   ? false : o1.idArea === o2.idArea;
  }

  compararEmpresa(o1:Tienda,o2:Tienda):boolean{
    if(o1 === undefined && o2 === undefined){
      return true;
    }
      return o1 === null || o2 === null || o1 === undefined || o2 === undefined   ? false : o1.idTienda === o2.idTienda;
  }

  compararIncidencia(o1:Incidencia,o2:Incidencia):boolean{
    if(o1 === undefined && o2 === undefined){
      return true;
    }
      return o1 === null || o2 === null || o1 === undefined || o2 === undefined   ? false : o1.idIncidencia === o2.idIncidencia;
  }

  compararUsuario(o1:Usuarios,o2:Usuarios):boolean{
    if(o1 === undefined && o2 === undefined){
      return true;
    }
      return o1 === null || o2 === null || o1 === undefined || o2 === undefined   ? false : o1.idUsuario === o2.idUsuario;
  }

}
