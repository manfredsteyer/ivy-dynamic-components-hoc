import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComicComponent } from './comic/comic.component';
import { ComicsComponent } from './comics/comics.component';
import { RoutedComicComponent } from './routed-comic/routed-comic.component';

@NgModule({
   declarations: [
      AppComponent,
      ComicComponent,
      ComicsComponent,
      RoutedComicComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
