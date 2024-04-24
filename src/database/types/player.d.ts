import { PlayerId } from '../../shared/types/types';

export interface RegistrationData {
  // request
  name: string;
  password: string;
}

export interface Player {
  name: string;
  id: PlayerId;
}

export interface PlayerDetailed {
  player: Player;
  password: string;
}

export interface RegistrationResponseData {
  // response
  name: string;
  index: PlayerId;
  error: boolean;
  errorText: string;
}
