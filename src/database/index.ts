import GamesTable from './game';
import PlayersTable from './player';
import RoomsTable from './room';
import ShipsTable from './ship';
import WinnersTable from './winner';

class Database {
  playersTable: PlayersTable;
  roomsTable: RoomsTable;
  shipsTable: ShipsTable;
  gamesTable: GamesTable;
  winnersTable: WinnersTable;

  constructor(
    playersTable: PlayersTable,
    roomsTable: RoomsTable,
    shipsTable: ShipsTable,
    gamesTable: GamesTable,
    winnersTable: WinnersTable,
  ) {
    this.playersTable = playersTable;
    this.roomsTable = roomsTable;
    this.shipsTable = shipsTable;
    this.gamesTable = gamesTable;
    this.winnersTable = winnersTable;
  }
}

export default Database;
