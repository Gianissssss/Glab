import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot,Router,CanActivate, RouterStateSnapshot,UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from './servicios/usuario.service';
import { LoginGoogleService } from './servicios/login-google.service';

@Injectable({
  providedIn:'root'
})
export class GuardiaGuard implements CanActivate {
  constructor(private servicioLogin:LoginGoogleService,private router:Router){}

  canActivate(
    route:ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.servicioLogin.estaLogueado()){
        return true
      }
      else{
        this.router.navigateByUrl("Login")
        return false
      }
    }  
}
