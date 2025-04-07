import {Injectable} from '@angular/core';
import {GameSettings} from '../model/game-settings';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  saveGameSettings(settings: GameSettings): void {
    localStorage.setItem('gameSettings', JSON.stringify(settings));
  }

  getGameSettings(): GameSettings {
    const settings = localStorage.getItem('gameSettings');
    return settings ? JSON.parse(settings) : null;
  }

}
