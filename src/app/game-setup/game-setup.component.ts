import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Player } from '../common/models/player';
import { PlayerService } from '../common/services/player.service';

@Component({
  selector: 'app-game-setup',
  templateUrl: './game-setup.component.html',
  styleUrls: ['./game-setup.component.css']
})
export class GameSetupComponent implements OnInit {

  constructor(
    private playerService: PlayerService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  @ViewChild('playerForm') playerForm!: HTMLFormElement;

  roundToEdit = 1;

  players: Player[] = this.playerService.getPlayers();

  onBlur() {
    this.playerService.setPlayers(this.players);
  }

  focusFirstEmptyField() {
    setTimeout(() => {
      const firstEmptyNamePlayer = this.players.find((player) => player.name == '');
      const firstEmptyFieldId = firstEmptyNamePlayer?.id;

      if (firstEmptyFieldId != null) {
        const firstEmptyField = this.playerForm['form'].get('name-' + firstEmptyFieldId).nativeElement;
        firstEmptyField.focus();
      }

    }, 0);
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

  onSubmit() {
    this.startGame();
    //this.continueGame();
  }

  startGame() {
    console.log('Start Game', this.players);
    this.router.navigate(['/current-round']);

  }
  continueGame() {
    console.log('Continue Game', this.players);
  }

}
