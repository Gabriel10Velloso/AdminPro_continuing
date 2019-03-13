import { SharedService } from './shared.service';
import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {

  menu: any = [
    {
    titulo: 'Principal',
    icono: 'mdi mdi-gauge',
    submenu: [
        {titulo: 'Dashboard' , url: '/dashboard'},
        {titulo: 'Progress' , url: '/progress'},
        {titulo: 'Gráficos' , url: '/graficas1'},
        {titulo: 'Promesas' , url: '/promesas'},
    ]
  },

  {
    titulo: 'Manutenção',
    icono: 'mdi mdi-folder-lock-open',
    submenu: [
        {titulo: 'Usuários' , url: '/usuarios'},
        {titulo: 'Hospitais' , url: '/hospitais'},
        {titulo: 'Médicos' , url: '/medicos'},
        // {titulo: 'Médico' , url: '/medico/:id'},
    ]

  }

];


  constructor() { }

}

