import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { TetrisComponentComponent } from './game/tetris-component/tetris-component.component';


@NgModule({
  declarations: [
    AppComponent,
    TetrisComponentComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
