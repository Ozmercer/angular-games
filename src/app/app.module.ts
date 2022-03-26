import {BrowserModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig, HammerModule} from '@angular/platform-browser';
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
import { FireworksComponent } from './shared/components/fireworks/fireworks.component';
import {MatInputModule} from '@angular/material/input';
// import * as hammer from 'hammerjs';

// export class MyHammerConfig extends HammerGestureConfig {
//   overrides = {
//     swipe: { direction: hammer.DIRECTION_ALL },
//   };
// }

@NgModule({
  declarations: [
    AppComponent,
    TicTacToeComponent,
    GameOfLifeComponent,
    CellComponent,
    WelcomePageComponent,
    NavBarComponent,
    Twenty48Component,
    FireworksComponent,
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
        HammerModule,
        MatInputModule,
    ],
  // providers: [{
  //   provide: HAMMER_GESTURE_CONFIG,
  //   useClass: MyHammerConfig,
  // }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
