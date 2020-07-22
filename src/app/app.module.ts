import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TicTacToeComponent} from './games/tic-tac-toe/tic-tac-toe.component';
import {GameOfLifeComponent} from './games/game-of-life/game-of-life.component';
import {FormsModule} from '@angular/forms';
import {CellComponent} from './games/game-of-life/cell/cell.component';
import { WelcomePageComponent } from './games/welcome-page/welcome-page.component';
import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import { Twenty48Component } from './games/twenty-fourty-eight/twenty48.component';

@NgModule({
  declarations: [
    AppComponent,
    TicTacToeComponent,
    GameOfLifeComponent,
    CellComponent,
    WelcomePageComponent,
    NavBarComponent,
    Twenty48Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatTooltipModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
