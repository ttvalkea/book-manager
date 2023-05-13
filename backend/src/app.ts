import express, { Request, Response } from "express";
import cors from "cors";
import { fetchBooks } from "./fetchBooks";
import { bookDecoder, BookWithoutTimestamp, createBook } from "./insertBook";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());

app.use(cors());

// TODO: In addition to a page of books, this should return whether there are more books to be loaded or not.
app.get("/books", async (req: Request, res: Response): Promise<void> => {
  const page = parseInt(req.query.page as string) || 0; // TODO: Should return an error, when page parameter is less than 0 or not an integer.
  const books = await fetchBooks(page);
  res.end(JSON.stringify(books));
});

app.post("/book", async (req: Request, res: Response): Promise<void> => {
  let book: BookWithoutTimestamp;
  try {
    book = bookDecoder(req.body);
  } catch {
    res.status(400).send("Invalid request body");
    return;
  }

  // TODO: Handle errors that occur while inserting a book
  const createdBook = await createBook(book);

  res.send(JSON.stringify(createdBook));
});

// Start the server, if it's not being used by tests
if (require.main === module) {
  app.listen(3001, () => {
    console.log("Server listening on port 3001");
  });
}

export default app;
