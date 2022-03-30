import { Component, OnInit, ViewChild } from '@angular/core';
import { Player } from '../common/models/player';
import { PlayerOperations } from '../common/models/player-operations';
import { PlayerService } from '../common/services/player.service';
import { ScoreService } from '../common/services/score.service';
import { RoundService } from '../common/services/round.service';
import { ScoreHistory, Round } from '../common/models/score';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-current-round',
  templateUrl: './current-round.component.html',
  styleUrls: ['./current-round.component.css'],
})
export class CurrentRoundComponent implements OnInit {
  constructor(
    private playerService: PlayerService,
    private scoreService: ScoreService,
    private roundService: RoundService
  ) {}

  ngOnInit(): void {}

  @ViewChild('scoringForm') scoringForm!: NgForm;

  players: Player[] = this.playerService.getPlayers();

  get roundToEdit(): number {
    return this.roundService.getRoundToEdit();
  }

  get scoreHistory(): ScoreHistory {
    return this.scoreService.getScoreHistory();
  }

  getAccumulativeScoreById = this.scoreService.getAccumulativeScoreById;

  playerPoints: { [key: number]: string } = this.players.reduce(
    (acc: { [key: number]: string }, currPlayer: Player) => {
      return { ...acc, [currPlayer.id]: '' };
    },
    {}
  );

  defaultPlayerOperations: PlayerOperations = this.players.reduce(
    (acc: PlayerOperations, currPlayer: Player) => {
      const keyName = 'operation-' + currPlayer.id; 
      return { ...acc, [keyName]: 'add' };
    },
    {}
  );
  playerOperations = {...this.defaultPlayerOperations};

  get thisRoundScores() {
    const roundScores: Round = this.players.map((player) => {
      function calcPoints(operation: string, points: number) {
        let operationValue = operation === 'add' ? 1 : -1;
        return points * operationValue;
      }
      return {
        id: player.id,
        points: calcPoints(
          this.playerOperations['operation-' + player.id],
          Number(this.playerPoints[player.id])
        )
      };
    });
    return roundScores;
  }

  onAddSubPressed(id: number) {
    // unpressed = adding
    // pressed = subtracting
    this.playerOperations['operation-' + id] =
    this.playerOperations['operation-' + id] === 'subtract' ? 'add' : 'subtract';
  }

  onBlur() {}

  onSubmit() {
    this.roundService.setRoundToEdit(this.roundToEdit + 1);
    this.scoreService.addRoundToScoreHistory(this.scoreHistory, this.thisRoundScores);
    this.scoringForm.reset(this.defaultPlayerOperations);
  }
}
