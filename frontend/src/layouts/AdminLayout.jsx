import { Outlet } from "react-router-dom";
import SideBar from "../components/admin/SideBar";
import TopBar from "../components/admin/TopBar";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <SideBar />

      <div className="flex-1 flex flex-col">
        <TopBar />

        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;