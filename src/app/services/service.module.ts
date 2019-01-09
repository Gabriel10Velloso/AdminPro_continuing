import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { HttpClientModule } from '@angular/common/http';

import { SidebarService, SharedService, SettingsService } from './service.index';
// Deu Pau no service.index.ts não reconhece a pasta por isso importei abaixo 
import { UsuarioService } from './usuario/usuario.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [ SettingsService, SharedService, SidebarService, UsuarioService]
})
export class ServiceModule { }
