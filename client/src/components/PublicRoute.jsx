// client/src/components/PublicRoute.jsx
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/Auth";
import Spinner from "./Spinner";

export default function PublicRoute({ element }) {
  const { user, loading } = useContext(AuthContext);

  if (loading.user) {
    return <Spinner />;
  }

  // Redirect authenticated users to the home page
  return user ? <Navigate to="/" replace /> : element;
}