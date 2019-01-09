import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Usuario } from './../models/usuario.model';
import { UsuarioService } from './../services/usuario/usuario.service';

declare function  init_plugins();


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
    usuario: Usuario;
    recordame: boolean = false;

  constructor( public router: Router, public _usuarioService: UsuarioService ) { }

  ngOnInit() {
    init_plugins();
  }


  login(f: NgForm) {
      if (f.invalid) {
        return;
      }
      let usuairo = new Usuario('', f.value.email, f.value.password);

      this._usuarioService.login (usuairo, f.value.recordame)
          .subscribe (res => {
                console.log(res);
                error => console.log( error );
                console.log(res);
          });
          
    //   console.log(f.valid);
    //   console.log(f.value);
    // this.router.navigate([ '/dashboard' ]);
  }

}
