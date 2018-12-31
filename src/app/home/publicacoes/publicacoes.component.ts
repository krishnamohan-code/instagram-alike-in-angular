import { Bd } from './../../bd.service';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-publicacoes',
  templateUrl: './publicacoes.component.html',
  styleUrls: ['./publicacoes.component.scss']
})
export class PublicacoesComponent implements OnInit {
  public email: string;
  public posts: any;

  constructor(private bd: Bd) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email;

      this.updateTimeLine();
    });


  }

  public updateTimeLine(): void {
    this.bd.consultaPublicacoes(this.email)
      .then((posts: any) => {
        this.posts = posts;
      });
  }
}
