import { Database } from "sqlite3";
import { fetchBooks } from "../fetchBooks";

describe("fetchBooks", () => {
  let db: Database;

  beforeEach(() => {
    db = createInMemoryDb();
  });

  it("should return a collection of books", async () => {
    const books = await fetchBooks(db);
    expect(books).toHaveLength(2);
  });

  it("should return fields 'title', 'author' and 'timestamp'", async () => {
    const books = await fetchBooks(db);
    expect(books[0].title).toBe("Book Title 1");
    expect(books[0].author).toBe("Author Name 1");
    expect(books[0].timestamp).toBe("2022-05-11");
  });
});

function createInMemoryDb() {
  const db = new Database(":memory:");
  db.serialize(() => {
    db.run("CREATE TABLE books (title TEXT, author TEXT, timestamp TEXT)");
    db.run(
      "INSERT INTO books VALUES ('Book Title 1', 'Author Name 1', '2022-05-11')"
    );
    db.run(
      "INSERT INTO books VALUES ('Book Title 2', 'Author Name 2', '2022-05-11')"
    );
  });
  return db;
}
