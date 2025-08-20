import { Star, Edit, Trash } from "lucide-react";

interface Props {
  book: {
    id: number;
    title: string;
    author: string;
    genre: string;
    owned: boolean;
    readStatus: string;
    starred: boolean;
  };
}

function BookListItem({ book }: Props) {
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
        <button
          className="text-amber-600 cursor-pointer hover:text-amber-800"
          title={book.starred ? "Unstar" : "Star"}
        >
          {book.starred ? (
            <Star className="h-5 w-5 fill-amber-600" />
          ) : (
            <Star className="h-5 w-5 fill-white stroke-amber-600" />
          )}
        </button>

        <div className="flex gap-2">
          <button
            className="text-blue-600 cursor-pointer hover:text-blue-800"
            title="Edit"
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
