import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { UsuarioService } from './../usuario/usuario.service';

@Injectable()
export class AdminGuard implements CanActivate {

    constructor(private _usuarioService: UsuarioService,
                private rauter: Router) {}

      canActivate() {
            if (this._usuarioService.usuario.role === 'ADMIN_ROLE') {
                return true;
            }
                console.log('Usuário Bloqueado');
                this._usuarioService.logout();
                // this.rauter.navigate(['/login']);
                return false;
      }
}
