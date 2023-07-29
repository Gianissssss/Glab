import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccesoriosComponent } from './pages/accesorios/accesorios.component';
import { AdminComponent } from './pages/admin/admin.component';
import { HombreComponent } from './pages/hombre/hombre.component';
import { MujerComponent } from './pages/mujer/mujer.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { HomeComponent } from './pages/home/home.component';
import { ConjuntosComponent } from './pages/conjuntos/conjuntos.component';
import { GuardiaGuard } from './guardia.guard';
const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"home",component:HomeComponent},
  {path:"admin",component:AdminComponent,canActivate:[GuardiaGuard]},
  {path: "mujer",component:MujerComponent},
  {path: "hombre",component:HombreComponent},
  {path:"conjuntos",component:ConjuntosComponent},
  {path:"accesorios",component:AccesoriosComponent},
  {path:"nosotros",component:NosotrosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }