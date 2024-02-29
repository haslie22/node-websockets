import { WinnerId } from '../shared/types/types';
import { Winner } from './types/winner';

class WinnersTable {
  private winnersList: Winner[];

  constructor() {
    this.winnersList = [];
  }

  addWinner(winner: Winner): void {
    this.winnersList.push(winner);
  }

  getWinner(id: WinnerId): Winner | undefined {
    return this.winnersList.find((winner) => winner.winPlayer === id);
  }

  removeWinner(id: WinnerId): void {
    const winnerIndex = this.winnersList.findIndex((winner) => winner.winPlayer === id);
    if (winnerIndex !== -1) this.winnersList.splice(winnerIndex, 1);
  }

  getWinners(): Winner[] {
    return this.winnersList;
  }
}

const winners = new WinnersTable();

export { winners };
export default WinnersTable;
