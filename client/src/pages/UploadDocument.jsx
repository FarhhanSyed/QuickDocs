import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDocument } from "../redux/slices/document";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";

function UploadDocument() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.document);
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [metadata, setMetadata] = useState({});
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setMetadata({
        type: selectedFile.type,
        size: selectedFile.size, // Size in bytes
        lastModified: selectedFile.lastModified, // Timestamp
        name: selectedFile.name, // Original file name
      });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const selectedFile = e.dataTransfer.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setMetadata({
        type: selectedFile.type,
        size: selectedFile.size, // Size in bytes
        lastModified: selectedFile.lastModified, // Timestamp
        name: selectedFile.name, // Original file name
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("file", file);
    formData.append("metadata", JSON.stringify(metadata));

    dispatch(createDocument(formData)).then(() => {
      setName("");
      setFile(null);
      setMetadata({});
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl">Quick Docs</h1>
      </div>
      <div className="flex-grow p-4 flex items-center justify-center bg-gray-100">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Upload Document
          </h2>
          {error.create && <p className="text-red-500 mb-4">{error.create}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="name">
                Document Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            {!file && (
              <div
                className={`mb-4 border-2 border-dashed rounded-lg p-4 text-center ${
                  isDragging ? "border-blue-500 bg-blue-100" : "border-gray-300"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <label className="block text-gray-700 mb-2" htmlFor="file">
                  Upload File
                </label>
                <input
                  type="file"
                  id="file"
                  className="hidden"
                  onChange={handleFileChange}
                  required
                />
                <p className="text-gray-600">
                  {isDragging
                    ? "Drop the file here..."
                    : "Drag and drop a file here, or click to select a file"}
                </p>
              </div>
            )}
            <div className="mb-4">
              <h3 className="text-gray-700 font-semibold">File Metadata</h3>
              {file && (
                <ul className="text-sm text-gray-600">
                  <li>
                    <strong>Name:</strong> {metadata.name}
                  </li>
                  <li>
                    <strong>Type:</strong> {metadata.type}
                  </li>
                  <li>
                    <strong>Size:</strong> {(metadata.size / 1024).toFixed(2)}{" "}
                    KB
                  </li>
                  <li>
                    <strong>Last Modified:</strong>{" "}
                    {new Date(metadata.lastModified).toLocaleString()}
                  </li>
                </ul>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
              disabled={loading.create}
            >
              {loading.create ? <Spinner size="24px" color="#fff" /> : "Upload"}
            </button>
          </form>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition duration-200"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default UploadDocument;
