import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Autenticacao } from './../../autenticacao.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public formLogin: FormGroup = new FormGroup({
    'email': new FormControl(null),
    'senha': new FormControl(null)
  });

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>();

  constructor(private autentucacao: Autenticacao) { }

  ngOnInit() {
  }

  public autenticar() {
    this.autentucacao.autenticar(
      this.formLogin.value.email,
      this.formLogin.value.senha
    );
  }
  public exibirPainelCadastro(): void {
    this.exibirPainel.emit('cadastro');
  }

}
