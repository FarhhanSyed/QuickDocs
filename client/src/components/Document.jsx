import { useState } from "react";
import { FaFilePdf } from "react-icons/fa";

const Document = ({ doc }) => {
  const [isMetadataVisible, setIsMetadataVisible] = useState(true);

  if (!doc) {
    return (
      <div className="w-full p-4 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold">Invalid Document</h2>
        <p className="text-gray-500">Please provide a valid document object.</p>
      </div>
    );
  }

  const { name, path, createdAt, metadata } = doc;

  return (
    <div className="w-full p-4 bg-white shadow-md rounded-lg relative">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <FaFilePdf className="text-red-500" size={24} />
          <div>
            <h2 className="text-2xl font-bold">{name}</h2>
            <p className="text-gray-600">
              {new Date(createdAt).toLocaleString()}
            </p>
          </div>
        </div>
        <div className="text-right">
          <h3 className="text-lg font-semibold">Metadata</h3>
          <button
            onClick={() => setIsMetadataVisible(!isMetadataVisible)}
            className="text-blue-500 hover:text-blue-600"
          >
            {isMetadataVisible ? "Hide Metadata" : "Show Metadata"}
          </button>
          {isMetadataVisible && (
            <div className="mt-2 space-y-1">
              {metadata ? (
                Object.entries(metadata).map(([key, value]) => (
                  <div key={key} className="text-sm text-gray-600">
                    <span className="font-medium">{key}: </span>
                    <span>{value}</span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No metadata available</p>
              )}
            </div>
          )}
        </div>
      </div>
      <a
        href={`/api/v1/${path}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center text-blue-500 hover:text-blue-600"
      >
        Open in Browser
      </a>
    </div>
  );
};

export default Document;
