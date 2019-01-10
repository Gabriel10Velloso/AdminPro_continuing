import { Usuario } from './../../models/usuario.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

    usuario: Usuario;

  constructor(  public _usuarioService: UsuarioService,
                public router: Router ) { }

  ngOnInit() {
      this.getUsuario();
  }

  getUsuario() {
      this.usuario = this._usuarioService.usuario;
  }
}
