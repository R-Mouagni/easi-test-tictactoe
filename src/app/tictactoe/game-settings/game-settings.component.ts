import {Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import {GameSettings} from '../../model/game-settings';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgClass} from '@angular/common';
import {fieldsMustDifferValidator, maxUserCharsValidator} from '../../utils/validators';
import {LocalStorageService} from '../../services/local-storage.service';

@Component({
  selector: 'app-game-settings',
  imports: [
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './game-settings.component.html',
  styleUrl: './game-settings.component.css'
})
export class GameSettingsComponent implements OnInit {
  private fb: FormBuilder = inject(FormBuilder);
  private localStorageService: LocalStorageService = inject(LocalStorageService);


  gameSettingsForm: FormGroup = this.fb.group({
    gridSize: [3, [Validators.required, Validators.pattern('[0-9]*'), Validators.max(6), Validators.min(3)]],
    symbol1: ['X', [Validators.required, maxUserCharsValidator(1), Validators.minLength(1)]],
    symbol2: ['O', [Validators.required, maxUserCharsValidator(1), Validators.minLength(1)]],
    mode: ['2p'],
  }, { validators: fieldsMustDifferValidator('symbol1', 'symbol2') });

  settings: GameSettings | null = null;

  @Output()
  start = new EventEmitter<GameSettings>();


  ngOnInit(): void {
    const settings = this.localStorageService.getGameSettings();
    if (settings) {
      this.gameSettingsForm.patchValue({
        gridSize: settings.gridSize,
        mode: settings.mode,
        symbol1: settings.symbol1,
        symbol2: settings.symbol2,
      });
    }
  }

  onStart() {
    this.settings = {
      gridSize: this.gameSettingsForm.get('gridSize')?.value,
      mode: this.gameSettingsForm.get('mode')?.value,
      symbol1: this.gameSettingsForm.get('symbol1')?.value,
      symbol2: this.gameSettingsForm.get('symbol2')?.value,
    };
    this.localStorageService.saveGameSettings(this.settings);
    this.start.emit(this.settings);
  }


  errorMessage(controlName: string): string {
    const control = this.gameSettingsForm.get(controlName);
    if (control?.hasError('required')) {
      return 'La champ est requis';
    }
    if (control?.hasError('pattern')) {
      return 'La taille de la grille doit être un nombre';
    }
    if (control?.hasError('max')) {
      return 'La taille de la grille doit être au maximum 6';
    }
    if (control?.hasError('min')) {
      return 'La taille de la grille doit être au moins 3';
    }
    if (control?.hasError('maxlength')) {
      return 'Le symbole doit faire 1 caractère';
    }
    if (control?.hasError('maxUserChars')) {
      return 'Le symbole doit être un caractère unique';
    }
    if (control?.hasError('fieldsMustDiffer')) {
      return 'Les deux symboles doivent être différents';
    }
    return '';
  }
}
