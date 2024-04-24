import { AddUserToRoomData } from '../../database/types/room';

const isAddUserToRoomData = (data: unknown): data is AddUserToRoomData => {
  return typeof data === 'object' && data !== null && 'indexRoom' in data;
};

export default isAddUserToRoomData;
