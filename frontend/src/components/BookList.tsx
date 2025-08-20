import BookListItem from "./BookListItem";

const dummyBooks = [
  {
    id: 1,
    title: "Harry Potter",
    author: "J.K. Rowling",
    genre: "Drama",
    owned: true,
    readStatus: "Finished",
    starred: true,
  },
  {
    id: 2,
    title: "Clean Code",
    author: "Robert C. Martin",
    genre: "Programming",
    owned: false,
    readStatus: "Reading",
    starred: false,
  },
];

function BookList() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {dummyBooks.map((book) => (
        <BookListItem key={book.id} book={book} />
      ))}
    </div>
  );
}

export default BookList;
