import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.scss'],
  animations: [

    trigger('animacao-banner', [

      state('criado', style({
        opacity: 1
      })),

      transition('void => criado', [
        style({ opacity: 0, transform: 'translate(-50px, 0px)'}),
        animate( '800ms 0s ease-in-out')
      ])

    ]),

    trigger('animacao-painel', [

      state('criado', style({
        opacity: 1
      })),

      transition('void => criado', [
        style({ opacity: 0, transform: 'translate(50px, 0px)'}),
        animate( '1.5s 0s ease-in-out')
      ])
    ])

  ]
})

export class AccessComponent implements OnInit {
  public estadoBanner = 'criado';
  public estadoPainel = 'criado';

  public cadastro = false;

  constructor() { }

  ngOnInit() {
  }

  public exibirPainel(event: string): void {
    this.cadastro = event === 'cadastro';
    console.log(event);
  }

}
