import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Html5QrcodeScanner } from "html5-qrcode";

const ScanQRCode = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const qrRef = useRef(null);
  const scannerRef = useRef(null);

  useEffect(() => {
    if (!qrRef.current || scannerRef.current) return;

    // Increase QR box size and adjust FPS
    scannerRef.current = new Html5QrcodeScanner("reader", {
      fps: 10, // Adjusted FPS for better stability
      qrbox: 300, // Increased box size for better detection
      aspectRatio: 1, // Aspect ratio for the scanning area
      disableFlip: false, // Allow flipping if necessary
    });

    // Start the QR scanner
    scannerRef.current.render(
      (decodedText) => {
        // Successfully scanned, navigate to the shared document page
        scannerRef.current.clear(); // Stop the scanner after successful scan
        navigate(`/shared-documents/${decodedText}`);
      },
      (error) => {
        // Handle scanning error
        setErrorMessage("QR Code scan error: " + error);
        console.warn("QR Code scan error:", error);
      }
    );

    // Cleanup function to stop scanner when component unmounts
    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear();
        scannerRef.current = null;
      }
    };
  }, [navigate]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="bg-blue-600 text-white p-4 flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-xl">Quick Docs</h1>
      </div>
      <div className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold mb-6">Scan QR Code</h2>

          <div id="reader" ref={qrRef} className="w-full max-w-md h-[300px]" />

          <p className="mt-4 text-gray-700">
            Scan the QR code to access the shared document.
          </p>

          {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}

          <button
            onClick={() => navigate(-1)} // Go back to previous page
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
