import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Player } from '../common/models/player';
import { ScoreHistory } from '../common/models/score';
import { PlayerService } from '../common/services/player.service';
import { ScoreService } from '../common/services/score.service';
import { RoundService } from '../common/services/round.service';

@Component({
  selector: 'app-game-setup',
  templateUrl: './game-setup.component.html',
  styleUrls: ['./game-setup.component.css']
})
export class GameSetupComponent implements OnInit {

  constructor(
    private playerService: PlayerService,
    private scoreService: ScoreService,
    private roundService: RoundService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  @ViewChild('playerForm') playerForm!: HTMLFormElement;

  roundToEdit = this.roundService.getRoundToEdit();

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

  get scoreHistory(): ScoreHistory {
    return this.scoreService.getScoreHistory();
  }

  addPlayer() {
    const playerIds = this.players.map((player) => player.id);
    const highestId = Math.max(...playerIds);
    const newPlayerId = highestId + 1;
    this.players.push({ id: newPlayerId, name:'' });
    this.scoreService.addPlayerToScoreHistory(this.scoreHistory, newPlayerId);
    this.focusFirstEmptyField();
  }

  deletePlayer(id: number) {
    this.playerService.deletePlayer(id);
    this.players = this.playerService.getPlayers();
  };

  startNewGame() {
    this.roundService.resetRoundToEdit();
    this.scoreService.resetScoreHistory();
    this.router.navigate(['/current-round']);
  }
  continueGame() {
    this.router.navigate(['/current-round']);
  }

}
