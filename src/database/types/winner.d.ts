import { PlayerId } from '../../shared/types/types';

export interface UpdateWinnersData {
  name: string;
  wins: number;
}

export interface FinishGameData {
  winPlayer: PlayerId;
}

export type Winner = Omit<UpdateWinnersData, 'name'> & FinishGameData;
