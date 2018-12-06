import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Autenticacao } from './../../autenticacao.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public errorLogin: string;

  public formLogin: FormGroup = new FormGroup({
    'email': new FormControl(null, [
      Validators.required,
      Validators.email
    ]),
    'senha': new FormControl(null, [
      Validators.required,
      Validators.minLength(6)
    ])
  });

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>();

  constructor(private autenticacao: Autenticacao) { }

  ngOnInit() {
  }

  public autenticar() {
    this.autenticacao.autenticar(
      this.formLogin.value.email,
      this.formLogin.value.senha
    );
  }
  public exibirPainelCadastro(): void {
    this.exibirPainel.emit('cadastro');
  }

}
