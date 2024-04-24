import { AttackData } from '../../database/types/game';

const isAttackData = (data: unknown): data is AttackData => {
  return (
    typeof data === 'object' && data !== null && 'x' in data && 'y' in data && 'gameId' in data && 'indexPlayer' in data
  );
};

export default isAttackData;
