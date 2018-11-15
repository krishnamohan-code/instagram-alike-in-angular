import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-acesso',
  templateUrl: './acesso.component.html',
  styleUrls: ['./acesso.component.scss'],
  animations: [
    trigger('animacao-banner', [
      state('criado', style({
        opacity: 1
      })),
      transition('void => criado', [
        style({ opacity: 0, transform: 'translate(0, -100px)'}),
        animate( '800ms 0s ease-in-out')
      ])
    ])
  ]
})
export class AcessoComponent implements OnInit {
  public estadoBanner = 'criado';

  constructor() { }

  ngOnInit() {
  }

}
