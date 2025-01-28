// client/src/App.jsx
import { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthContext } from "./context/Auth.jsx";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";
import Home from "./pages/Home";
import Spinner from "./components/Spinner";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import NotFound from "./components/NotFound.jsx";
import UploadDocument from "./pages/UploadDocument";
import ShareDocument from "./pages/ShareDocument";

function App() {
  const { loading } = useContext(AuthContext);

  if (loading.user) {
    return <Spinner />;
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<PublicRoute element={<Login />} />} />
        <Route path="/signup" element={<PublicRoute element={<Signup />} />} />
        <Route
          path="/forgot-password"
          element={<PublicRoute element={<ForgotPassword />} />}
        />
        <Route
          path="/reset-password/:token"
          element={<PublicRoute element={<ResetPassword />} />}
        />

        {/* Protected Route */}
        <Route path="/" element={<PrivateRoute element={<Home />} />} />
        <Route
          path="/upload-document"
          element={<PrivateRoute element={<UploadDocument />} />}
        />
        <Route
          path="/share-document"
          element={<PrivateRoute element={<ShareDocument />} />}
        />
        {/* 404 Not Found Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
