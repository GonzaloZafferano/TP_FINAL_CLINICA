import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Perfil } from '../models/enums/perfil';
import { UsuarioService } from '../services/usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class RegistroAdminGuard implements CanActivate, CanActivateChild, CanDeactivate<unknown> {
  constructor(private usuarioService: UsuarioService, private router: Router,) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,    
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.usuarioService.getUsuarioActualBasico && this.usuarioService.getUsuarioActualBasico.perfil == Perfil.administrador) {
        return true;
      }
      this.router.navigate(['home']);
      return false;
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  
}
