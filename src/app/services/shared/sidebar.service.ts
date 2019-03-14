import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';
import { SharedService } from './shared.service';

@Injectable()
export class SidebarService {
    menu: any[] = [];

//   menu: any = [
//     {
//     titulo: 'Principal',
//     icono: 'mdi mdi-gauge',
//     submenu: [
//         {titulo: 'Dashboard' , url: '/dashboard'},
//         {titulo: 'Progress' , url: '/progress'},
//         {titulo: 'Gráficos' , url: '/graficas1'},
//         {titulo: 'Promesas' , url: '/promesas'},
//     ]
//   },

//   {
//     titulo: 'Manutenção',
//     icono: 'mdi mdi-folder-lock-open',
//     submenu: [
//         {titulo: 'Usuários' , url: '/usuarios'},
//         {titulo: 'Hospitais' , url: '/hospitais'},
//         {titulo: 'Médicos' , url: '/medicos'},
//         // {titulo: 'Médico' , url: '/medico/:id'},
//     ]

//   }

// ];


  constructor( public _usuarioService: UsuarioService) {
  
  }
  cargarMenu() {
    this.menu = this._usuarioService.menu;
  }
}

