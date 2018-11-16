import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { config } from './fireBaseConfig';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'instagram-clone';

  public ngOnInit(): void {
    firebase.initializeApp(config);
  }
}
