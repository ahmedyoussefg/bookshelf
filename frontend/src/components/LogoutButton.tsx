import { useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";

function LogoutButton() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth(undefined);
    localStorage.removeItem("auth");
    navigate("/login", { replace: true });
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 rounded-xl bg-amber-600 text-white font-semibold hover:bg-amber-700 hover:cursor-pointer transition"
    >
      Log Out
    </button>
  );
}

export default LogoutButton;
