import { GameId, PlayerId } from '../shared/types/types';
import { ShipBoard } from './types/ship';

class ShipsTable {
  private shipsList: ShipBoard[];

  constructor() {
    this.shipsList = [];
  }

  addShipBoard(ship: ShipBoard): void {
    this.shipsList.push(ship);
  }

  getShipBoard(playerId: PlayerId, gameId: GameId): ShipBoard | undefined {
    return this.shipsList.find((ship) => ship.indexPlayer === playerId && ship.gameId === gameId);
  }

  removeShipBoard(playerId: PlayerId, gameId: GameId): void {
    const shipIndex = this.shipsList.findIndex((ship) => ship.indexPlayer === playerId && ship.gameId === gameId);
    if (shipIndex !== -1) this.shipsList.splice(shipIndex, 1);
  }

  getShipBoards(): ShipBoard[] {
    return this.shipsList;
  }
}

const ships = new ShipsTable();

export { ships };
export default ShipsTable;
