import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { validateAccess } from "../redux/slices/document";
import Spinner from "../components/Spinner";
import Document from "../components/Document";

const ValidateAccess = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sharedDocuments, loading, error } = useSelector(
    (state) => state.document
  );
  const [pin, setPin] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(validateAccess({ token, pin }));
  };

  useEffect(() => {
    if (error.validateAccess) {
      // Handle the error, e.g., navigate away, show message, etc.
      alert(
        "Error: " +
          (typeof error.validateAccess === "object"
            ? error.validateAccess.message || "An error occurred."
            : error.validateAccess)
      );
      navigate("/");
    }
  }, [error, navigate]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-blue-600 text-white p-4 flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-xl">Quick Docs</h1>
      </div>
      <div className="flex-grow p-4 flex flex-col items-center">
        <h2 className="text-xl mb-4">Validate Access</h2>
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="pin">
              Enter PIN
            </label>
            <input
              type="text"
              id="pin"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
            disabled={loading.validateAccess}
          >
            {loading.validateAccess ? (
              <Spinner size="24px" color="#fff" />
            ) : (
              "Validate"
            )}
          </button>
        </form>

        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-white text-blue-600 py-1 px-3 rounded-lg hover:bg-gray-200 transition duration-200"
        >
          Back
        </button>

        {error.validateAccess && (
          <p className="text-red-500 mt-4">
            {typeof error.validateAccess === "object"
              ? error.validateAccess.message || "An error occurred."
              : error.validateAccess}
          </p>
        )}

        {sharedDocuments.length > 0 && !loading.validateAccess && (
          <div className="mt-4 w-full">
            {sharedDocuments.map((doc) => (
              <Document key={doc._id} doc={doc.doc} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ValidateAccess;
