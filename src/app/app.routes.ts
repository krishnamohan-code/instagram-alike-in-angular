import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AccessComponent } from './access/access.component';
import { AuatenticacaoGuard } from './autenticacao-guard.service';

export const ROUTES: Routes = [
  {path: '', component: AccessComponent},
  {path: 'home', component: HomeComponent, canActivate: [ AuatenticacaoGuard ] }
];
