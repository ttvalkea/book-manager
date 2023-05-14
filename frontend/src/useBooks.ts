import { useState, useEffect, useCallback } from "react";
import { BookWithoutTimestamp, createBook, getPageOfBooks } from "./api";
import { useBooksContext } from "./useBooksContext";

export interface UseBooksResult {
  loading: boolean;
  triggerNextPageFetch: () => void;
  addNewBook: (book: BookWithoutTimestamp) => Promise<void>;
}

// TODO: Tests for this hook

export function useBooks(): UseBooksResult {
  const [pageWanted, setPageWanted] = useState(0);
  const [lastFetchedPage, setLastFetchedPage] = useState(-1);
  const { books, setBooks } = useBooksContext();
  const [loading, setLoading] = useState(false); // TODO: loading state could be in BooksContext. Now loading state isn't shared between different users of useBooks hook.

  function triggerNextPageFetch() {
    setPageWanted(pageWanted + 1);
  }

  const fetchNextPageOfBooks = useCallback(
    async (page: number) => {
      if (pageWanted !== lastFetchedPage && !loading) {
        try {
          setLoading(true);

          const pageOfBooks = await getPageOfBooks(page);

          setBooks([...books, ...pageOfBooks]);
          setLastFetchedPage(pageWanted);
          setLoading(false);
        } catch (error) {
          //TODO: Error handling. Show a toast.
          setLoading(false);
        }
      }
    },
    [books, lastFetchedPage, pageWanted, loading, setBooks]
  );

  const addNewBook = useCallback(
    async (book: BookWithoutTimestamp) => {
      try {
        setLoading(true);

        const newBook = await createBook(book);

        // After user creates a new book, it's appended to the top of the list in the UI.
        setBooks([newBook, ...books]);
        // TODO: There's a problem with this. After appending, when user scrolls down, the page they receive has the last book from the previous page as its first book.
        // To fix this problem of a duplicate being shown on the list, one option could be to check each book we receive from the API, and only add it to the
        // list if it doesn't exist there already.

        setLoading(false);
      } catch (error) {
        //TODO: Error handling. Show a toast.
        setLoading(false);
      }
    },
    [books, setBooks]
  );

  useEffect(() => {
    void fetchNextPageOfBooks(pageWanted);
  }, [pageWanted, fetchNextPageOfBooks]);

  return { loading, triggerNextPageFetch, addNewBook };
}
