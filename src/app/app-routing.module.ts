
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsRoutingModule } from './components/components-routing.module';
import { PagesRoutingModule } from './components/pages.routing';

const routes: Routes = [
  // {
  //   path:'dashboard',
  //   loadChildren:()=>import('./components/components.module').then(m=>m.ComponentsModule)
  // },
  {
    path:'login',
    loadChildren:()=>import('./auth/auth.module').then(m=>m.AuthModule),
    pathMatch:'full'
  },
  {
    path:'',
    redirectTo:'dashboard',
    pathMatch:'full'
  },
  {
    path:'**',
    redirectTo:'dashboard', 
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
            PagesRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
