import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/Auth";
import Spinner from "../components/Spinner";

const ForgotPassword = () => {
  const { requestPasswordReset, loading, error } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [validationError, setValidationError] = useState("");

  const validateForm = () => {
    const emailRegex = /.+@.+\..+/;
    if (!emailRegex.test(email)) {
      setValidationError("Please fill a valid email address");
      return false;
    }
    setValidationError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await requestPasswordReset(email);
        setMessage("Password reset link has been sent to your email.");
        setValidationError("");
      } catch (err) {
        console.log(err);
        setValidationError("Failed to send password reset link.");
        setMessage("");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
        {error.forgotPassword && (
          <p className="text-red-500 mb-4">{error.forgotPassword}</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {validationError && (
              <p className="text-red-500 mt-2">{validationError}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
            disabled={loading.forgotPassword}
          >
            {loading.forgotPassword ? <Spinner size="24px" color="#fff" /> : "Send Reset Link"}
          </button>
        </form>
        {message && <p className="text-green-500 mt-4">{message}</p>}
        <p className="mt-4 text-center">
          Remember your password?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
