import { Component, OnInit } from '@angular/core';

import { Usuario } from './../../models/usuario.model';
import { SubindoArquivoService } from './../../services/subindo-arquivo/subindo-arquivo.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
})
// <!-- // ver aula 185 a 187 [ngClass]="oculto2">    -->     
export class ModalUploadComponent implements OnInit {

//   oculto2: string = '';
usuario: Usuario;
//   usuario: Usuario;
  imgSubir: File;
  imgTemp:string;

 constructor( public _subindoArquivoService: SubindoArquivoService,     
               public _modalUploadService: ModalUploadService)  {}

  ngOnInit() {
  }


  selecionarImagem( arquivo: File) { 
    if (!arquivo) {
        this.imgSubir = null;
        return;
    }
     if (arquivo.type.indexOf('image') < 0) { 
         swal('Apenas imagens' , 'O arquivo selecionado não é uma imagem', 'error');
         this.imgSubir = null;
         return;
     }

    this.imgSubir = arquivo;

    let reader = new FileReader(); 
    let urlImagenTemp = reader.readAsDataURL( arquivo );

    reader.onloadend = () => {
        this.imgTemp = reader.result;
    }
}


fecharModal() {
    this.imgTemp = null;
    this.imgSubir = null;

    this._modalUploadService.ocultarModal();
  }


  subirImagem() {

    this._subindoArquivoService.subirArquivo ( 
              this.imgSubir, this._modalUploadService.tipo, 
              this._modalUploadService.id )
                
              .then( resp => {

            this._modalUploadService.noticacao.emit( resp );
            this.fecharModal();

          })
          .catch( err => {
            console.log( 'Erro ao carregar img... ');
          });

  }

}
