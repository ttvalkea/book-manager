import { Database } from "sqlite3";
import { fetchBooks } from "../fetchBooks";

describe("fetchBooks", () => {
  let db: Database;

  beforeEach(() => {
    db = createInMemoryDb();
  });

  it("should return a collection of 20 books", async () => {
    const books = await fetchBooks(0, db);
    expect(books).toHaveLength(20);
  });

  it("should return fields 'title', 'author' and 'timestamp'", async () => {
    const books = await fetchBooks(0, db);
    expect(books[0].title).toBeDefined();
    expect(books[0].author).toBeDefined();
    expect(books[0].timestamp).toBeDefined();
  });

  it("should return the 20 books with the last timestamps, when page number is 0", async () => {
    const books = await fetchBooks(0, db);
    expect(books).toHaveLength(20);
    expect(books[0].title).toBe("Book Title 44");
    expect(books[1].title).toBe("Book Title 43");
    expect(books[19].title).toBe("Book Title 25");
  });

  it("should return last 5 books with the first timestamps, when page number is 2", async () => {
    const books = await fetchBooks(2, db);
    expect(books).toHaveLength(5);
    expect(books[0].title).toBe("Book Title 4");
    expect(books[4].title).toBe("Book Title 0");
  });

  it("should what return empty array when page number is larger than there are pages of books", async () => {
    const books = await fetchBooks(10, db);
    expect(books).toStrictEqual([]);
  });
});

function createInMemoryDb() {
  const db = new Database(":memory:");
  db.serialize(() => {
    db.run("CREATE TABLE books (title TEXT, author TEXT, timestamp TEXT)");
    populateDb(db);
  });
  return db;
}

function populateDb(db: Database): void {
  for (let index = 0; index < 45; index++) {
    const date = new Date(2023, 5, 5, index).toISOString();
    db.run(
      `INSERT INTO books (title, author, timestamp) VALUES ('Book Title ${index}', 'Author Name ${index}', '${date}')`
    );
  }
}
