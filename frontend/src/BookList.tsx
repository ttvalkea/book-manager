import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import { useBooks } from "./useBooks";

function BookList(): JSX.Element {
  const { books, triggerNextPageFetch } = useBooks();

  return (
    <InfiniteScroll
      dataLength={books.length}
      next={triggerNextPageFetch}
      hasMore={true} // TODO: useBooks hook needs to return whether there are more books to fetch or not.
      loader={<h4>Loading...</h4>}
    >
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "antiquewhite" }}>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Timestamp</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ backgroundColor: "ghostwhite" }}>
            {books.map((book, index) => (
              <TableRow key={`${book.title}-${index}`}>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.timestamp}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </InfiniteScroll>
  );
}

export default BookList;
