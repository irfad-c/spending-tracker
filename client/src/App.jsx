import "./App.css";
import {
  BrowserRouter as BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Transactions from "./pages/Transactions";
import { AuthProvider } from "./context/AuthContext.jsx";
import Categories from "./pages/Categories.jsx";
import Settings from "./pages/Settings.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ProtectedRoute from "./components/protectedRoute.jsx";
import LoginNavbar from "./components/LoginNavbar.jsx";
import ProtectedLayout from "./components/ProtectedLayout.jsx";

function App() {
  return (
    <>
      {/*client side routing using react router
      React Router just swaps the component shown inside <Routes>
      React Router → Manages navigation between pages (URL → which component should render). */}
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Pages (Show Login Navbar)
            Hey, render <LoginNavbar /> and then inside it, show either <Login /> or <Register /> where the <Outlet /> is */}
            <Route element={<LoginNavbar />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>

            {/* Protected Pages */}
            <Route element={<ProtectedRoute />}>
              <Route element={<ProtectedLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/settings" element={<Settings />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
