import {Component} from '@angular/core';
import {TictactoeComponent} from './tictactoe/tictactoe.component';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    TictactoeComponent,
    NgClass
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  theme = 'light';

  toggleDarkMode() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
  }


}
