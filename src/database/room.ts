import { RoomId } from '../shared/types/types';
import { Player } from './types/player';
import { Room } from './types/room';

class RoomsTable {
  private roomsList: Room[];

  constructor() {
    this.roomsList = [];
  }

  addRoom(id: RoomId): void {
    this.roomsList.push({ id, players: [] });
  }

  getRoom(id: RoomId): Room | undefined {
    return this.roomsList.find((room) => room.id === id);
  }

  removeRoom(id: RoomId): void {
    const roomIndex = this.roomsList.findIndex((room) => room.id === id);
    if (roomIndex !== -1) this.roomsList.splice(roomIndex, 1);
  }

  addToRoom(roomId: RoomId, player: Player): void {
    const room = this.getRoom(roomId);
    if (room) room.players.push(player);
  }

  getAvailableRooms(): Room[] {
    return this.roomsList.filter((room) => room.players.length === 1);
  }

  getRooms(): Room[] {
    return this.roomsList;
  }
}

const rooms = new RoomsTable();

export { rooms };
export default RoomsTable;
