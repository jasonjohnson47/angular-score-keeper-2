import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Player } from '../common/models/player';
import { PlayerOperations } from '../common/models/player-operations';
import { Score, Round } from '../common/models/score';
import { PlayerService } from '../common/services/player.service';
import { ScoreService } from '../common/services/score.service';

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
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.roundToEdit = Number(params.get('round'));
      if (this.roundToEdit) {

        this.players = this.playerService.getPlayers();

        this.roundScores = this.scoreService.getScoreHistory()[this.roundToEdit];

        this.playerPoints = this.roundScores.reduce((acc: any, curr: Score) => {
          return {...acc, [curr.id]: curr.points}
        }, {});

        this.playerPointsPositive = {};
        for (const [key, value] of Object.entries(this.playerPoints)) {
          this.playerPointsPositive[key] = Math.abs(value as number);
        }

        this.initialPlayerOperations = this.players.reduce(
          (acc: PlayerOperations, currPlayer: Player) => {
            const keyName = 'operation-' + currPlayer.id;
            var operation: 'add' | 'subtract';
            
            if (this.playerPoints[currPlayer.id] < 0) {
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
  roundScores!: Round;
  playerPoints!: any;
  playerPointsPositive!: any;
  players!: Player[];
  initialPlayerOperations!: PlayerOperations;
  playerOperations!: PlayerOperations;

  onAddSubPressed(id: number) {
    // unpressed = adding
    // pressed = subtracting
    this.playerOperations['operation-' + id] =
    this.playerOperations['operation-' + id] === 'subtract' ? 'add' : 'subtract';
  }

  onSubmit() {

  }

}
