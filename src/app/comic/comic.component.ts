import { Component, OnInit, Input } from '@angular/core';
import { ComicService } from '../model/comic.service';
import { Comic } from '../model/comics';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comic',
  templateUrl: './comic.component.html',
  styleUrls: ['./comic.component.css']
})
export class ComicComponent implements OnInit {

    _comicId: string;
  comic: Comic;

  @Input() set comicId(value: string) {
    this._comicId = value;
    this.comic = this.comicService.findComicById(value);
  }

  get comicId() {
    return this._comicId;
  }

  constructor(
    private comicService: ComicService,
    private route: ActivatedRoute) {

      this.route.params.subscribe(p => {
        this.comicId = p.comicId;
      });

  }

  ngOnInit() {
  }

}
