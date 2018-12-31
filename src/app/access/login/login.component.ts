import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Autenticacao } from './../../autenticacao.service';
import { formIncorreto } from 'src/app/animations';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    formIncorreto
  ]
})
export class LoginComponent implements OnInit {
  public estadoFormulario = 'normal';
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
    if (this.formLogin.status === 'VALID') {
      this.autenticacao.autenticar(
        this.formLogin.value.email,
        this.formLogin.value.senha
      );
    } else {
      this.estadoFormulario = 'invalido';
      setTimeout(() => {
        this.estadoFormulario = 'normal';
      }, 700);
      this.formLogin.get('email').markAsTouched();
      this.formLogin.get('senha').markAsTouched();
    }
  }
  public exibirPainelCadastro(): void {
    this.exibirPainel.emit('cadastro');
  }

}
