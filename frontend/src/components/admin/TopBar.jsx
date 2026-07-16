import { FaBell, FaUserCircle } from "react-icons/fa";

const Topbar = () => {
  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">

      <h1 className="text-2xl font-bold">
        Admin Dashboard
      </h1>

      <div className="flex items-center gap-6">

        <button className="relative">
          <FaBell className="text-2xl text-gray-600" />

          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
            3
          </span>
        </button>

        <div className="flex items-center gap-2">

          <FaUserCircle className="text-3xl text-emerald-700" />

          <span className="font-semibold">
            Admin
          </span>

        </div>

      </div>

    </header>
  );
};

export default Topbar;