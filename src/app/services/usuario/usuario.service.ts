import { Injectable } from "@angular/core";
import { Usuario } from "./../../models/usuario.model";
import { URL_SERVICOS } from "../../config/config";
import { Http } from "@angular/http";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { SubindoArquivoService } from "../subindo-arquivo/subindo-arquivo.service";
import { Observable } from "rxjs";
// import 'rxjs/Rx';
import "rxjs/add/operator/map";

// Gambiarra pra funcinar SweetAlert
import { SweetAlert } from "sweetalert/typings/core";
import * as _swal from "sweetalert";
const swal: SweetAlert = _swal as any;

@Injectable()
export class UsuarioService {
    usuario: Usuario;
    token;
    menu: any =[]
    constructor(public http: HttpClient, public router: Router,
        public _subindoArquivoService: SubindoArquivoService) {
        this.cargarStorage();

        console.log("Serviço de usuario funcionando");
    }

    guardarStorage(id: string, token: string, usuario: Usuario, menu: any) {
        localStorage.setItem('id', id);
        localStorage.setItem('token', token);
        localStorage.setItem('usuario', JSON.stringify(usuario));
        localStorage.setItem('menu', JSON.stringify(menu));

        this.usuario = usuario;
        this.token = token;
        this.menu = menu;
    }

    cargarStorage() {
        if (localStorage.getItem('token')) {
            this.token = localStorage.getItem('token');
            this.usuario = JSON.parse(localStorage.getItem('usuario'));
            this.menu = JSON.parse( localStorage.getItem('menu') );
        } else {
            this.token = '';
            this.usuario = null;
            this.menu = [];
        }
    }

    logout() {
        this.usuario = null;
        this.token = '';
        // this.menu = [];
        // localStorage.clear();
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
        localStorage.removeItem('menu');

        this.router.navigate(["/login"]);
    }

    estaLogado() {
        return this.token.length > 10 ? true : false;
    }

    // Login Google
    loginGoogle(token: string) {
        let url = URL_SERVICOS + "/login/google";
        return this.http.post(url, { token }).map((resp: any) => {
            this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
            // console.log(resp);
            return true;
        });
    }

    // Login Normal
    login(usuario: Usuario, recordame: boolean = false) {
        // Check Box uma lógica simples pra deixar o email marcado no input login
        if (recordame) {
            localStorage.setItem("email", usuario.email);
        } else {
            localStorage.removeItem("email");
        }
        let url = URL_SERVICOS + "/login";
        return this.http.post(url, usuario)
        .map( (resp: any) => {
            this.guardarStorage( resp.id, resp.token, resp.usuario, resp.menu );
            return true;
          })
          .catch( err => {
      
            swal( 'Error ao logar-se', err.error.mensagem, 'error' );
            return Observable.throw( err );
          });

    }

    criarUsuario(usuario: Usuario) {
        let url = URL_SERVICOS + "/usuario";

        return this.http.post(url, usuario).map((res: any) => {
            // Criando uma menssagem de sucesso (registro usuário)
            swal("Usuario criado", usuario.email, "success");
            return res.usuario;
        })
        .catch( err => {
            console.log(err);
            swal( err.error.mensagem, err.error.errors.message, 'error' );
            return Observable.throw( err );
          });
    }

    atualizarUsuario(usuario: Usuario) {
        let url = URL_SERVICOS + "/usuario/" + usuario._id;
        url += "?token=" + this.token;
        // console.log(url);

        return this.http.put(url, usuario)
            .map((resp: any) => {

                if (usuario._id === this.usuario._id) {
                    let usuarioDB: Usuario = resp.usuario;
                    this.guardarStorage(usuarioDB._id, this.token, usuarioDB, this.menu);
                }
            swal("Usuário atualizado", usuario.nome, "success");

            return true;
        })
        .catch( err => {
            console.log(err);
            swal( err.error.mensagem, err.error.errors.message, 'error' );
            return Observable.throw( err );
          });
    }

    trocarImagem( arquivo: File, id: string ) { // 173

        this._subindoArquivoService.subirArquivo( arquivo, 'usuarios', id )
              .then( (resp: any) => {
                console.log(resp);
                this.usuario.img = resp.usuario.img;
                swal( 'Imagen Atualizada', this.usuario.nome, 'success' );
                this.guardarStorage( id, this.token, this.usuario, this.menu );
    
              })
              .catch( resp => {
                console.log( resp );
              }) ;
    
      }

      carregarUsuarios(desde:number = 0) {
        let url = URL_SERVICOS + '/usuario?desde=' + desde;
        return this.http.get(url);
      }

  
      buscarUsuarios( termino: string ) { // aula 182
                                         // em vez de fazer um pipe no for ele fez de foma diferente a busca 
        let url = URL_SERVICOS + '/buscar/collection/usuarios/' + termino;
        return this.http.get( url )
                    .map( (resp: any) => resp.usuarios );
    
      }



      deletarUsuario( id: string ) {

        let url = URL_SERVICOS + '/usuario/' + id;
        url += '?token=' + this.token;
    
        return this.http.delete( url )
                    .map( resp => {
                      swal('Usuario apagado', 'O usuário foi deletado corretamente', 'success');
                      return true;
                    });
    
      }
}