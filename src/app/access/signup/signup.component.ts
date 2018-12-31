import { Autenticacao } from '../../autenticacao.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Usuario } from '../usuario.model';
import { formIncorreto } from 'src/app/animations';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  animations: [
    formIncorreto
  ]
})
export class SignupComponent implements OnInit {
  public estadoFormulario = 'normal';

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

  public registerUser(): void {

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
        this.estadoFormulario = 'invalido';
        setTimeout(() => {
          this.estadoFormulario = 'normal';
        }, 700);
        this.formulario.get('email').markAsTouched();
        this.formulario.get('nome_completo').markAsTouched();
        this.formulario.get('nome_usuario').markAsTouched();
        this.formulario.get('senha').markAsTouched();

      }
  }
}
