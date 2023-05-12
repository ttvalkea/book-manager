import { render } from "@testing-library/react";
import App from "./App";
import BookList from "./BookList";

jest.mock("./BookList");
const BookListMock = BookList as jest.MockedFunction<typeof BookList>;

describe("App", () => {
  it("should render a book list", () => {
    BookListMock.mockReturnValue(<div />);
    render(<App />);
    const expectedBookListProps = {};
    expect(BookListMock).toHaveBeenCalledWith(
      expectedBookListProps,
      expect.anything()
    );
  });
});
