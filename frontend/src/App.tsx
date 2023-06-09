import { Container, Typography, Stack } from "@mui/material";
import { ToastContainer } from "material-react-toastify";
import BookForm from "./BookForm";
import BookList from "./BookList";
import { BooksContextProvider } from "./BooksContext";

function App(): JSX.Element {
  return (
    <Container>
      <ToastContainer />
      <Stack spacing={4}>
        <Typography variant="h1">Book manager!</Typography>
        <BooksContextProvider>
          <BookForm />
          <BookList />
        </BooksContextProvider>
      </Stack>
    </Container>
  );
}

export default App;
