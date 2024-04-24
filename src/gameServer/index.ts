import { WebSocket } from 'ws';

import Database from '../database';
import HTTPServer from '../httpServer';
import { games } from '../database/game';
import { players } from '../database/player';
import { rooms } from '../database/room';
import { ships } from '../database/ship';
import { winners } from '../database/winner';
import WSServer from '../wsServer';
import { MessageType, Notifications } from '../shared/constants/constants';
import isRegistrationData from '../shared/typeguards/isRegistrationData';
import hashPassword from '../shared/helpers/hashPassword';
import { PlayerDetailed, RegistrationData } from '../database/types/player';
import comparePasswords from '../shared/helpers/comparePasswords';
import generateId from '../shared/helpers/generateId';
import buildMessage from './responseBuilders/buildMessage';
import buildReg from './responseBuilders/buildReg';
import isMessageType from '../shared/typeguards/isMessageType';
import { Message } from '../shared/types/types';
import buildUpdateRoom from './responseBuilders/buildUpdateRoom';
import buildUpdateWinners from './responseBuilders/buildUpdateWinners';
import isAddUserToRoomData from '../shared/typeguards/isAddUserToRoomData';

type TypeToHandlerMap = {
  [K in MessageType]?: () => string;
};

class GameServer {
  private httpPort: number;
  private wsPort: number;
  private httpServer: HTTPServer;
  private wsServer: WSServer;
  private database: Database;

  private typeToHandlerMap: TypeToHandlerMap = {
    [MessageType.REG]: this.handleRegistration.bind(this),
    [MessageType.CREATE_ROOM]: this.handleCreateRoom.bind(this),
    [MessageType.ADD_USER_TO_ROOM]: this.handleAddUserToRoom.bind(this),
  };

  constructor(httpPort: number, wsPort: number) {
    this.httpPort = httpPort;
    this.wsPort = wsPort;

    this.httpServer = new HTTPServer(this.httpPort);
    this.wsServer = new WSServer(this.wsPort, true, this.mapHandler.bind(this));
    this.database = new Database(players, rooms, ships, games, winners);
  }

  sendResponse<T>(socket: WebSocket, res: Message<T>): void {
    socket.send(JSON.stringify(res));
  }

  mapHandler(type: unknown): () => string {
    if (typeof type !== 'string' || !isMessageType(type)) {
      throw new Error(`${Notifications.PARSE_FAIL_TYPE} ${type}`);
    }

    return this.typeToHandlerMap[type];
  }

  private async handleRegistration(data: unknown, socket: WebSocket): Promise<string> {
    if (!isRegistrationData(data)) {
      throw new Error(`${Notifications.PARSE_FAIL_DATA} ${data}`);
    }

    const { name, password } = data;
    const existingUser = this.database.playersTable.getPlayerByName(name);

    return existingUser
      ? await this.handleLogin(socket, password, existingUser.password)
      : await this.createUser(socket, data);
  }

  private async handleLogin(socket: WebSocket, passwordAttempt: string, hashedPassword: string): Promise<string> {
    const isPasswordCorrect = await comparePasswords(passwordAttempt, hashedPassword);

    if (!isPasswordCorrect) {
      throw new Error(Notifications.INCORRECT_PASSWORD);
    }

    return '';
    // TODO: implement
  }

  private async handleCreateRoom(data: unknown, socket: WebSocket, userId: string): Promise<string> {
    const roomId = generateId();
    this.database.roomsTable.addRoom(roomId);

    const { player } = this.database.playersTable.getPlayerById(userId);
    this.database.roomsTable.addToRoom(roomId, player);

    this.updateRoom();

    return userId;
  }

  private async handleAddUserToRoom(data: unknown, socket: WebSocket, userId: string): Promise<string> {
    if (!isAddUserToRoomData(data)) {
      throw new Error(`${Notifications.PARSE_FAIL_DATA} ${data}`);
    }

    const { indexRoom } = data;
    const userToAdd = this.database.playersTable.getPlayerById(userId);
    const room = this.database.roomsTable.getRoom(indexRoom);
    const isAlreadyIn = room.players[0].id === userId;

    if (!isAlreadyIn) {
      this.database.roomsTable.addToRoom(room.id, userToAdd.player);
    } else {
      console.error(Notifications.ALREADY_IN_ROOM);
    }

    this.updateRoom();
    this.createGame();

    return userId;
  }

  private async createUser(socket: WebSocket, data: RegistrationData): Promise<string> {
    const { name, password } = data;
    const id = generateId();

    let res: Message<string>;

    try {
      const hashedPassword = await hashPassword(password);

      const newPlayer: PlayerDetailed = {
        player: { id, name },
        password: hashedPassword,
      };

      this.database.playersTable.addPlayer(newPlayer);

      res = buildMessage(MessageType.REG, buildReg(name, id, false, ''));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : Notifications.UNKNOWN_ERROR;
      res = buildMessage(MessageType.REG, buildReg(name, id, true, errorMessage));
    }

    this.sendResponse(socket, res);

    this.updateRoom();
    this.updateWinners();

    return id;
  }

  private async updateRoom(): Promise<void> {
    const availableRooms = this.database.roomsTable.getAvailableRooms();
    const res = buildMessage(MessageType.UPDATE_ROOM, buildUpdateRoom(availableRooms));

    this.wsServer.server.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) this.sendResponse(client, res);
    });
  }

  private async updateWinners(): Promise<void> {
    const winners = this.database.winnersTable.getWinners();
    const res = buildMessage(MessageType.UPDATE_WINNERS, buildUpdateWinners(winners));

    this.wsServer.server.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) this.sendResponse(client, res);
    });
  }

  private async createGame(): Promise<void> {
    console.log(this.database.roomsTable.getRooms());
  }
}

export default GameServer;
