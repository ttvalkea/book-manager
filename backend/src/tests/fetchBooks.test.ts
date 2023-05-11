import { fetchBooks } from "../fetchBooks";

describe("fetchBooks", () => {
  // TODO: Needs actual test
  it("should return a book", () => {
    const expected = "a book";
    const actual = fetchBooks();
    expect(actual).toBe(expected);
  });
});
