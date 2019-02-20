import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginGuardGuard } from '../services/guards/login-guard.guard';



const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [ LoginGuardGuard ],
        children: [
            { path: 'dashboard', component: DashboardComponent , data: { title: 'Dashboard' } },
            { path: 'progress', component: ProgressComponent , data: { title: 'Progress Bars' } },
            { path: 'graficas1', component: Graficas1Component , data: { title: 'Gráficas' } },
            { path: 'promesas', component: PromesasComponent , data: { title: 'Promessas' } },
            { path: 'account-settings', component: AccountSettingsComponent , data: { title: 'Ajustes Temas' } },
            { path: 'profile', component: ProfileComponent ,   data: {title: 'Perfil do usuário'} },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
        ]
    }
];


export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
