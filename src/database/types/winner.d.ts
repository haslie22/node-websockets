import { PlayerId } from '../../shared/types/types';

export interface Winner {
  name: string;
  wins: number;
}

export interface FinishGameData {
  winPlayer: PlayerId;
}
