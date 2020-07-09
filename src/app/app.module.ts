import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TicTacToeComponent} from './games/game/tic-tac-toe.component';
import {GameOfLifeComponent} from './games/game-of-life/game-of-life.component';
import {FormsModule} from '@angular/forms';
import {CellComponent} from './games/game-of-life/cell/cell.component';
import { WelcomePageComponent } from './games/welcome-page/welcome-page.component';
import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    TicTacToeComponent,
    GameOfLifeComponent,
    CellComponent,
    WelcomePageComponent,
    NavBarComponent,
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
