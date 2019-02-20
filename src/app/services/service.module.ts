import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { HttpClientModule } from '@angular/common/http';

import { SidebarService, SharedService, SettingsService } from './service.index';
import { UsuarioService } from './usuario/usuario.service';
import { LoginGuardGuard } from './guards/login-guard.guard';
import { SubindoArquivoService } from './subindo-arquivo/subindo-arquivo.service';
// Deu Pau no service.index.ts não reconhece a pasta por isso importei abaixo 

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [ SettingsService, SharedService, SidebarService, UsuarioService, LoginGuardGuard,
               SubindoArquivoService]
})
export class ServiceModule { }
