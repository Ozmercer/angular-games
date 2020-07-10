import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TicTacToeComponent} from './games/tic-tac-toe/tic-tac-toe.component';
import {GameOfLifeComponent} from './games/game-of-life/game-of-life.component';
import {WelcomePageComponent} from './games/welcome-page/welcome-page.component';


const routes: Routes = [
  {path: 'tic-tac-toe', component: TicTacToeComponent},
  {path: 'tic-tac-toe-of-life', component: GameOfLifeComponent},
  {path: 'home', component: WelcomePageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
