/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ComicService } from './comic.service';

describe('Service: Comic', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComicService]
    });
  });

  it('should ...', inject([ComicService], (service: ComicService) => {
    expect(service).toBeTruthy();
  }));
});
