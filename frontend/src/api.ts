export interface Book {
  title: string;
  author: string | null;
  timestamp: string;
}

export type BookWithoutTimestamp = Omit<Book, "timestamp">;

const host = process.env.REACT_APP_API_URL;

export async function createBook(book: BookWithoutTimestamp): Promise<Book> {
  const response = await fetch(`${host}/book`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json(); // TODO: Maybe add decoder here to check the received result is actually in the form of a Book
}

export async function getPageOfBooks(page: number): Promise<Book[]> {
  const response = await fetch(`${host}/books?page=${page}`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await response.json();
  return result; // TODO: Maybe add decoder here to check the received result is actually in the form of a Book
}
