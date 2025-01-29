import QRCode from "react-qr-code";
import { useLocation, useNavigate } from "react-router-dom";

const GeneratedQRCode = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { token } = location.state || {};

  if (!token) {
    navigate("/share-document");
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="bg-blue-600 text-white p-4 flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-xl">Quick Docs</h1>
      </div>
      <div className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold mb-6">Share Document QR Code</h2>
          <div className="flex justify-center mb-4">
            <QRCode value={token} size={256} />
          </div>
          <p className="mt-4 text-gray-700">
            Scan this QR code to access the shared document.
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-200 mt-6"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeneratedQRCode;
