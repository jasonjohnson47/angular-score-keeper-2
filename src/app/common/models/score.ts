export interface Score {
  id: number;
  points: number;
}
export type Round = Score[];
export type ScoreHistory = Round[];

export interface PlayerPoints {
  [key: string]: string
}