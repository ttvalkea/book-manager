import { Database, OPEN_READWRITE } from "sqlite3";

export interface Book {
  title: string;
  author: string;
  timestamp: string;
}

export function fetchBooks(
  page: number,
  dbConnection?: Database
): Promise<Book[]> {
  // dbConnection parameter is used from tests
  const db = dbConnection || new Database("./db/books.db", OPEN_READWRITE); // TODO: Error handling for opening

  const limit = 20;
  const offset = page * limit;

  return new Promise((resolve) => {
    db.serialize(() => {
      db.all<Book>(
        `SELECT title, author, timestamp FROM books ORDER BY timestamp DESC LIMIT ${limit} OFFSET ${offset}`,
        (err, rows) => {
          // TODO: Error handling for querying
          resolve(rows);
          db.close(); // TODO: Error handling for closing
        }
      );
    });
  });
}
