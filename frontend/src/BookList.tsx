import { useBooks } from "./useBooks";

function BookList(): JSX.Element {
  const { books, loading } = useBooks();

  if (loading) {
    return <div>Loading</div>;
  }
  return (
    <table>
      <thead></thead>
      <tr>
        <th>Title</th>
        <th>Author</th>
        <th>Timestamp</th>
      </tr>
      {books.map((book, index) => (
        <tr key={`${book.title}-${index}`}>
          <td>{book.title}</td>
          <td>{book.author}</td>
          <td>{book.timestamp}</td>
        </tr>
      ))}
    </table>
  );
}

export default BookList;
