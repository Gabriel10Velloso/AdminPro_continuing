import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { HttpClientModule } from '@angular/common/http';

import { SidebarService, SharedService, SettingsService } from './service.index';
// Deu Pau no service.index.ts não reconhece a pasta por isso importei abaixo 
import { UsuarioService } from './usuario/usuario.service';
import { SubindoArquivoService } from './subindo-arquivo/subindo-arquivo.service';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';
import { HospitalService } from './hospital/hospital.service';
import { MedicoService } from './medico/medico.service';

// Admin guard
import { LoginGuardGuard } from './guards/login-guard.guard';
import { AdminGuard } from './guards/admin.guard';
import { VerificaTokenGuard } from './guards/verifica-token.guard';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [ SettingsService, SharedService, SidebarService, UsuarioService, LoginGuardGuard, AdminGuard,
              VerificaTokenGuard,  SubindoArquivoService , ModalUploadService, HospitalService, MedicoService]
})
export class ServiceModule { }
