import { Box, Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { useBooks } from "./useBooks";

// TODO: Tests for this component

function BookForm(): JSX.Element {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const { addNewBook, loading } = useBooks();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    addNewBook({ title, author: author === "" ? null : author });

    setTitle("");
    setAuthor("");
  }

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack spacing={1} direction="row">
        <TextField
          required
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
        >
          Add book
        </Button>
      </Stack>
    </Box>
  );
}

export default BookForm;
