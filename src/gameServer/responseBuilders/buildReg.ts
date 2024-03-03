import { PlayerId } from '../../shared/types/types';

const buildReg = (name: string, index: PlayerId, error: boolean, errorText: string): string => {
  const response = {
    name,
    index,
    error,
    errorText,
  };

  return JSON.stringify(response);
};

export default buildReg;
