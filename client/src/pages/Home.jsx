import { useContext, useState } from "react";
import { AuthContext } from "../context/Auth";
import { FaUserCircle, FaUpload, FaShareSquare } from "react-icons/fa";

function Home() {
  const { user, logout } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const documents = ["document 1", "document 2"];

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl">Quick Docs</h1>
        <div
          className="relative cursor-pointer"
          onMouseEnter={toggleDropdown}
          onMouseLeave={toggleDropdown}
        >
          <FaUserCircle size={24} />
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-fit bg-white text-black rounded-lg shadow-lg">
              <div className="p-4 border-b border-gray-300">
                <p className="font-bold">{user?.name}</p>
                <p>{user?.email}</p>
              </div>
              <div
                className="p-4 cursor-pointer hover:bg-gray-200"
                onClick={logout}
              >
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
      <ul className="flex-grow list-none p-0">
        {documents.map((doc, index) => (
          <li key={index} className="p-4 border-b border-gray-300">
            {doc}
          </li>
        ))}
      </ul>
      <div className="bg-blue-600 text-white p-4 flex justify-around fixed bottom-0 w-full">
        <div className="cursor-pointer flex flex-col items-center">
          <FaUpload size={24} />
          <p className="m-0">Upload</p>
        </div>
        <div className="cursor-pointer flex flex-col items-center">
          <FaShareSquare size={24} />
          <p className="m-0">Share</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
