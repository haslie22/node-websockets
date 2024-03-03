import { Winner } from '../../database/types/winner';

const buildUpdateWinners = (winners: Winner[]): string => {
  const response = winners;
  return JSON.stringify(response);
};

export default buildUpdateWinners;
