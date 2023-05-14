import { useContext } from "react";
import { BooksContext, BooksContextProps } from "./BooksContext";

export function useBooksContext(): BooksContextProps {
  const context = useContext(BooksContext);
  if (context === null) {
    throw new Error("BooksContext is not initialized");
  }
  return context;
}
