import { useState, useEffect } from "react";

export interface Book {
  title: string;
  author: string;
  timestamp: string;
}

export interface UseBooksResult {
  books: Book[];
  loading: boolean;
}

export function useBooks(): UseBooksResult {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchBookList() {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3001/books`, {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const result = await response.json();

        setBooks(result);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }

    void fetchBookList();
  }, []);

  return { books, loading };
}
