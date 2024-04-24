import { Room } from '../../database/types/room';

const buildUpdateRoom = (availableRooms: Room[]): string => {
  const response = availableRooms.map((room) => {
    return {
      roomId: room.id,
      roomUsers: room.players.map((player) => {
        return {
          name: player.name,
          index: player.id,
        };
      }),
    };
  });

  return JSON.stringify(response);
};

export default buildUpdateRoom;
