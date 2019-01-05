import { Component, OnInit, Inject } from '@angular/core';

import { SettingsService } from '../../services/service.index';


@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {



  constructor(public  _ajustes: SettingsService) { }

  ngOnInit() {
    this.colocarCheck();
  }

  mudarCor(tema: string, link: any) {
    // console.log(tema, link);

    this._ajustes.aplicarTema(tema);

    this.aplicarCheck(link);
  }

  // mudar class working apenas
  aplicarCheck(link: any) {
    let selector: any = document.getElementsByClassName('selector');

    for ( let ref of selector ) {
      ref.classList.remove('working');
    }
      link.classList.add('working');
  }

  colocarCheck() {
    let selector: any = document.getElementsByClassName('selector');

    let tema = this._ajustes.ajustes.tema;

    for ( let ref of selector ) {
      if ( ref. getAttribute('data-theme') === tema ) {
        ref.classList.add('working');
        break;

      } else {
        ref.classList.remove('working');
      }
    }
  }
}
