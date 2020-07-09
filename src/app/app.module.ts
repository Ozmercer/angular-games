import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TicTacToeComponent} from './game/tic-tac-toe.component';
import {GameOfLifeComponent} from './game-of-life/game-of-life.component';
import {FormsModule} from '@angular/forms';
import {CellComponent} from './game-of-life/cell/cell.component';

@NgModule({
  declarations: [
    AppComponent,
    TicTacToeComponent,
    GameOfLifeComponent,
    CellComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
