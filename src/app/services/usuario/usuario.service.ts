import { Injectable } from '@angular/core';
import { Usuario } from './../../models/usuario.model';
import { URL_SERVICOS } from '../../config/config';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';

// import 'rxjs/Rx';
import 'rxjs/add/operator/map';


// Gambiarra pra funcinar SweetAlert
import { SweetAlert } from 'sweetalert/typings/core';
import * as _swal from 'sweetalert';
const swal: SweetAlert = _swal as any;


@Injectable()
export class UsuarioService {

  usuario: Usuario;

  constructor(public http: HttpClient) {
      console.log('Serviço de usuario funcionando');
  }

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
            localStorage.setItem('id', resp.id);
            localStorage.setItem('tokem', resp.token);
            // tenho que converter para String (localStorage só guarda string)
             localStorage.setItem('usuario', JSON.stringify(resp.usuario));
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
