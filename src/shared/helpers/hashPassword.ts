import { pbkdf2, randomBytes } from 'crypto';

const hashPassword = (password: string): Promise<string> => {
  const salt = randomBytes(16).toString('hex');

  return new Promise((resolve, reject) => {
    pbkdf2(password, salt, 1000, 64, 'sha512', (err, derivedKey) => {
      if (err) {
        reject(err);
      } else {
        resolve(derivedKey.toString('hex'));
      }
    });
  });
};

export default hashPassword;
