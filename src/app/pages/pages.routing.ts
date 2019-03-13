import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginGuardGuard } from '../services/guards/login-guard.guard';
  // Manutenção Usuário Medico e hospital
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitaisComponent } from './hospitais/hospitais.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';



const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [ LoginGuardGuard ],
        children: [
            { path: 'dashboard', component: DashboardComponent , data: { titulo: 'Dashboard' } },
            { path: 'progress', component: ProgressComponent , data: { titulo: 'Progress Bars' } },
            { path: 'graficas1', component: Graficas1Component , data: { titulo: 'Gráficos' } },
            { path: 'promesas', component: PromesasComponent , data: { titulo: 'Promessas' } },
            { path: 'account-settings', component: AccountSettingsComponent , data: { titulo: 'Ajustes Temas' } },
            { path: 'profile', component: ProfileComponent ,   data: {titulo: 'Perfil do usuário'} },
            // Manutenção Usuário Medico e hospital
            { path: 'usuarios', component: UsuariosComponent ,   data: {titulo: 'Manutenção usuário'} },
            { path: 'medicos', component: MedicosComponent ,   data: {titulo: 'Manutenção médicos'} },
            { path: 'medico/:id', component: MedicoComponent ,   data: {titulo: 'Atualizar médicos'} },
            { path: 'hospitais', component: HospitaisComponent ,   data: {titulo: 'Manutenção hospitais'} },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
        ]
    }
];


export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
