import hashPassword from './hashPassword';

const comparePasswords = async (userInput: string, hashedPassword: string): Promise<boolean> => {
  const hashedInput = await hashPassword(userInput);
  return hashedInput === hashedPassword;
};

export default comparePasswords;
