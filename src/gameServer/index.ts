import Database from '../database';
import HTTPServer from '../httpServer';
import { games } from '../database/game';
import { players } from '../database/player';
import { rooms } from '../database/room';
import { ships } from '../database/ship';
import { winners } from '../database/winner';
import WSServer from '../wsServer';
import { Notifications } from '../shared/constants/constants';
import isRegistrationData from '../shared/typeguards/isRegistrationData';
import hashPassword from '../shared/helpers/hashPassword';
import { Player, PlayerDetailed, RegistrationData } from '../database/types/player';
import comparePasswords from '../shared/helpers/comparePasswords';
import generateId from '../shared/helpers/generateId';

class GameServer {
  private httpPort: number;
  private wsPort: number;
  private httpServer: HTTPServer;
  private wsServer: WSServer;
  private database: Database;

  private typeToHandlerMap: { [key: string]: () => void } = {
    reg: this.handleRegistration.bind(this),
    create_room: this.handleCreateRoom.bind(this),
    add_user_to_room: this.handleAddUserToRoom.bind(this),
    add_ships: this.handleAddShips.bind(this),
    attack: this.handleAttack.bind(this),
    randomAttack: this.handleRandomAttack.bind(this),
  };

  constructor(httpPort: number, wsPort: number) {
    this.httpPort = httpPort;
    this.wsPort = wsPort;

    this.httpServer = new HTTPServer(this.httpPort);
    this.wsServer = new WSServer(this.wsPort, true, this.mapHandler.bind(this));
    this.database = new Database(players, rooms, ships, games, winners);
  }

  mapHandler(type: unknown): () => void {
    if (typeof type !== 'string' || !this.typeToHandlerMap.hasOwnProperty(type)) {
      throw new Error(`${Notifications.PARSE_FAIL_TYPE} ${type}`);
    }

    return this.typeToHandlerMap[type];
  }

  private handleRegistration(data: unknown): void {
    if (!isRegistrationData(data)) {
      throw new Error(`${Notifications.PARSE_FAIL_DATA} ${data}`);
    }

    const { name, password } = data;
    const existingUser = this.database.playersTable.getPlayerByName(name);

    existingUser ? this.handleLogin(password, existingUser.password) : this.createUser(data);
  }

  private async handleLogin(passwordAttempt: string, hashedPassword: string): Promise<void> {
    const isPasswordCorrect = await comparePasswords(passwordAttempt, hashedPassword);

    if (!isPasswordCorrect) {
      throw new Error(Notifications.INCORRECT_PASSWORD);
    }
  }

  private async createUser(data: RegistrationData): Promise<void> {
    const { name, password } = data;
    const id = generateId();
    const hashedPassword = await hashPassword(password);

    const newPlayer: PlayerDetailed = {
      player: { id, name },
      password: hashedPassword,
    };

    this.database.playersTable.addPlayer(newPlayer);
    console.log(newPlayer);
  }

  private handleCreateRoom(data: unknown): void {
    console.log('Handling create room message');
  }

  private handleAddUserToRoom(data: unknown): void {
    console.log('Handling add user to room message');
  }

  private handleAddShips(data: unknown): void {
    console.log('Handling add ships message');
  }

  private handleAttack(data: unknown): void {
    console.log('Handling attack message');
  }

  private handleRandomAttack(data: unknown): void {
    console.log('Handling random attack message');
  }
}

export default GameServer;
