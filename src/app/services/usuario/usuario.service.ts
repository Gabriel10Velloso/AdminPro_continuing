import { Injectable } from '@angular/core';
import { Usuario } from './../../models/usuario.model';
import { URL_SERVICOS } from '../../config/config';
import { Http } from '@angular/http';

// import 'rxjs/Rx';
import 'rxjs/add/operator/map';


// Gambiarra pra funcinar SweetAlert
import { SweetAlert } from 'sweetalert/typings/core';
import * as _swal from 'sweetalert';
const swal: SweetAlert = _swal as any;


@Injectable()
export class UsuarioService {

  usuario: Usuario;

  constructor(public http: Http) {
      console.log('Serviço de usuario funcionando');
  }

  login(usuario: Usuario, recordame: boolean) {
    let url = URL_SERVICOS + '/login';
    return this.http.post(url, usuario);

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
