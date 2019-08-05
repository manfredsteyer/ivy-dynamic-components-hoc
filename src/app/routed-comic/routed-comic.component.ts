import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-routed-comic',
  templateUrl: './routed-comic.component.html',
  styleUrls: ['./routed-comic.component.css']
})
export class RoutedComicComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  params: any = {};

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.params = params;
    });
  }

}
