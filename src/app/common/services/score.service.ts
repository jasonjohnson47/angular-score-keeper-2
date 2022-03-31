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

  initialRoundPoints: Round = this.players.map((player) => {
    return { id: player.id, points: 0 };
  });

  initialScoreHistory: ScoreHistory = [this.initialRoundPoints];

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