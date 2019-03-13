import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Injectable()
export class ModalUploadService {

  public tipo: string;
  public id: string;

  public oculto2: string = 'oculto';

  public noticacao = new EventEmitter<any>();

  constructor() { }  // ver aula 185 a 187

  ocultarModal() {
    this.oculto2 = 'oculto';
    this.tipo = null;
    this.id = null;
  }

  mostrarModal( tipo: string, id: string ) {
    this.oculto2 = '';
    this.id = id;
    this.tipo = tipo;
  }

}
