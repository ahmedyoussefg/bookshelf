import { Edit, Trash } from "lucide-react";
import type Book from "../types/Book";
import StarButton from "./StarButton";
interface Props {
  book: Book;
  onBookEdit: (book: Book) => void;
}

function BookListItem({ book, onBookEdit }: Props) {
  return (
    <div className="bg-white shadow-md rounded-xl border border-amber-200 p-4 flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-bold text-amber-900">{book.title}</h3>
        <p className="text-sm text-amber-700">by {book.author}</p>
        <p className="text-xs text-amber-600 mt-1 italic">{book.genre}</p>
        <p className="text-xs text-amber-700 mt-2">
          Status: <span className="font-medium">{book.readStatus}</span>
        </p>
        <p className="text-xs text-amber-700">
          Owned: {book.owned ? "✅" : "❌"}
        </p>
      </div>

      <div className="flex justify-between items-center mt-4">
        <StarButton
          initialStarred={book.starred}
          onToggle={(value) => {
            // TODO: update starred
            console.log(value);
          }}
        />
        <div className="flex gap-2">
          <button
            className="text-blue-600 cursor-pointer hover:text-blue-800"
            title="Edit"
            onClick={() => {
              onBookEdit(book);
            }}
          >
            <Edit className="h-5 w-5" />
          </button>
          <button
            className="text-red-600 cursor-pointer hover:text-red-800"
            title="Delete"
          >
            <Trash className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookListItem;
