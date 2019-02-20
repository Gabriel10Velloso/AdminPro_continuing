import { Usuario } from './../../models/usuario.model';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';


// Gambiarra pra funcinar SweetAlert
import { SweetAlert } from 'sweetalert/typings/core';
import * as _swal from 'sweetalert';
const swal: SweetAlert = _swal as any;


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    usuario: Usuario;
    imgSubir: File;
    imgTemp:string;

  constructor(private _usuarioService: UsuarioService) { 

        this.usuario = this._usuarioService.usuario;
        console.log(this.usuario.nome);
  }

  ngOnInit() {
  }

  guardar(usuario: Usuario) {
    this.usuario.nome = usuario.nome;
    if (!this.usuario.google) {
        this.usuario.email = usuario.email;
    }
    this._usuarioService.atualizarUsuario(this.usuario)
         .subscribe(resp => {
            // console.log(resp);
         });
  }

  // esse validador é apenas para mudar o nome do aquivo na hora de subir a imagem;
  selecionarImagem( arquivo: File) { // aula 173
    if (!arquivo) {
        this.imgSubir = null;
        return;
    }
     if (arquivo.type.indexOf('image') < 0) { // aletar se não for img
         swal('Apenas imagens' , 'O arquivo selecionado não é uma imagem', 'error');
         this.imgSubir = null;
         return;
     }

    this.imgSubir = arquivo;
    // console.log(event);
    // javascript puto

    let reader = new FileReader(); // isso é para atualizar a imagem antes de salvar verificar outra forma mais apropriada 
    let urlImagenTemp = reader.readAsDataURL( arquivo );

    reader.onloadend = () => {
        // console.log(reader.result); // retorna dados na base 64 ... super legal 
        this.imgTemp = reader.result;
    }
  }



  trocarImagem() {

    this._usuarioService.trocarImagem(this.imgSubir, this.usuario._id);

  }

}
