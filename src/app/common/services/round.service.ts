import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoundService {

  constructor() { }

  initialRoundToEdit = 1;

  getRoundToEdit() {
    return JSON.parse(
      localStorage.getItem('score-keeper-roundToEdit') ||
        JSON.stringify(this.initialRoundToEdit, null, 2)
    );
  }

  setRoundToEdit(roundNumber: number) {
    localStorage.setItem(
      'score-keeper-roundToEdit',
      JSON.stringify(roundNumber, null, 2)
    );
  }

  resetRoundToEdit() {
    this.setRoundToEdit(this.initialRoundToEdit);
  }

}
