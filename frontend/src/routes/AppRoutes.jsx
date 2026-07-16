import { Routes, Route } from "react-router-dom";

// Layouts
import AdminLayout from "../layouts/AdminLayout";
import DeliveryLayout from "../layouts/DeliveryLayout";
import MainLayout from "../layouts/MainLayout";

// Customer Pages
import Home from "../pages/Home";
import Products from "../pages/customer/Products";
import ProductDetails from "../pages/customer/ProductDetails";
import Cart from "../pages/customer/Cart";
import Checkout from "../pages/customer/Checkout";
import Orders from "../pages/customer/Orders";
import OrderSuccess from "../pages/customer/OrderSuccess";
import Login from "../pages/customer/Login";
import Register from "../pages/customer/Register";
import Profile from "../pages/customer/Profile";
import WishList from "../pages/customer/WishList";

// Admin Pages
import DashBoard from "../pages/admin/DashBoard";
import AdminProducts from "../pages/admin/Products";
import AdminOrders from "../pages/admin/Orders";
import Analytics from "../pages/admin/Analytics";
import Inventory from "../pages/admin/Inventory";
import LockMonitor from "../pages/admin/LockMonitor";
import Delivery from "../pages/admin/Delivery";
import Users from "../pages/admin/Users";
import Reports from "../pages/admin/Reports";
import AuditLogs from "../pages/admin/AuditLogs";
import Notifications from "../pages/admin/Notifications";
import Settings from "../pages/admin/Settings";

// Delivery Pages
import DeliveryDashboard from "../pages/delivery/Dashboard";
import AssignedOrders from "../pages/delivery/AssignedOrders";
import History from "../pages/delivery/History";

// Not Found
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Customer Routes */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<ProductDetails />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="orders" element={<Orders />} />
        <Route path="order-success" element={<OrderSuccess />} />
        <Route path="wishlist" element={<WishList />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      {/* Auth Routes (no layout) */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<DashBoard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="locks" element={<LockMonitor />} />
        <Route path="delivery" element={<Delivery />} />
        <Route path="users" element={<Users />} />
        <Route path="reports" element={<Reports />} />
        <Route path="logs" element={<AuditLogs />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Delivery Routes */}
      <Route path="/delivery" element={<DeliveryLayout />}>
        <Route index element={<DeliveryDashboard />} />
        <Route path="orders" element={<AssignedOrders />} />
        <Route path="history" element={<History />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
