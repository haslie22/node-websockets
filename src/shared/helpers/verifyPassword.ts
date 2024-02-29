import { pbkdf2 } from 'crypto';

async function verifyPassword(password: string, hash: string, salt: string): Promise<boolean> {
  const derivedKey = await new Promise<Buffer>((resolve, reject) => {
    pbkdf2(password, salt, 1000, 64, 'sha512', (err, derivedKey) => {
      if (err) {
        reject(err);
      } else {
        resolve(derivedKey);
      }
    });
  });

  return derivedKey.toString('hex') === hash;
}

export default verifyPassword;
