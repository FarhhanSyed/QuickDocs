import { useContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../context/Auth";
import { FaUserCircle, FaPencilAlt, FaSignOutAlt } from "react-icons/fa";
import { updateProfile, updatePassword } from "../redux/slices/user";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { user, setUser, logout } = useContext(AuthContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.user);

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [profileImage, setProfileImage] = useState(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationError, setValidationError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isProfileChanged, setIsProfileChanged] = useState(false);

  useEffect(() => {
    setIsProfileChanged(
      name !== user?.name || email !== user?.email || profileImage !== null
    );
  }, [name, email, profileImage, user]);

  useEffect(() => {
    if (!loading.updatePassword && !error.updatePassword) {
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  }, [loading.updatePassword, error.updatePassword]);

  const handleProfileImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const validateProfileForm = () => {
    if (name.length < 3 || name.length > 50) {
      setValidationError("Name must be between 3 and 50 characters long");
      return false;
    }
    const emailRegex = /.+@.+\..+/;
    if (!emailRegex.test(email)) {
      setValidationError("Please provide a valid email address");
      return false;
    }
    setValidationError("");
    return true;
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    if (validateProfileForm()) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      if (profileImage) {
        formData.append("profileImage", profileImage);
      }
      const result = await dispatch(updateProfile(formData));
      if (!result.error) {
        setUser({
          ...user,
          name,
          email,
          profileImage: result.payload.profileImage || user.profileImage,
        });
      }
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match");
      return;
    }
    setPasswordError("");
    const result = await dispatch(
      updatePassword({ currentPassword, newPassword })
    );
    if (!result.error) {
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
        <h1
          className="cursor-pointer text-xl font-semibold"
          onClick={() => navigate(-1)}
        >
          Quick Docs
        </h1>
        <div className="relative flex items-center space-x-4">
          <div className="cursor-pointer" onClick={logout}>
            <FaSignOutAlt size={24} />
          </div>
        </div>
      </header>

      <main className="flex-grow p-6 bg-gray-100 relative">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg grid gap-8">
          {/* Profile Section */}
          <div className="w-full">
            <h2 className="text-2xl font-bold mb-6 text-center">Profile</h2>
            {error.updateProfile && (
              <p className="text-red-500 mb-4 text-center">
                {error.updateProfile}
              </p>
            )}
            <form onSubmit={handleProfileUpdate}>
              <div className="mb-4 text-center relative">
                <label htmlFor="profileImage" className="cursor-pointer">
                  {profileImage ? (
                    <img
                      src={URL.createObjectURL(profileImage)}
                      alt="Profile"
                      className="w-24 h-24 rounded-full mx-auto border-2 border-blue-600"
                    />
                  ) : user?.profileImage ? (
                    <img
                      src={`/api/v1/${user.profileImage}`}
                      alt="Profile"
                      className="w-24 h-24 rounded-full mx-auto border-2 border-blue-600"
                    />
                  ) : (
                    <FaUserCircle size={96} className="mx-auto text-gray-500" />
                  )}
                  <FaPencilAlt className="text-gray-500 absolute bottom-0 right-0" />
                </label>
                <input
                  type="file"
                  id="profileImage"
                  className="hidden"
                  onChange={handleProfileImageChange}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                {validationError.includes("Name") && (
                  <p className="text-red-500 mt-2">{validationError}</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {validationError.includes("email") && (
                  <p className="text-red-500 mt-2">{validationError}</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                disabled={loading.updateProfile || !isProfileChanged}
              >
                {loading.updateProfile ? (
                  <Spinner size="24px" color="#fff" />
                ) : (
                  "Update Profile"
                )}
              </button>
            </form>
          </div>

          {/* Password Update Section */}
          <div className="w-full">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Update Password
            </h2>
            {error.updatePassword && (
              <p className="text-red-500 mb-4 text-center">
                {error.updatePassword}
              </p>
            )}
            <form onSubmit={handlePasswordUpdate}>
              <div className="mb-4">
                <label
                  htmlFor="currentPassword"
                  className="block text-gray-700 mb-2"
                >
                  Current Password
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="newPassword"
                  className="block text-gray-700 mb-2"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="confirmPassword"
                  className="block text-gray-700 mb-2"
                >
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                {passwordError && (
                  <p className="text-red-500 mt-2">{passwordError}</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                disabled={loading.updatePassword}
              >
                {loading.updatePassword ? (
                  <Spinner size="24px" color="#fff" />
                ) : (
                  "Update Password"
                )}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Profile;
