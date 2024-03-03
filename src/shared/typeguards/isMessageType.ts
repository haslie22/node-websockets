import { MessageType } from '../constants/constants';

const isMessageType = (type: string): type is MessageType => {
  return Object.values(MessageType).includes(type as MessageType);
};

export default isMessageType;
