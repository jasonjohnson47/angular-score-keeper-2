import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Player } from '../common/models/player';
import { PlayerService } from '../common/services/player.service';

@Component({
  selector: 'app-game-setup',
  templateUrl: './game-setup.component.html',
  styleUrls: ['./game-setup.component.css']
})
export class GameSetupComponent implements OnInit {

  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
  }

  @ViewChild('form') myForm!: HTMLFormElement;

  roundToEdit = 1;

  players: Player[] = this.playerService.getPlayers();

  onBlur() {
    this.playerService.setPlayers(this.players);
  }

  focusFirstEmptyField() {
    setTimeout(() => {
      const formValues = [];
      for (const [key, value] of Object.entries(this.myForm['controls'])) {
        formValues.push({ id: key, name: (value as FormControl).value });
      }
      //console.log(formValues);
      const firstEmptyFieldId = formValues.findIndex((player) => player.name === '');
      const firstEmptyField = this.myForm['form'].get('name-' + firstEmptyFieldId).nativeElement;
      firstEmptyField.focus();
    });

    /*setTimeout(() => {
      const firstEmptyFieldId = this.players.findIndex((player) => player.name === '');
      console.log(this.myForm['form'].get('name-' + firstEmptyFieldId));
      const firstEmptyField = this.myForm['form'].get('name-' + firstEmptyFieldId).nativeElement;
      firstEmptyField.focus();
    }, 0);*/
  }

  addPlayer() {
    const playerIds = this.players.map((player) => player.id);
    const highestId = Math.max(...playerIds);
    this.players.push({ id: highestId + 1, name:'' });
    this.focusFirstEmptyField();
  }

  deletePlayer(id: number) {
    this.playerService.deletePlayer(id);
    this.players = this.playerService.getPlayers();
  };

  startGame() {
    console.log('Start Game', this.players);
  }
  continueGame() {
    console.log('Continue Game', this.players);
  }

}
