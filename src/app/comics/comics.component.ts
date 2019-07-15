import { Component, OnInit, Injector } from '@angular/core';
import { Comic, comics } from '../model/comics';
import { ComicService } from '../model/comic.service';

@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.css']
})
export class ComicsComponent implements OnInit {

  comics: Comic[];

  constructor(
    private injector: Injector,
    private comicService: ComicService) {
    this.comics = comicService.findComics();
  }

  ngOnInit() {
  }

}
