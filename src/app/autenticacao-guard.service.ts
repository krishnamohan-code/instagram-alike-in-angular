import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Autenticacao } from './autenticacao.service';

@Injectable()
export class AuatenticacaoGuard implements CanActivate {
  constructor(private autenticacao: Autenticacao) {}

  canActivate(): boolean {
    return this.autenticacao.autenticado();
  }
}
