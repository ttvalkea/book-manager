import express, { Request, Response } from "express";
import cors from "cors";
import { fetchBooks } from "./fetchBooks";

// Create an instance of the express app
const app = express();

// Enable CORS for all routes
app.use(cors());

app.get("/books", async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 0; // TODO: Should return an error, when page parameter is less than 0 or not an integer.
  const books = await fetchBooks(page);
  res.end(JSON.stringify(books));
});

// Start the server, if it's not being used by tests
if (require.main === module) {
  app.listen(3001, () => {
    console.log("Server listening on port 3001");
  });
}

export default app;
