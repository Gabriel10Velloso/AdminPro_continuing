import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { UsuarioService } from '../usuario/usuario.service';
import { Observable } from 'rxjs';

@Injectable()
export class LoginGuardGuard  implements CanActivate {

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router) {}


    canActivate() {
        if ( this._usuarioService.estaLogado() ) {
            console.log( 'Logado pelo ADMIN GUARD');
            return true;
          } else {
            console.log( 'Bloqueado pelo ADMIN GUARD');
            this._usuarioService.logout();
            // this.router.navigate(['/login']);
            return false;
          }
      }

}
