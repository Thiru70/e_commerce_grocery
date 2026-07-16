import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaTruck, FaListAlt, FaHistory, FaSignOutAlt } from "react-icons/fa";

const DeliveryLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-emerald-700 text-white flex flex-col">
        <div className="p-6 border-b border-emerald-600">
          <div className="flex items-center gap-3">
            <FaTruck className="text-2xl" />
            <div>
              <h2 className="font-bold text-lg">FreshMart</h2>
              <p className="text-emerald-200 text-sm">Delivery Portal</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Link
            to="/delivery"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-emerald-600 transition-colors"
          >
            <FaTruck />
            Dashboard
          </Link>
          <Link
            to="/delivery/orders"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-emerald-600 transition-colors"
          >
            <FaListAlt />
            My Orders
          </Link>
          <Link
            to="/delivery/history"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-emerald-600 transition-colors"
          >
            <FaHistory />
            History
          </Link>
        </nav>

        <div className="p-4 border-t border-emerald-600">
          <p className="text-sm text-emerald-200 mb-3">
            {user?.name || "Delivery Agent"}
          </p>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-emerald-200 hover:text-white transition-colors"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm px-6 py-4">
          <h1 className="text-xl font-semibold text-gray-800">
            Delivery Dashboard
          </h1>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DeliveryLayout;
