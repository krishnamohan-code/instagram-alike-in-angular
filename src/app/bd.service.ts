import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Progresso } from './progresso.service';
import { DeprecatedDatePipe } from '@angular/common';
import { DriverProvider } from 'protractor/built/driverProviders';

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

    public consultaPublicacoes(emailUsuario: string): any {
      firebase.database().ref(`publicacoes/${btoa(emailUsuario)}`)
        .once('value')
        .then((snapshot: any) => {
          // console.log(snapshot.val());

          let publicacoes: Array<any> = [];

          snapshot.forEach((childSnapshot: any) => {

            let publicacao = childSnapshot.val();
            //consultar a url da imagem
            firebase.storage().ref()
              .child(`imagens/${childSnapshot.key}`)
              .getDownloadURL()
              .then((url: string) => {
                publicacao.url_imagem = url;

                // Consultar o nome do usuario responsavel pela publicacao
                firebase.database().ref(`usuario_detalhe/${btoa(emailUsuario)}`)
                  .once('value')
                  .then((snapshot: any) => {
                    console.log(snapshot.val());
                  });

                console.log(btoa(emailUsuario));
                publicacoes.push(publicacao);


              });
          });

          console.log(publicacoes);
        });
    }
}
