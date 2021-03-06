import { Bd } from './bd.service';
import { Autenticacao } from './autenticacao.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ROUTES } from './app.routes';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccessComponent } from './access/access.component';
import { BannerComponent } from './access/banner/banner.component';
import { LoginComponent } from './access/login/login.component';
import { SignupComponent } from './access/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { PublicacoesComponent } from './home/publicacoes/publicacoes.component';
import { AuatenticacaoGuard } from './autenticacao-guard.service';
import { IncluirPublicacaoComponent } from './home/incluir-publicacao/incluir-publicacao.component';
import { Progresso } from './progresso.service';

@NgModule({
  declarations: [
    AppComponent,
    AccessComponent,
    BannerComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    PublicacoesComponent,
    IncluirPublicacaoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [ Autenticacao, AuatenticacaoGuard, Bd, Progresso ],
  bootstrap: [AppComponent]
})
export class AppModule { }
