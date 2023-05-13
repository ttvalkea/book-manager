import { Book } from "./fetchBooks";
import { getDb } from "./getDb";
import {
  DecoderFunction,
  nullable,
  record,
  string,
} from "typescript-json-decoder";

export type BookWithoutTimestamp = Omit<Book, "timestamp">;

export const bookDecoder: DecoderFunction<BookWithoutTimestamp> = record({
  title: string,
  author: nullable(string),
});

// TODO: Tests for this

export async function createBook(book: BookWithoutTimestamp): Promise<Book> {
  const db = getDb();

  return new Promise<Book>((resolve, reject) => {
    db.run(
      "INSERT INTO books (title, author) VALUES (?, ?)",
      [book.title, book.author],
      function (err) {
        console.log(this);
        if (err) {
          reject(err);
          return;
        }
      }
    );

    db.get<Book>(
      "SELECT title, author, timestamp FROM books WHERE title = ? ORDER BY timestamp DESC LIMIT 1",
      [book.title],
      (err, row) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(row);
      }
    );
  });
}
