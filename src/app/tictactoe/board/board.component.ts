import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CellComponent} from '../cell/cell.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  imports: [
    CellComponent
  ],
  styleUrls: ['./board.component.css']
})
export class BoardComponent  {

  @Input({required:true})
  board: string[][] = [];

  @Output()
  cellClicked: EventEmitter<{ row: number, col: number }> = new EventEmitter();

  onCellClick(row: number, col: number): void {
    this.cellClicked.emit({ row, col });
  }
}
