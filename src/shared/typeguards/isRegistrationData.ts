import { RegistrationData } from '../../database/types/player';

const isRegistrationData = (data: unknown): data is RegistrationData => {
  return (
    typeof data === 'object' &&
    data !== null &&
    'name' in data &&
    typeof data.name === 'string' &&
    'password' in data &&
    typeof data.password === 'string'
  );
};

export default isRegistrationData;
