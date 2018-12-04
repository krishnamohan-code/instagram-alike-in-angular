import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AcessoComponent } from './acesso/acesso.component';

export const ROUTES: Routes = [
  {path: '', component: AcessoComponent},
  {path: 'home', component: HomeComponent}
];
