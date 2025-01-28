import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/Auth";
import Spinner from "./Spinner";

export default function PrivateRoute({ element }) {
  const { user, loading } = useContext(AuthContext);

  if (loading.user) {
    return <Spinner />;
  }

  // Render protected component or redirect to login if not authenticated
  return user ? element : <Navigate to="/login" replace />;
}
