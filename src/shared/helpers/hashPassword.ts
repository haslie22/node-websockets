import { randomBytes, pbkdf2 } from 'crypto';

import { HashedPassword } from '../types/types';

const hashPassword = (password: string): Promise<HashedPassword> => {
  const salt = randomBytes(16).toString('hex');
  return new Promise((resolve, reject) => {
    pbkdf2(password, salt, 1000, 64, 'sha512', (err, derivedKey) => {
      if (err) {
        reject(err);
      } else {
        resolve({
          salt: salt,
          hash: derivedKey.toString('hex'),
        });
      }
    });
  });
};

export default hashPassword;
