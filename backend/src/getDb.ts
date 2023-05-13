import { Database, OPEN_READWRITE } from "sqlite3";

export function getDb(dbConnection?: Database): Database {
  // dbConnection parameter is used from tests
  return dbConnection || new Database("./db/books.db", OPEN_READWRITE); // TODO: Error handling for opening
}
