import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TicTacToeComponent} from './game/tic-tac-toe.component';
import {GameOfLifeComponent} from './game-of-life/game-of-life.component';


const routes: Routes = [
  {path: 'tic-tac-toe', component: TicTacToeComponent},
  {path: 'game-of-life', component: GameOfLifeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
