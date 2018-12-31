import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Progresso } from './progresso.service';
import { DeprecatedDatePipe } from '@angular/common';
import { DriverProvider } from 'protractor/built/driverProviders';

@Injectable()
export class Bd {

  constructor(private progresso: Progresso) {

  }

  public publish(publicacao: any): void {

    firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
    .push( { titulo: publicacao.titulo})
    .then((resposta: any) => {
      const nomeImagem = resposta.key;

      firebase.storage().ref()
        .child( `imagens/${nomeImagem}`)
        .put(publicacao.imagem)
        .on(firebase.storage.TaskEvent.STATE_CHANGED,
          (snapshot: any) => {
            this.progresso.status = 'going';
            this.progresso.state = snapshot;
          },
          (error) => {
            this.progresso.status = 'erro';
          },
          () => {
            this.progresso.status = 'completed';
          });

    });
  }

  public consultaPublicacoes(emailUsuario: string): Promise<any> {

    return new Promise((resolve, reject) => {
      firebase.database().ref(`publicacoes/${btoa(emailUsuario)}`)
        .orderByKey()
        .once('value')
        .then((snapshot: any) => {

          const publicacoes: Array<any> = [];

          snapshot.forEach((childSnapshot: any) => {
            const publicacao = childSnapshot.val();
            publicacao.key = childSnapshot.key;

            publicacoes.push(publicacao);
          });
            return publicacoes.reverse();
        })
        .then((publicacoes: any) => {

          publicacoes.forEach(publicacao => {
          firebase.storage().ref()
            .child(`imagens/${publicacao.key}`)
            .getDownloadURL()
            .then((url: string) => {
              publicacao.url_imagem = url;

              // Consultar o nome do usuario responsavel pela publicacao
              firebase.database().ref(`usuario_detalhe/${btoa(emailUsuario)}`)
                .once('value')
                .then((snapshotName: any) => {
                  publicacao.nome_usuario = snapshotName.val().nome_usuario;
                });
            });
          });
          resolve(publicacoes);
        });
    });
  }
}


