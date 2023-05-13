import { Database } from "sqlite3";
import { getDb } from "./getDb";

export interface Book {
  title: string;
  author: string | null;
  timestamp: string;
}

export function fetchBooks(
  page: number,
  dbConnection?: Database
): Promise<Book[]> {
  const db = getDb(dbConnection);

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
