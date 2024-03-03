import { RawData } from 'ws';

const parseMessage = (rawMessage: RawData): { type: unknown; data: unknown } => {
  const { type, data } = JSON.parse(rawMessage.toString());
  const parsedData = data.length ? JSON.parse(data) : data;

  return { type, data: parsedData };
};

export default parseMessage;
