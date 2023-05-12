import { Container, Typography } from "@mui/material";
import BookList from "./BookList";

function App(): JSX.Element {
  return (
    <Container>
      <Typography variant="h1" marginBottom={2}>
        Book manager
      </Typography>
      <BookList />
    </Container>
  );
}

export default App;
