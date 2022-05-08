import { TestBed } from '@angular/core/testing';
import { ScoreService } from './score.service';
import { scoreHistory } from '../../mock-score-history';

describe('ScoreService', () => {
  let service: ScoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should remove a players scores from the score history', () => {
    const originalScoreHistory = JSON.parse(JSON.stringify(scoreHistory)); // deep clone
    const expectedScoreHistory = [
      [
        { id: 0, points: 0 },
        { id: 2, points: 0 },
      ],
      [
        { id: 0, points: 1 },
        { id: 2, points: 3 },
      ],
      [
        { id: 0, points: 10 },
        { id: 2, points: 20 },
      ],
      [
        { id: 0, points: 6 },
        { id: 2, points: 2 },
      ],
    ];
    const result = service.removePlayerFromScoreHistory(originalScoreHistory, 1);

    expect(result).toEqual(expectedScoreHistory);
  });
});
