import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Context/firebase/firebase.config";
import { updateProfile } from "firebase/auth";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import Loading from '../Components/Loading';

const Profile = () => {
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [error, setError] = useState(null);

  if (loading) return <p className="text-center mt-10"> < Loading /> </p>;
  if (!user) return <Navigate to="/login" replace />;

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(user, {
        displayName: name || user.displayName,
        photoURL: photoURL || user.photoURL,
      });

      toast.success("Profile updated successfully!");
      setName("");
      setPhotoURL("");
    } catch (err) {
      setError(err.message);
      toast.error("Failed to update profile!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-100 to-purple-200 flex items-center justify-center p-4">
      <Helmet>
        <title>Profile | Event Explorer</title>
      </Helmet>

      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white/90 backdrop-blur-xl shadow-xl rounded-xl overflow-hidden">
        {/* Image Side */}
        <div className="w-full md:w-1/2 h-64 md:h-auto">
          <img
            src="https://i.ibb.co/0ydf9XPm/sign-up.jpg"
            alt="Profile Visual"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Profile Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-12">
          <div className="w-full max-w-sm space-y-6">
            <div className="text-center space-y-3">
              <img
                src={user?.photoURL || "https://i.ibb.co/5r5C1fJ/user.png"}
                alt="Profile"
                className="w-24 h-24 rounded-full mx-auto border-4 border-primary object-cover"
              />
              <h2 className="text-2xl font-bold text-blue-600">{user?.displayName || "Anonymous"}</h2>
              <p className="text-gray-600 text-sm">{user.email}</p>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}

              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
                  Update Name
                </label>
                <input
                  id="name"
                  type="text"
                  className="input input-bordered w-full"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter new name"
                />
              </div>

              <div>
                <label htmlFor="photoURL" className="block text-sm font-semibold text-gray-700 mb-1">
                  Update Photo URL
                </label>
                <input
                  id="photoURL"
                  type="url"
                  className="input input-bordered w-full"
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                  placeholder="Enter new photo URL"
                />
              </div>

              <button type="submit" className="btn btn-primary w-full mt-2">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
