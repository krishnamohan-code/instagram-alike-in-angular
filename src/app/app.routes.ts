import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AcessoComponent } from './acesso/acesso.component';
import { AuatenticacaoGuard } from './autenticacao-guard.service';

export const ROUTES: Routes = [
  {path: '', component: AcessoComponent},
  {path: 'home', component: HomeComponent, canActivate: [ AuatenticacaoGuard ] }
];
