import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getDocuments } from "../redux/slices/document"; // Adjust the import path as necessary
import Spinner from "../components/Spinner";

function ShareDocument() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { documents, loading, error } = useSelector((state) => state.document);
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [accessType, setAccessType] = useState("");
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    dispatch(getDocuments());
  }, [dispatch]);

  const handleDocumentSelection = (docId) => {
    setSelectedDocuments((prevSelected) =>
      prevSelected.includes(docId)
        ? prevSelected.filter((id) => id !== docId)
        : [...prevSelected, docId]
    );
  };

  const validateForm = () => {
    if (!accessType) {
      setValidationError("Please select an access type");
      return false;
    }
    if (selectedDocuments.length === 0) {
      setValidationError("Please select at least one document");
      return false;
    }
    setValidationError("");
    return true;
  };

  const handleShare = () => {
    if (validateForm()) {
      console.log(
        `Sharing documents ${selectedDocuments.join(
          ", "
        )} with ${accessType} access`
      );
      // Implement the logic to send the request to the backend
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl cursor-pointer" onClick={handleBack}>
          Quick Docs
        </h1>
      </div>
      <div className="p-4 flex-grow">
        <h2 className="text-xl mb-4">Share Document</h2>
        {loading.get ? (
          <Spinner />
        ) : error.get ? (
          <p className="text-red-500">{error.get}</p>
        ) : documents.length === 0 ? (
          <p>No documents found.</p>
        ) : (
          <div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="accessType">
                Select Access Type
              </label>
              <select
                id="accessType"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={accessType}
                onChange={(e) => setAccessType(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select access type
                </option>
                <option value="read-only">Read Only</option>
                <option value="print-only">Print Only</option>
              </select>
              {validationError.includes("access type") && (
                <p className="text-red-500 mt-2">{validationError}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Select Documents
              </label>
              {documents.map((doc) => (
                <div key={doc._id} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={doc._id}
                    className="mr-2"
                    checked={selectedDocuments.includes(doc._id)}
                    onChange={() => handleDocumentSelection(doc._id)}
                  />
                  <label htmlFor={doc._id} className="flex-grow">
                    {doc.name}
                  </label>
                </div>
              ))}
              {validationError.includes("document") && (
                <p className="text-red-500 mt-2">{validationError}</p>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="p-4 flex justify-between">
        <button
          onClick={handleBack}
          className="bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-200"
        >
          Back
        </button>
        <button
          onClick={handleShare}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Share
        </button>
      </div>
    </div>
  );
}

export default ShareDocument;
