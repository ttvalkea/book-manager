import express, { Request, Response } from "express";
import cors from "cors";
import { Database, OPEN_READWRITE } from "sqlite3";

// TODO: Refactor the whole file

export interface Book {
  title: string;
  author: string;
  timestamp: string;
}

// create an instance of the express app
const app = express();

// enable CORS for all routes
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  // TODO: Refactor, move the database code somewhere

  const db = new Database("./db/books.db", OPEN_READWRITE, (err) => {
    if (err) {
      // TODO: Error handling
      console.error(err.message);
    }
    console.log("Connected to the database.");
  });

  db.serialize(() => {
    db.all<Book>("SELECT title, author, timestamp FROM books", (err, books) => {
      if (err) {
        // TODO: Error handling
        console.error(err.message);
      }
      res.end(JSON.stringify(books));
    });
  });

  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Closing the database connection.");
  });
});

// start the server
app.listen(3001, () => {
  console.log("Server listening on port 3001");
});
