import { Winner } from './types/winner';

class WinnersTable {
  private winnersList: Winner[];

  constructor() {
    this.winnersList = [];
  }

  addWinner(winner: Winner): void {
    this.winnersList.push(winner);
  }

  getWinnerByName(name: string): Winner | undefined {
    return this.winnersList.find((winner) => winner.name === name);
  }

  removeWinner(name: string): void {
    const winnerIndex = this.winnersList.findIndex((winner) => winner.name === name);
    if (winnerIndex !== -1) this.winnersList.splice(winnerIndex, 1);
  }

  getWinners(): Winner[] {
    return this.winnersList;
  }
}

const winners = new WinnersTable();

export { winners };
export default WinnersTable;
