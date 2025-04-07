import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-cell',
  imports: [
    NgClass
  ],
  templateUrl: './cell.component.html',
  styleUrl: './cell.component.css'
})
export class CellComponent {


  @Input()
  value: string = '';

  @Output()
  cellClicked: EventEmitter<void> = new EventEmitter();

  animated: boolean = false;
  ngOnChanges(): void {
    if (this.value) {
      this.animated = true;
      setTimeout(() => {
        this.animated = false;
      }, 300); // doit correspondre à la durée de l'animation CSS
    }
  }


  onCellClick(): void {
    this.cellClicked.emit();
  }
}
