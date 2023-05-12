import express, { Request, Response } from "express";
import cors from "cors";
import { fetchBooks } from "./fetchBooks";

// create an instance of the express app
const app = express();

// enable CORS for all routes
app.use(cors());

app.get("/", async (req: Request, res: Response) => {
  const books = await fetchBooks();
  res.end(JSON.stringify(books));
});

// start the server
app.listen(3001, () => {
  console.log("Server listening on port 3001");
});
