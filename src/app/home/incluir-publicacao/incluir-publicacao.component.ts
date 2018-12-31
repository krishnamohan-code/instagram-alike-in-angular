import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
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

  @Output() public updateTimeLine: EventEmitter<any> = new  EventEmitter<any>();

  public email: string;
  private picture: any;

  public progressPostPublish = 'pending';
  public uploadPercentage: number;

  public formPublish: FormGroup = new FormGroup({
    'titulo': new FormControl(null, [
      Validators.required
    ])
  });

  constructor(private bd: Bd, private progress: Progresso) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email;
    });
  }

  public publish(): void {
    this.bd.publish({
      email: this.email,
      titulo: this.formPublish.value.titulo,
      imagem: this.picture[0]
    });

    const uploadCheck = interval(1500);

    const continua = new Subject();

    continua.next(true);

    uploadCheck
      .pipe(takeUntil(continua))
      .subscribe(() => {
        console.log('em andamento');
        this.progressPostPublish = 'going';

        this.uploadPercentage = Math.round(
          (this.progress.state.bytesTransferred / this.progress.state.totalBytes) * 100
        );

        if (this.progress.status === 'completed') {
          this.progressPostPublish = 'completed';
          this.updateTimeLine.emit();
          continua.next(false);
        }
      });

  }
  public prepareImageUpload(event: Event): void {
    this.picture = (<HTMLInputElement>event.target).files;
  }
  public setPublishProgressPending(): void {
    this.progressPostPublish = 'pending';
  }
}
