import { Component, ɵrenderComponent, Injector, OnInit } from '@angular/core';
import { ComicComponent } from './comic/comic.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'hoc';

  constructor() {
  }

}
