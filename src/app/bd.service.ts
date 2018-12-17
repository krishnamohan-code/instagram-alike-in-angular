import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Progresso } from './progresso.service';

@Injectable()
export class Bd {

  constructor(private progresso: Progresso) {

  }

  public publicar(publicacao: any): void {

    firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
    .push( { titulo: publicacao.titulo})
    .then((resposta: any) => {
      const nomeImagem = resposta.key;

      firebase.storage().ref()
        .child( `imagens/${nomeImagem}`)
        .put(publicacao.imagem)
        .on(firebase.storage.TaskEvent.STATE_CHANGED,
          (snapshot: any) => {
            this.progresso.status = 'andamento';
            this.progresso.estado = snapshot;
            console.log('Snapshot: ' + snapshot);
          },
          (error) => {
            this.progresso.status = 'erro';
          },
          () => {
            this.progresso.status = 'concluido';
          });

    });
    }

}
