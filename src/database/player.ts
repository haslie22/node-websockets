import { PlayerId } from '../shared/types/types';
import { PlayerDetailed } from './types/player';

class PlayersTable {
  private playersList: PlayerDetailed[];

  constructor() {
    this.playersList = [];
  }

  addPlayer(player: PlayerDetailed): void {
    this.playersList.push(player);
  }

  getPlayerById(id: PlayerId): PlayerDetailed | undefined {
    return this.playersList.find((detailedInfo) => detailedInfo.player.id === id);
  }

  getPlayerByName(name: string): PlayerDetailed | undefined {
    return this.playersList.find((detailedInfo) => detailedInfo.player.name === name);
  }

  removePlayer(id: PlayerId): void {
    const playerIndex = this.playersList.findIndex((player) => player.player.id === id);
    if (playerIndex !== -1) this.playersList.splice(playerIndex, 1);
  }

  getPlayers(): PlayerDetailed[] {
    return this.playersList;
  }
}

const players = new PlayersTable();

export { players };
export default PlayersTable;
