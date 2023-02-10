import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsRoutingModule } from './components-routing.module';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { AreaComponent } from './area/area.component';
import { EstadoTicketComponent } from './estado-ticket/estado-ticket.component';
import { IncidenciaComponent } from './incidencia/incidencia.component';
import { PlanSlaComponent } from './plan-sla/plan-sla.component';
import { PrioridadComponent } from './prioridad/prioridad.component';
import { RolComponent } from './rol/rol.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { SolicitudComponent } from './solicitud/solicitud.component';
import { TiendaComponent } from './tienda/tienda.component';
import { AreadialogComponent } from './area/areadialog/areadialog.component';
import { EstadodialogComponent } from './estado-ticket/estadodialog/estadodialog.component';
import { IncidenciadialogComponent } from './incidencia/incidenciadialog/incidenciadialog.component';
import { PlandialogComponent } from './plan-sla/plandialog/plandialog.component';
import { PrioridaddialogComponent } from './prioridad/prioridaddialog/prioridaddialog.component';
import { RoldialogComponent } from './rol/roldialog/roldialog.component';
import { ServiciosdialogComponent } from './servicios/serviciosdialog/serviciosdialog.component';
import { TiendadialogComponent } from './tienda/tiendadialog/tiendadialog.component';
import { UsuariosdialogComponent } from './usuarios/usuariosdialog/usuariosdialog.component';
import { SolictudformComponent } from './solicitud/solictudform/solictudform.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { PagesComponent } from './pages.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import localeEs from '@angular/common/locales/es-PE';
import {registerLocaleData} from '@angular/common';
import { LOCALE_ID} from '@angular/core';

import {QuillModule} from 'ngx-quill';
import { SolicitudupdateComponent } from './solicitud/solicitudupdate/solicitudupdate.component';
import { SolicitudDetailsComponent } from './solicitud/solicitud-details/solicitud-details.component';

registerLocaleData(localeEs);

@NgModule({
  declarations: [
    UsuariosComponent,
    AreaComponent,
    EstadoTicketComponent,
    IncidenciaComponent,
    PlanSlaComponent,
    PrioridadComponent,
    RolComponent,
    ServiciosComponent,
    SolicitudComponent,
    TiendaComponent,
    AreadialogComponent,
    EstadodialogComponent,
    IncidenciadialogComponent,
    PlandialogComponent,
    PrioridaddialogComponent,
    RoldialogComponent,
    ServiciosdialogComponent,
    TiendadialogComponent,
    UsuariosdialogComponent,
    SolictudformComponent,
    DashboardComponent,
    PagesComponent,
    NavbarComponent,
    SolicitudupdateComponent,
    SolicitudDetailsComponent
    
  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    QuillModule
  ],
  exports:[
    NavbarComponent
  ],
  providers:[
    {
      provide: LOCALE_ID, useValue:'es-PE'
    }
  ]
})
export class ComponentsModule { }
