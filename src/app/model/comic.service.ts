import { Injectable } from '@angular/core';
import { Comic, comics } from './comics';

@Injectable({
  providedIn: 'root'
})
export class ComicService {

  constructor() { }

  findComics(): Comic[] {
    return comics;
  }

  findComicById(id: string): Comic {
    return comics.find(c => c.id === id);
  }
}
