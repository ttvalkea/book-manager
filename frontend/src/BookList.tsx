import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useBooks } from "./useBooks";

function BookList(): JSX.Element {
  const { books, loading } = useBooks();

  if (loading) {
    return <div>Loading</div>;
  }

  return (
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
  );
}

export default BookList;
