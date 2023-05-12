import { render, screen, within } from "@testing-library/react";
import BookList from "./BookList";
import { useBooks, UseBooksResult } from "./useBooks";

jest.mock("./useBooks");
const useBooksMock = useBooks as jest.MockedFunction<typeof useBooks>;

describe("BookList", () => {
  let useBooksResult: UseBooksResult;
  let triggerNextPageFetchFunction: () => void;
  beforeEach(() => {
    triggerNextPageFetchFunction = jest.fn();
    useBooksResult = {
      books: [
        { author: "Author 1", title: "Title 1", timestamp: "2000-1-1" },
        { author: "Author 2", title: "Title 2", timestamp: "2000-1-1" },
      ],
      triggerNextPageFetch: triggerNextPageFetchFunction,
    };
    useBooksMock.mockReturnValue(useBooksResult);
  });

  it("should render a table", () => {
    render(<BookList />);

    const booksTable = screen.getByRole("table");
    expect(booksTable).toBeInTheDocument();
  });

  it("should have headers Title, Author and Timestamp", () => {
    render(<BookList />);

    const headers = screen.getAllByRole("columnheader");
    expect(headers.length).toBe(3);
    expect(headers[0]).toHaveTextContent("Title");
    expect(headers[1]).toHaveTextContent("Author");
    expect(headers[2]).toHaveTextContent("Timestamp");
  });

  it("should have table rows with title, author and timestamp", () => {
    render(<BookList />);

    const rows = screen.getAllByRole("row");

    // Starting from rows[1] instead of rows[0] because rows[0] is the header row
    const firstRowsCells = within(rows[1]).getAllByRole("cell");
    const secondRowsCells = within(rows[2]).getAllByRole("cell");

    expect(firstRowsCells[0]).toHaveTextContent("Title 1");
    expect(firstRowsCells[1]).toHaveTextContent("Author 1");
    expect(firstRowsCells[2]).toHaveTextContent("2000-1-1");
    expect(secondRowsCells[0]).toHaveTextContent("Title 2");
    expect(secondRowsCells[1]).toHaveTextContent("Author 2");
    expect(secondRowsCells[2]).toHaveTextContent("2000-1-1");
  });
});
