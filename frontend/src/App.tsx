import { Route, Routes } from "react-router";
import LoginPage from "./routes/LoginPage";
import RegisterPage from "./routes/RegisterPage";
import DashboardPage from "./routes/DashboardPage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/register" element={<RegisterPage />}></Route>
      <Route path="/dashboard" element={<DashboardPage />}></Route>
    </Routes>
  );
}

export default App;
