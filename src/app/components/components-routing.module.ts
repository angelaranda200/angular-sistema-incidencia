import { TicketResolveService } from './../services/ticket-resolve.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../guards/admin.guard';
import { NormalGuard } from '../guards/normal.guard';
import { AreaComponent } from './area/area.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EstadoTicketComponent } from './estado-ticket/estado-ticket.component';
import { IncidenciaComponent } from './incidencia/incidencia.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PagesComponent } from './pages.component';
import { PlanSlaComponent } from './plan-sla/plan-sla.component';
import { PrioridadComponent } from './prioridad/prioridad.component';
import { RolComponent } from './rol/rol.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { SolicitudComponent } from './solicitud/solicitud.component';
import { SolictudformComponent } from './solicitud/solictudform/solictudform.component';
import { TiendaComponent } from './tienda/tienda.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { SolicitudupdateComponent } from './solicitud/solicitudupdate/solicitudupdate.component';
import { SolicitudDetailsComponent } from './solicitud/solicitud-details/solicitud-details.component';

const routes: Routes = [
  {
    path:'',
    component:DashboardComponent,
    pathMatch:'full',
    canActivate:[AdminGuard]
  },
  {
    path:'mantenimiento',
    children:[
      {
        path:'area',
        component:AreaComponent
      },
      {
        path:'estado-ticket',
        component:EstadoTicketComponent
      },
      {
        path:'incidencia',
        component:IncidenciaComponent
      },
      {
        path:'plan-sla',
        component:PlanSlaComponent
      },
      {
        path:'prioridad',
        component:PrioridadComponent
      },
      {
        path:'rol',
        component:RolComponent
      },
      {
        path:'servicios',
        component:ServiciosComponent
      },
      {
        path:'tienda',
        component:TiendaComponent
      },
      {
        path:'usuarios',
        component:UsuariosComponent
      }
    ],
    canActivate:[AdminGuard]
  },
 {
    path:'solicitud',
    component:SolicitudComponent,
    canActivate:[AdminGuard]
  },
  {
    path:"solicitud/form",
    component:SolictudformComponent,
    canActivate:[AdminGuard],
   
  },
  {
    path:"solicitud/form/:idTickets",
    component:SolicitudupdateComponent,
    canActivate:[AdminGuard],
    resolve:{
      ticket :TicketResolveService
    }
  },
  
  {
    path:"solicitud/details/:idTickets",
    component:SolicitudDetailsComponent,
    canActivate:[AdminGuard],
    resolve:{
      ticket :TicketResolveService
    }
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
