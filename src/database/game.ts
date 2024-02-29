import { GameId } from '../shared/types/types';
import { Game } from './types/game';

class GamesTable {
  private gamesList: Game[];

  constructor() {
    this.gamesList = [];
  }

  addGame(game: Game): void {
    this.gamesList.push(game);
  }

  getGame(id: GameId): Game | undefined {
    return this.gamesList.find((game) => game.id === id);
  }

  removeGame(id: GameId): void {
    const gameIndex = this.gamesList.findIndex((game) => game.id === id);
    if (gameIndex !== -1) this.gamesList.splice(gameIndex, 1);
  }

  getGames(): Game[] {
    return this.gamesList;
  }
}

const games = new GamesTable();

export { games };
export default GamesTable;
