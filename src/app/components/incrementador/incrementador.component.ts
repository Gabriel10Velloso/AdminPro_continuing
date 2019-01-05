import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { cleanSession } from 'selenium-webdriver/safari';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {
  @ViewChild('txtProgresso') txtProgresso: ElementRef;
  // @Input() legenda: string; Posso trabalhar assim ou mudando o nome da variável... exemplo abaixo
  @Input('gabrielLegenda') legenda: string;
  @Input() progresso: number;

  @Output() alterandoValor: EventEmitter<number> = new EventEmitter();

  constructor() {
    // console.log('Progresso', this.progresso);
  }

  ngOnInit() {
    // console.log('Legenda', this.legenda);
    // console.log('Progresso', this.progresso);
  }

  onChanges( newValu: number) {
    // console.log(newValu);

    // const elemHTML: any = document.getElementsByName('progresso')[0];
    // console.log(elemHTML.value);

    if ( newValu >= 100) {
      this.progresso = 100;
    } else if ( newValu <= 0 ) {
      this.progresso = 0;
    } else {
      this.progresso = newValu;
    }
    // elemHTML.value = Number(this.progresso);
    // elemHTML.value = this.progresso;
    this.txtProgresso.nativeElement.value = this.progresso;
    this.alterandoValor.emit(this.progresso);

  }


   mudarValor(valor: number) {
     if (this.progresso >= 100 && valor > 0) {
       this.progresso = 100;
       return;
     }
     if (this.progresso <= 0 && valor <= 0) {
      this.progresso = 0;
      return;
    }
    this.progresso = this.progresso + valor;
    this.alterandoValor.emit(this.progresso);
    this.txtProgresso.nativeElement.focus();
  }

}
