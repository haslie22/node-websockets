import { ShipBoard } from '../../database/types/ship';

const isShipBoard = (data: unknown): data is ShipBoard => {
  return typeof data === 'object' && data !== null && 'gameId' in data && 'ships' in data && 'indexPlayer' in data;
};

export default isShipBoard;
