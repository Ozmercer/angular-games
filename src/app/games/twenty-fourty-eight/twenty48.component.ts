import {Component, OnInit} from '@angular/core';

interface Cell {
  row: number;
  col: number;
  value: number;
}

@Component({
  selector: 'app-twenty-fourty-eight',
  templateUrl: './twenty48.component.html',
  styleUrls: ['./twenty48.component.scss']
})


export class Twenty48Component implements OnInit {
  table: Cell[] = [];

  constructor() {}

  ngOnInit(): void {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        this.table.push({row: i, col: j, value: null});
      }
    }
  }

}
