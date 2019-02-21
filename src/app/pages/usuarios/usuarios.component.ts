import { Component, OnInit } from "@angular/core";
import { Usuario } from "./../../models/usuario.model";
import { UsuarioService } from "../../services/usuario/usuario.service";
import { ModalUploadService } from './../../components/modal-upload/modal-upload.service';

@Component({
  selector: "app-usuarios",
  templateUrl: "./usuarios.component.html",
  styles: []
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[];
  desde: number = 0;

  totalRegistros: number = 0;
  carregando: boolean = true;

  // aula 181 foi acrecentado em usuario.js GOOGLE  Usuario.find({}, 'nome email img role google')
  constructor(public _usuarioService: UsuarioService, 
    public _modalUploadService: ModalUploadService) {}

  ngOnInit() {
    this.carregarUsuarios();

    this._modalUploadService.noticacao
         .subscribe( resp => this.carregarUsuarios());

  }

 
  mostrarModal( id: string ) {

    this._modalUploadService.mostrarModal( 'usuarios', id );
  }

  carregarUsuarios() {
    this.carregando = true;
    this._usuarioService.carregarUsuarios(this.desde).subscribe((resp: any) => {
      this.totalRegistros = resp.total;
      this.usuarios = resp.usuarios;
      this.carregando = false;
    });
  }

  cambiarDesde(valor: number) {
    // carregando de 5 em 5 usuários
    let desde = this.desde + valor;

    if (desde >= this.totalRegistros) {
      return;
    }
    if (desde < 0) {
      return;
    }
    this.desde += valor;
    this.carregarUsuarios();
  }

  buscarUsuarios(termino: string) {
    // busca usuário (keyup)= 'buscarUsuarios(input.value)'
    if (termino.length <= 0) {
      this.carregarUsuarios();
      return;
    }
    this.carregando = true;

    this._usuarioService
      .buscarUsuarios(termino)
      .subscribe((usuarios: Usuario[]) => {
        this.usuarios = usuarios;
        this.carregando = false;
      });
  }

  guardarUsuario(usuario: Usuario) {
      this._usuarioService.atualizarUsuario(usuario)
          .subscribe();
  }





    deletarUsuario(usuario: Usuario) {
        if (usuario._id === this._usuarioService.usuario._id) {
            swal("Não pode deletar o usuário", "Não pode deletar a si mesmo", "error");
            return;
        }
        swal({
            title: "Está Certo Disso?",
            text: "Você pretende deletar o usuário " + usuario.nome,
            icon: "warning",
            buttons: ["Cancelar", "Apagar"],
            dangerMode: true
        }).then(borrar => {
            if (borrar) {
                this._usuarioService.deletarUsuario(usuario._id).subscribe(borrado => {
                    this.carregarUsuarios();
                });
            }
        });
    }
}
