import Header from "../components/Header";
import useAuth from "../hooks/useAuth";
import BookList from "../components/BookList";
import Button from "../components/Button";
import { useState } from "react";

function DashboardPage() {
  const { auth } = useAuth();
  const [showStarred, setShowStarred] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-amber-50">
      <Header username={auth?.username ?? "Guest"} />

      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-amber-900">
            {showStarred ? "Starred Books" : "Your Books"}
          </h2>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-amber-900 font-medium cursor-pointer">
              <input
                type="checkbox"
                checked={showStarred}
                onChange={(e) => setShowStarred(e.target.checked)}
                className="w-4 h-4 accent-amber-700 cursor-pointer"
              />
              Show starred only
            </label>

            <div className="w-32">
              <Button onClick={() => console.log("Add new book")}>
                + Add Book
              </Button>
            </div>
          </div>
        </div>

        <BookList />
      </div>
    </div>
  );
}

export default DashboardPage;
