import { Component, Input, ViewChild } from '@angular/core';
import { Player } from '../common/models/player';
import { PlayerOperations } from '../common/models/player-operations';
import { PlayerService } from '../common/services/player.service';
import { ScoreService } from '../common/services/score.service';
import { RoundService } from '../common/services/round.service';
import { ScoreHistory, Round, PlayerPoints } from '../common/models/score';
import { NgForm } from '@angular/forms';
import { animateScores } from '../animations';
import { animateNumber } from '../animateNumber';

@Component({
  selector: 'app-current-round',
  templateUrl: './current-round.component.html',
  styleUrls: ['./current-round.component.css'],
  animations: [animateScores],
})
export class CurrentRoundComponent {
  constructor(
    private playerService: PlayerService,
    private scoreService: ScoreService,
    private roundService: RoundService
  ) {}

  @ViewChild('scoringForm') scoringForm!: NgForm;

  animateScoresStarted($event: any) {
    const playerScores = $event.element.querySelectorAll('.player-score');
    playerScores.forEach((scoreEl: HTMLElement) => {
      const playerId = Number(scoreEl.dataset['id']);
      const initialScore = this.scoreService.getAccumulativeScoreById(
        this.scoreHistory,
        playerId,
        this.roundToEdit - 2
      );
      const newScore = this.scoreService.getAccumulativeScoreById(
        this.scoreHistory,
        playerId,
        this.roundToEdit
      );
      const scoreIndex = Number(scoreEl.dataset['index']);

      setTimeout(() => {
        animateNumber(scoreEl, initialScore, newScore);
      }, scoreIndex * 250);
    });
  }

  players: Player[] = this.playerService.getPlayers();

  get roundToEdit(): number {
    return this.roundService.getRoundToEdit();
  }

  get scoreHistory(): ScoreHistory {
    return this.scoreService.getScoreHistory();
  }

  getAccumulativeScoreById = this.scoreService.getAccumulativeScoreById;

  playerPoints: PlayerPoints = this.players.reduce(
    (acc: PlayerPoints, currPlayer: Player) => {
      return { ...acc, [currPlayer.id]: '' };
    },
    {}
  );

  setDefaultPlayerOperations() {
    const defaultPlayerOperations: PlayerOperations = this.players.reduce(
      (acc: PlayerOperations, currPlayer: Player) => {
        const keyName = 'operation-' + currPlayer.id;
        return { ...acc, [keyName]: 'add' };
      },
      {}
    );
    return defaultPlayerOperations;
  }
  playerOperations = this.setDefaultPlayerOperations();

  calcPoints(operation: string, points: number) {
    let operationValue = operation === 'add' ? 1 : -1;
    return points * operationValue;
  }

  get thisRoundScores() {
    const roundScores: Round = this.players.map((player) => {
      return {
        id: player.id,
        points: this.calcPoints(
          this.playerOperations['operation-' + player.id],
          Number(this.playerPoints[player.id])
        ),
      };
    });
    return roundScores;
  }

  updatePlayerOperations(id: string, operation: string) {
    // unpressed = adding
    // pressed = subtracting
    this.playerOperations['operation-' + id] = operation;
    //console.log(this.playerOperations);
  }

  onSubmit() {
    this.roundService.setRoundToEdit(this.roundToEdit + 1);
    this.scoreService.addRoundToScoreHistory(
      this.scoreHistory,
      this.thisRoundScores
    );
    this.playerOperations = this.setDefaultPlayerOperations();
    this.scoringForm.reset();
  }
}
