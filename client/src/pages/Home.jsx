import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../context/Auth";
import {
  FaUserCircle,
  FaUpload,
  FaShareSquare,
  FaQrcode,
  FaSignOutAlt,
} from "react-icons/fa";
import { getDocuments } from "../redux/slices/document";
import Spinner from "../components/Spinner";
import Document from "../components/Document";
import { Link } from "react-router-dom";

function Home() {
  const { user, logout } = useContext(AuthContext);
  const dispatch = useDispatch();
  const { documents, loading, error } = useSelector((state) => state.document);

  useEffect(() => {
    dispatch(getDocuments());
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-blue-600 text-white p-4 flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-xl">Quick Docs</h1>
        <div className="relative flex items-center space-x-4">
          <Link to="/profile" className="relative cursor-pointer group">
            <FaUserCircle size={24} />
            <div className="absolute right-0 mt-2 w-fit bg-white text-black rounded-lg shadow-lg z-10 hidden group-hover:block">
              <div className="p-4 border-b border-gray-300">
                <p className="font-bold">{user?.name}</p>
                <p>{user?.email}</p>
              </div>
            </div>
          </Link>
          <div className="cursor-pointer" onClick={logout}>
            <FaSignOutAlt size={24} />
          </div>
        </div>
      </div>
      <div className="flex-grow p-4">
        {loading.get ? (
          <Spinner />
        ) : error.get ? (
          <p className="text-red-500">{error.get}</p>
        ) : documents.length === 0 ? (
          <p>No documents found.</p>
        ) : (
          documents.map((doc) => <Document key={doc._id} doc={doc} />)
        )}
      </div>
      <div className="bg-blue-600 text-white p-4 flex justify-around fixed bottom-0 w-full">
        <Link
          to="/upload-document"
          className="cursor-pointer flex flex-col items-center"
        >
          <FaUpload size={24} />
          <p className="m-0">Upload</p>
        </Link>
        <Link
          to="/share-document"
          className="cursor-pointer flex flex-col items-center"
        >
          <FaShareSquare size={24} />
          <p className="m-0">Share</p>
        </Link>
        <Link
          to="/scan-qr-code"
          className="cursor-pointer flex flex-col items-center"
        >
          <FaQrcode size={24} />
          <p className="m-0">Access</p>
        </Link>
      </div>
    </div>
  );
}

export default Home;
