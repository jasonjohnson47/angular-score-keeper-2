import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Player } from '../common/models/player';
import { PlayerOperations } from '../common/models/player-operations';
import { Score, Round, ScoreHistory, PlayerPoints } from '../common/models/score';
import { PlayerService } from '../common/services/player.service';
import { ScoreService } from '../common/services/score.service';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

@Component({
  selector: 'app-edit-round',
  templateUrl: './edit-round.component.html',
  styleUrls: ['./edit-round.component.css']
})
export class EditRoundComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private playerService: PlayerService,
    private scoreService: ScoreService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.roundToEdit = Number(params.get('round'));
      if (this.roundToEdit) {

        this.players = this.playerService.getPlayers();

        this.initialRoundScores = this.scoreService.getScoreHistory()[this.roundToEdit];

        this.playerPoints = this.initialRoundScores.reduce((acc: PlayerPoints, curr: Score) => {
          return {...acc, [curr.id]: curr.points}
        }, {});

        this.playerPointsPositive = {...this.playerPoints};
        for (const [key, value] of Object.entries(this.playerPoints)) {
          this.playerPointsPositive[key] = Math.abs(Number(value)).toString();
        }

        this.initialPlayerOperations = this.players.reduce(
          (acc: PlayerOperations, currPlayer: Player) => {
            const keyName = 'operation-' + currPlayer.id;
            var operation: 'add' | 'subtract';
            
            if (Number(this.playerPoints[currPlayer.id]) < 0) {
              operation = 'subtract';
            } else {
              operation = 'add'
            }
            
            return { ...acc, [keyName]: operation };
          },
          {}
        );

        this.playerOperations = {...this.initialPlayerOperations};

      }
    });
  }

  roundToEdit!: number;
  players!: Player[];
  initialPlayerOperations!: PlayerOperations;
  initialRoundScores!: Round;
  playerOperations!: PlayerOperations;
  playerPoints!: PlayerPoints;
  playerPointsPositive!: PlayerPoints;

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
          Number(this.playerPointsPositive[player.id])
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

  onSubmit() {
    const newScoreHistory: ScoreHistory = [...this.scoreService.getScoreHistory()];
    newScoreHistory[this.roundToEdit] = this.thisRoundScores;
    this.scoreService.setScoreHistory(newScoreHistory);
    this.router.navigate(['/game-history']);
  }

}
