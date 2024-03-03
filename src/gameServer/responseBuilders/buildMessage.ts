import { MessageType } from '../../shared/constants/constants';
import { Message } from '../../shared/types/types';

const buildMessage = (type: MessageType, data: string): Message<string> => {
  const message = {
    type,
    data,
    id: 0,
  };

  return message;
};

export default buildMessage;
