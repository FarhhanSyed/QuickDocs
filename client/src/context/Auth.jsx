import { useState, useEffect, createContext } from "react";
import axios from "axios";

// eslint-disable-next-line
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState({
    user: true,
    signup: false,
    login: false,
    logout: false,
    forgotPassword: false,
    resetPassword: false,
  });
  const [error, setError] = useState({
    user: null,
    signup: null,
    login: null,
    logout: null,
    forgotPassword: null,
    resetPassword: null,
  });

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const res = await axios.get("/api/v1/auth/me", {
          withCredentials: true,
        });
        setUser(res.data.user);
      } catch (err) {
        setUser(null);
        setError((prev) => ({ ...prev, user: err.response.data.message }));
      } finally {
        setLoading((prev) => ({ ...prev, user: false }));
      }
    };

    checkUserLoggedIn();
  }, []);

  const signup = async (name, email, password) => {
    setLoading((prev) => ({ ...prev, signup: true }));
    try {
      const res = await axios.post("/api/v1/auth/signup", {
        name,
        email,
        password,
      });
      setUser(res.data.user);
    } catch (err) {
      setError((prev) => ({ ...prev, signup: err.response.data.message }));
    } finally {
      setLoading((prev) => ({ ...prev, signup: false }));
    }
  };

  const login = async (email, password) => {
    setLoading((prev) => ({ ...prev, login: true }));
    try {
      const res = await axios.post("/api/v1/auth/login", { email, password });
      setUser(res.data.user);
    } catch (err) {
      setError((prev) => ({ ...prev, login: err.response.data.message }));
    } finally {
      setLoading((prev) => ({ ...prev, login: false }));
    }
  };

  const logout = async () => {
    setLoading((prev) => ({ ...prev, logout: true }));
    try {
      await axios.post("/api/v1/auth/logout");
      setUser(null);
    } catch (err) {
      setError((prev) => ({ ...prev, logout: err.response.data.message }));
    } finally {
      setLoading((prev) => ({ ...prev, logout: false }));
    }
  };

  const forgotPassword = async (email) => {
    setLoading((prev) => ({ ...prev, forgotPassword: true }));
    try {
      await axios.post("/api/v1/auth/request-password-reset", { email });
    } catch (err) {
      setError((prev) => ({
        ...prev,
        forgotPassword: err.response.data.message,
      }));
    } finally {
      setLoading((prev) => ({ ...prev, forgotPassword: false }));
    }
  };

  const resetPassword = async (token, newPassword) => {
    setLoading((prev) => ({ ...prev, resetPassword: true }));
    try {
      await axios.post(`/api/v1/auth/reset-password/${token}`, { newPassword });
    } catch (err) {
      setError((prev) => ({
        ...prev,
        resetPassword: err.response.data.message,
      }));
    } finally {
      setLoading((prev) => ({ ...prev, resetPassword: false }));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        error,
        signup,
        login,
        logout,
        forgotPassword,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
