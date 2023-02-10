
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { NavbarComponent } from './navbar/navbar.component';



const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
   loadChildren:()=>import('./components.module').then(m=>m.ComponentsModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}