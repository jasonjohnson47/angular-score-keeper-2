import { Injectable } from '@angular/core';
import { PlayerService } from './player.service';
import { Player } from '../models/player';
import { Round, ScoreHistory } from '../models/score';

@Injectable({
  providedIn: 'root',
})
export class ScoreService {
  constructor(private playerService: PlayerService) {}

  players: Player[] = this.playerService.getPlayers();
  initialRoundPoints: Round = this.setInitialRoundPoints();
  initialScoreHistory: ScoreHistory = [this.initialRoundPoints];

  setInitialRoundPoints() {
    return this.players.map((player) => {
      return { id: player.id, points: 0 };
    });
  }

  getScoreHistory(): ScoreHistory {
    return JSON.parse(
      localStorage.getItem('score-keeper-scores') ||
        JSON.stringify(this.initialScoreHistory, null, 2)
    );
  }

  setScoreHistory(score: ScoreHistory) {
    localStorage.setItem(
      'score-keeper-scores',
      JSON.stringify(score, null, 2)
    );
  }

  resetScoreHistory() {
    this.players = this.playerService.getPlayers();
    this.initialRoundPoints = this.setInitialRoundPoints();
    this.initialScoreHistory = [this.initialRoundPoints];
    this.setScoreHistory(this.initialScoreHistory);
  }

  addPlayerToScoreHistory(
    scoreHistory: ScoreHistory,
    newPlayerId: number
  ) {
      const newScoreHistory = scoreHistory.map((scoreRound) => {
        return [...scoreRound, {
          id: newPlayerId,
          points: 0
        }];
      });

      localStorage.setItem(
        'score-keeper-scores',
        JSON.stringify(newScoreHistory, null, 2)
      );
    }

  removePlayerFromScoreHistory(
    scoreHistory: ScoreHistory,
    playerId: number
  ) {
    const newScoreHistory = scoreHistory.map((scoreRound) => {
      return scoreRound.filter((score) => score.id !== playerId);
    });
    localStorage.setItem(
      'score-keeper-scores',
      JSON.stringify(newScoreHistory, null, 2)
    );
    return newScoreHistory;
  }

  addRoundToScoreHistory(
    scoreHistory: ScoreHistory,
    newRound: Round
  ) {
    const newScoreHistory: ScoreHistory = [...scoreHistory, newRound];
    localStorage.setItem(
      'score-keeper-scores',
      JSON.stringify(newScoreHistory, null, 2)
    );
  }

  getAccumulativeScoreById(
    scoreHistory: ScoreHistory,
    playerId: number,
    round: number
  ) {
    let scoresUpToRound = scoreHistory.length > 1 ? scoreHistory.slice(0, round + 1) : [...scoreHistory];

    const totalScore: number = scoresUpToRound.reduce(function (
      acc: number,
      curr: Round
    ) {
      const playerScore = curr.find((score) => score.id === playerId);
      return (acc += playerScore!.points);
    },
    0);
    return totalScore;
  }
}
