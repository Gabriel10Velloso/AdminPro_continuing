import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable()
export class SettingsService {

  ajustes: Ajustes = {
     temaUrl:  'href="assets/css/colors/default-dark.css',
     tema: 'default'
   };


   constructor(@Inject(DOCUMENT) private _document) {

        this.carregarAjustes();
   }

    guardarAjustes() {
      // console.log('Guardado no localStorage');
      localStorage.setItem('ajustes', JSON.stringify(this.ajustes) );
    }

    carregarAjustes() {

      if ( localStorage.getItem('ajustes') ) {
        this.ajustes = JSON.parse(localStorage.getItem('ajustes') );

        this.aplicarTema(this.ajustes.tema);
         // console.log('Carregando os ajustes do localStorage', this.ajustes.temaUrl);

      } else {
        // console.log('Usnado valor prédefinidos');
        this.aplicarTema(this.ajustes.tema);

      }
    }

    aplicarTema(tema: string) {

      let url = `assets/css/colors/${tema}.css`;
      this._document.getElementById('tema').setAttribute('href' , url);

      this.ajustes.tema = tema;
      this.ajustes.temaUrl = url;

      this.guardarAjustes();
    }
}



interface Ajustes {
  temaUrl: string;
  tema: string;
}
