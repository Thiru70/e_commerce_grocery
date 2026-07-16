import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user, logout } = useAuth();

  if (!user)
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 text-lg mb-4">Please login to view your profile.</p>
            <Link
              to="/login"
              className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700"
            >
              Login
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="max-w-2xl mx-auto px-6">
          <h1 className="text-3xl font-bold mb-6">My Profile</h1>

          <div className="bg-white p-8 rounded-xl shadow space-y-5">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-2xl font-bold text-emerald-600">
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <span className="text-sm bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full capitalize">
                  {user.role}
                </span>
              </div>
            </div>

            <hr />

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500">Email</span>
                <span className="font-medium">{user.email}</span>
              </div>
              {user.phone && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Phone</span>
                  <span className="font-medium">{user.phone}</span>
                </div>
              )}
            </div>

            <hr />

            <div className="flex gap-4">
              <Link
                to="/orders"
                className="flex-1 text-center border border-emerald-600 text-emerald-600 py-2 rounded-lg hover:bg-emerald-600 hover:text-white transition"
              >
                My Orders
              </Link>
              <button
                onClick={logout}
                className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
