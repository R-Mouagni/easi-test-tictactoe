import {Component, inject} from '@angular/core';
import {GameSettings} from '../model/game-settings';
import {GameService} from './game.service';
import {GameSettingsComponent} from './game-settings/game-settings.component';
import {BoardComponent} from './board/board.component';

@Component({
  selector: 'app-tictactoe',
  imports: [
    GameSettingsComponent,
    BoardComponent,
  ],
  templateUrl: './tictactoe.component.html',
  styleUrl: './tictactoe.component.css'
})
export class TictactoeComponent {
  protected gameService: GameService = inject(GameService);

  isGameStarted: boolean = false;

  startGame(settings: GameSettings): void {
    this.gameService.init(settings);
    this.isGameStarted = true;
  }

  backToMenu(): void {
    this.isGameStarted = false;
  }

  onCellClicked(cell: { row: number; col: number }) {
    if (this.gameService.board[cell.row][cell.col] === '' && !this.gameService.gameOver) {
      this.gameService.checkedCell(cell.row, cell.col);
    }
  }
}
