import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Progresso } from './../../progresso.service';
import * as firebase from 'firebase';
import { Bd } from './../../bd.service';

import { takeUntil } from 'rxjs/operators';
import { Observable, interval, observable, Subject, pipe } from 'rxjs';


@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.scss']
})

export class IncluirPublicacaoComponent implements OnInit {
  public email: string;
  private imagem: any;

  public progressoPublicacao = 'pendente';
  public porcentagemUpload: number;

  public formPublicacao: FormGroup = new FormGroup({
    'titulo': new FormControl(null, [
      Validators.required
    ])
  });

  constructor(private bd: Bd, private progresso: Progresso) { }

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

    const acompanhamentoUpload = interval(1500);

    const continua = new Subject();

    continua.next(true);

    acompanhamentoUpload
      .pipe(takeUntil(continua))
      .subscribe(() => {
        this.progressoPublicacao = 'andamento';

        this.porcentagemUpload = Math.round(
          (this.progresso.estado.bytesTransferred / this.progresso.estado.totalBytes) * 100
        );

        if (this.progresso.status === 'concluido') {
          this.progressoPublicacao = 'concluido';
          continua.next(false);
        }
      });

  }
  public preparaImagemUpload(event: Event): void {
    this.imagem = (<HTMLInputElement>event.target).files;
  }
  public setProgressoPublicacaoPendente(): void {
    this.progressoPublicacao = 'pendente';
  }
}
