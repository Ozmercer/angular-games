import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TicTacToeComponent} from './games/tic-tac-toe/tic-tac-toe.component';
import {GameOfLifeComponent} from './games/game-of-life/game-of-life.component';
import {WelcomePageComponent} from './games/welcome-page/welcome-page.component';
import {Twenty48Component} from './games/twenty-fourty-eight/twenty48.component';


const routes: Routes = [
  {path: 'tic-tac-toe', component: TicTacToeComponent},
  {path: 'game-of-life', component: GameOfLifeComponent},
  {path: '2048', component: Twenty48Component},
  {path: 'home', component: WelcomePageComponent},
  {path: '', pathMatch: 'full', redirectTo: 'home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
