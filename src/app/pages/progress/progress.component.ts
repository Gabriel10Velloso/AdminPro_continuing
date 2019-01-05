import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css'],
})
export class ProgressComponent implements OnInit {

  progresso1: number = 50;
  progresso2: number = 20;

  constructor() { }

  ngOnInit() {
  }

  // atualizar(event: number) {
  //   console.log('Evento' , event);
  //   this.progresso1 = event;
  // }
}
