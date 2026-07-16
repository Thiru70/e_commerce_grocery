import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaWarehouse,
  FaShoppingBag,
  FaUsers,
  FaTruck,
  FaLock,
  FaClipboardList,
} from "react-icons/fa";

const Sidebar = () => {
  const menus = [
    { name: "Dashboard", path: "/admin", icon: <FaTachometerAlt /> },
    { name: "Products", path: "/admin/products", icon: <FaBoxOpen /> },
    { name: "Inventory", path: "/admin/inventory", icon: <FaWarehouse /> },
    { name: "Orders", path: "/admin/orders", icon: <FaShoppingBag /> },
    { name: "Users", path: "/admin/users", icon: <FaUsers /> },
    { name: "Delivery", path: "/admin/delivery", icon: <FaTruck /> },
    { name: "Lock Monitor", path: "/admin/locks", icon: <FaLock /> },
    { name: "Audit Logs", path: "/admin/logs", icon: <FaClipboardList /> },
  ];

  return (
    <aside className="w-64 bg-emerald-700 text-white min-h-screen">

      <div className="text-3xl font-bold text-center py-6 border-b border-emerald-600">
        FreshMart
      </div>

      <nav className="mt-6">

        {menus.map((menu) => (
          <NavLink
            key={menu.name}
            to={menu.path}
            end={menu.path === "/admin"}
            className={({ isActive }) =>
              `flex items-center gap-4 px-6 py-4 transition ${
                isActive
                  ? "bg-white text-emerald-700 font-semibold"
                  : "hover:bg-emerald-600"
              }`
            }
          >
            <span>{menu.icon}</span>
            <span>{menu.name}</span>
          </NavLink>
        ))}

      </nav>
    </aside>
  );
};

export default Sidebar;