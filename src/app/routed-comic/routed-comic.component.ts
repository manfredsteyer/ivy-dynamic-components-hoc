import { Component, OnInit, ViewChild, AfterContentInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-routed-comic',
  templateUrl: './routed-comic.component.html',
  styleUrls: ['./routed-comic.component.css']
})
export class RoutedComicComponent implements OnInit
// , AfterViewInit 
{

  constructor(private route: ActivatedRoute) { }

  // @ViewChild('wrapped', { static: true })
  // component: any;
  params: any = {};

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.params = params;
    });
  }

  // ngAfterViewInit(): void {
  //   console.debug('keys', this.component.constructor.ngComponentDef);
  // }
}
