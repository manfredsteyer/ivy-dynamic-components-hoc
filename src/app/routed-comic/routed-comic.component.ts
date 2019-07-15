import { Component, OnInit, ViewChild, AfterContentInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-routed-comic',
  templateUrl: './routed-comic.component.html',
  styleUrls: ['./routed-comic.component.css']
})
export class RoutedComicComponent implements OnInit, AfterViewInit {


  constructor() { }

  @ViewChild('wrapped', { static: true })
  component: any;

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    console.debug('keys', this.component.constructor.ngComponentDef);
  }
}
