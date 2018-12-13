import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as firebase from 'firebase';

import { Bd } from './../../bd.service';

@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.scss']
})

export class IncluirPublicacaoComponent implements OnInit {
  public email: string;
  private imagem: any;

  public formPublicacao: FormGroup = new FormGroup({
    'titulo': new FormControl(null, [
      Validators.required
    ])
  });

  constructor(private bd: Bd) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email;
    });
  }

  public publicar(): void {
    this.bd.publicar({
      email: this.email,
      titulo: this.formPublicacao.value.titulo,
      imagem: this.imagem[0]
    });
  }
  public preparaImagemUpload(event: Event): void {
    this.imagem = (<HTMLInputElement>event.target).files;
  }
}
