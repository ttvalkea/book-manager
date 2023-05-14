import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from "react";
import { Book } from "./api";

export interface BooksContextProps {
  books: Book[];
  setBooks: Dispatch<SetStateAction<Book[]>>;
}

export const BooksContext = createContext<BooksContextProps | null>(null);

export function BooksContextProvider({
  children,
}: PropsWithChildren): JSX.Element {
  const [books, setBooks] = useState<Book[]>([]);

  const context: BooksContextProps = { books, setBooks };

  return (
    <BooksContext.Provider value={context}>{children}</BooksContext.Provider>
  );
}
