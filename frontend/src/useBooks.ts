import { useState, useEffect, useCallback } from "react";

export interface Book {
  title: string;
  author: string;
  timestamp: string;
}

export interface UseBooksResult {
  books: Book[];
  triggerNextPageFetch: () => void;
}

export function useBooks(): UseBooksResult {
  const [pageWanted, setPageWanted] = useState(0);
  const [lastFetchedPage, setLastFetchedPage] = useState(-1);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  function triggerNextPageFetch() {
    setPageWanted(pageWanted + 1);
  }

  const fetchBooksPage = useCallback(
    async (page: number) => {
      if (pageWanted !== lastFetchedPage && !loading) {
        try {
          setLoading(true);
          const response = await fetch(
            `http://localhost:3001/books?page=${page}`,
            {
              method: "GET",
              mode: "cors",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const result = await response.json();

          setBooks([...books, ...result]);
          setLoading(false);
          setLastFetchedPage(pageWanted);
        } catch (error) {
          setLoading(false);
        }
      }
    },
    [books, lastFetchedPage, pageWanted, loading]
  );

  useEffect(() => {
    void fetchBooksPage(pageWanted);
  }, [pageWanted, fetchBooksPage]);

  return { books, triggerNextPageFetch };
}
