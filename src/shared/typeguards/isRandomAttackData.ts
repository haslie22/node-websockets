import { RandomAttackData } from '../../database/types/game';

const isRandomAttackData = (data: unknown): data is RandomAttackData => {
  return typeof data === 'object' && data !== null && 'gameId' in data && 'indexPlayer' in data;
};

export default isRandomAttackData;
