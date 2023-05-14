import { render } from "@testing-library/react";
import App from "./App";
import BookList from "./BookList";
import { BooksContextProvider } from "./BooksContext";

jest.mock("./BookList");
const BookListMock = BookList as jest.MockedFunction<typeof BookList>;

describe("App", () => {
  it("should render a book list", () => {
    BookListMock.mockReturnValue(<div />);
    render(
      <BooksContextProvider>
        <App />
      </BooksContextProvider>
    );
    const expectedBookListProps = {};
    expect(BookListMock).toHaveBeenCalledWith(
      expectedBookListProps,
      expect.anything()
    );
  });

  // TODO: should render a book adding form
});
