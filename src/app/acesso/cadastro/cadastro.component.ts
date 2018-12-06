import { Autenticacao } from './../../autenticacao.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Usuario } from './../usuario.model';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {
  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>();

  public formulario: FormGroup = new FormGroup({
    'email': new FormControl(null, [
      Validators.required,
      Validators.email
    ]),
    'nome_completo': new FormControl(null, [
      Validators.required,
    ]),
    'nome_usuario': new FormControl(null, [
      Validators.required,
    ]),
    'senha': new FormControl(null, [
      Validators.required,
      Validators.minLength(6)
    ])
  });

  constructor( private autenticacao: Autenticacao) { }

  ngOnInit() {
  }

  public exibirPainelLogin(): void {
    this.exibirPainel.emit('login');
  }

  public cadastrarUsuario(): void {

    if (this.formulario.status === 'VALID') {
      const usuario: Usuario = new Usuario(
        this.formulario.value.email,
        this.formulario.value.nome_completo,
        this.formulario.value.nome_usuario,
        this.formulario.value.senha
      );

      this.autenticacao
        .cadastrarUsuario(usuario)
        .then(() => this.exibirPainelLogin());
    } else {
      this.formulario.get('email').markAsTouched();
      this.formulario.get('nome_completo').markAsTouched();
      this.formulario.get('nome_usuario').markAsTouched();
      this.formulario.get('senha').markAsTouched();
    }
  }
}
