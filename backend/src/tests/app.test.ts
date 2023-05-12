import request from "supertest";
import app from "../app";
import { Book, fetchBooks } from "../fetchBooks";

jest.mock("../fetchBooks");
const fetchBooksMock = fetchBooks as jest.MockedFunction<typeof fetchBooks>;

describe("GET /books", () => {
  let books: Book[];

  beforeEach(() => {
    books = [];
    fetchBooksMock.mockResolvedValue(books);
  });

  it("should return status code 200 and call fetchBooks", async () => {
    const response = await request(app).get("/books");
    expect(response.status).toBe(200);
    expect(fetchBooksMock).toHaveBeenCalled();
  });

  it("should call fetchBooks with page number 0 when no 'page' query parameter is given", async () => {
    await request(app).get("/books");
    expect(fetchBooksMock).toHaveBeenCalledWith(0);
  });

  it("should call fetchBooks with page number 7 when 'page' query parameter is 7", async () => {
    await request(app).get("/books").query({ page: 7 });
    expect(fetchBooksMock).toHaveBeenCalledWith(7);
  });
});
