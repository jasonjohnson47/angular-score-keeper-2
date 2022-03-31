import { Component, OnInit } from '@angular/core';
import { Player } from '../common/models/player';
import { Score, Round, ScoreHistory } from '../common/models/score';
import { PlayerService } from '../common/services/player.service';
import { ScoreService } from '../common/services/score.service';

@Component({
  selector: 'app-game-history',
  templateUrl: './game-history.component.html',
  styleUrls: ['./game-history.component.css']
})
export class GameHistoryComponent implements OnInit {

  constructor(
    private playerService: PlayerService,
    private scoreService: ScoreService,
  ) { }

  ngOnInit(): void {
  }

  players: Player[] = this.playerService.getPlayers();
  scoreHistory: ScoreHistory = this.scoreService.getScoreHistory();
  getAccumulativeScoreById = this.scoreService.getAccumulativeScoreById;

  getPlayerPointValue(playerId: number, round: Round) {
    const playerPoints = round.find((score: Score) => score.id === playerId);
    return playerPoints?.points || 0;
  }

}
