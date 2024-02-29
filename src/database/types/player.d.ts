import { HashedPassword, PlayerId } from '../../shared/types/types';

export interface RegistrationData {
  name: string;
  password: string;
}

export interface Player {
  name: string;
  id: PlayerId;
}

export interface PlayerDetailed extends Player {
  player: Player;
  password: HashedPassword;
}

export interface RegistrationResponseData {
  name: string;
  index: PlayerId;
  error: boolean;
  errorText: string;
}
