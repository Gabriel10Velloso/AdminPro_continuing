import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Usuario } from './../models/usuario.model';
import { UsuarioService } from '../services/usuario/usuario.service';

declare function  init_plugins();

// Autenticação Google Signin
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    usuario: Usuario;
    recordame: boolean = false;
    email: string;
    auth2: any;



  constructor( public router: Router, public _usuarioService: UsuarioService ) { }



  ngOnInit() {
    init_plugins();
    this.googleInit();
    
    // uma lógica simples pra deixar o email marcado no input login
    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 1) {
        this.recordame = true;
    }
  }



// Google SignIn
googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '284936682430-p41gnnqnf9gdcurort95pvikojtcqouu.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin( document.getElementById('btnGoogle') );

    });
  }

  
  attachSignin( element ) {
    this.auth2.attachClickHandler( element, {}, (googleUser) => {
        // mensagem do google
        //   let profile = googleUser.getBasicProfile();
        //   console.log(profile);
      let token = googleUser.getAuthResponse().id_token;
      console.log(token);
        this._usuarioService.loginGoogle( token )
                .subscribe( () => window.location.href = '#/dashboard'  );
      });
  }


//  login convencional
  login(f: NgForm) {
      if (f.invalid) {
        return;
      }
      let usuairo = new Usuario('', f.value.email, f.value.password);

      this._usuarioService.login(usuairo, f.value.recordame)
          .subscribe (conectado =>   { 
            this.router.navigate(['/dashboard']);
             //   console.log(f.valid);
            //   console.log(f.value);
          });
        }
    }
