import { Injectable } from '@angular/core';
import { Usuario } from './../../models/usuario.model';
import { URL_SERVICOS } from '../../config/config';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import {  Router } from '@angular/router';

// import 'rxjs/Rx';
import 'rxjs/add/operator/map';


// Gambiarra pra funcinar SweetAlert
import { SweetAlert } from 'sweetalert/typings/core';
import * as _swal from 'sweetalert';
const swal: SweetAlert = _swal as any;


@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token;


  constructor( public http: HttpClient, public router: Router) {
              this.cargarStorage();

              console.log('Serviço de usuario funcionando');
  }




    guardarStorage( id: string, token: string, usuario: Usuario ) {
        localStorage.setItem('id', id );
        localStorage.setItem('token', token );
        localStorage.setItem('usuario', JSON.stringify(usuario) );
        
        this.usuario = usuario;
        this.token = token;
    }
    
    
    cargarStorage() {
        if ( localStorage.getItem('token')) {
            this.token = localStorage.getItem('token');
            this.usuario = JSON.parse( localStorage.getItem('usuario') );
            // this.menu = JSON.parse( localStorage.getItem('menu') );
        } else {
            this.token = '';
            this.usuario = null;
            // this.menu = [];
        }
    }
        
    logout() {
        this.usuario = null;
        this.token = '';
        // this.menu = [];
        // localStorage.clear();
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        // localStorage.removeItem('menu');
        
        this.router.navigate(['/login']);
    }

    estaLogado() {
        return ( this.token.length > 10 ) ? true : false;
    }

    // Login Google
    loginGoogle( token: string ) {
    let url = URL_SERVICOS + '/login/google';
        return this.http.post( url, { token } )
            .map( (resp: any) => {
                this.guardarStorage( resp.id, resp.token, resp.usuario );
                // console.log(resp);
                return true;
            });
    }

    // Login Normal
    login(usuario: Usuario, recordame: boolean=false) {
        // Check Box uma lógica simples pra deixar o email marcado no input login
        if (recordame) {
            localStorage.setItem('email', usuario.email);
        } else {
            localStorage.removeItem('email');
        }
        let url = URL_SERVICOS + '/login';
            return this.http.post(url, usuario)
                .map((resp: any) => {
                    this.guardarStorage( resp.id, resp.token, resp.usuario );
                });
    }


    criarUsuario(usuario: Usuario) {
        let url = URL_SERVICOS + '/usuario';

        return this.http.post( url, usuario)
            .map((res: any) => {   // Criando uma menssagem de sucesso (registro usuário)
                swal('Usuario criado', usuario.email, 'success');
                return res.usuario;
            });
        }
    }
