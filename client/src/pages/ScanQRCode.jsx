import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import QrReader from "react-qr-scanner";

const ScanQRCode = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [isScannerActive, setIsScannerActive] = useState(false);

  const handleScan = (data) => {
    if (data && data.text) {
      console.log("QR Code detected:", data.text);
      navigate(`/shared-documents/${data.text}`);
    }
  };

  const handleError = (err) => {
    setErrorMessage(err.message);
    console.warn("QR Code scan error:", err);
  };

  useEffect(() => {
    // Ensure the scanner is active once the component is mounted
    setIsScannerActive(true);
    return () => {
      setIsScannerActive(false);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="bg-blue-600 text-white p-4 flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-xl">Quick Docs</h1>
      </div>
      <div className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold mb-6">Scan QR Code</h2>

          {isScannerActive ? (
            <QrReader
              delay={300} // Delay before scanning starts
              onError={handleError} // Handle errors
              onScan={handleScan} // Handle successful scans
              style={{
                width: "100%",
                maxWidth: "400px", // Limit the width for responsiveness
                height: "auto",
              }}
            />
          ) : (
            <p>Scanner is loading...</p>
          )}

          <p className="mt-4 text-gray-700">
            Scan the QR code to access the shared document.
          </p>

          {errorMessage && (
            <p className="text-red-500 mt-2">{errorMessage}</p> // Display error message if any
          )}

          <button
            onClick={() => navigate(-1)} // Navigate back to previous page
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScanQRCode;
