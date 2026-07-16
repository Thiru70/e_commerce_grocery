import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaShoppingCart,
  FaHeart,
  FaUserCircle,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { cartItems } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <nav
      className="sticky top-0 z-50"
      style={{
        background: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid #f3f4f6",
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
      }}
    >
      <div className="max-w-7xl mx-auto px-5">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold" style={{ color: "#059669" }}>
            <span
              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white"
              style={{ background: "#059669" }}
            >
              F
            </span>
            FreshMart
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { to: "/", label: "Home" },
              { to: "/products", label: "Products" },
              ...(user ? [{ to: "/orders", label: "Orders" }] : []),
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="font-medium transition-colors relative py-1"
                style={{ color: "#374151" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#059669"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "#374151"; }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Search */}
          <form onSubmit={handleSearch} className="hidden lg:flex">
            <div
              className="flex items-center rounded-xl overflow-hidden transition-all"
              style={{ background: "#f3f4f6" }}
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search groceries..."
                className="bg-transparent px-4 py-2.5 w-64 focus:outline-none text-sm"
              />
              <button
                type="submit"
                className="px-4 py-2.5 text-white transition-colors"
                style={{ background: "#059669" }}
              >
                🔍
              </button>
            </div>
          </form>

          {/* Icons */}
          <div className="hidden md:flex items-center gap-4 text-xl">
            <Link
              to="/wishlist"
              className="p-2 rounded-lg transition-colors"
              style={{ color: "#6b7280" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#ef4444"; e.currentTarget.style.background = "#fef2f2"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "#6b7280"; e.currentTarget.style.background = "transparent"; }}
            >
              <FaHeart />
            </Link>

            <Link
              to="/cart"
              className="relative p-2 rounded-lg transition-colors"
              style={{ color: "#6b7280" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#059669"; e.currentTarget.style.background = "#ecfdf5"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "#6b7280"; e.currentTarget.style.background = "transparent"; }}
            >
              <FaShoppingCart />
              {cartCount > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold"
                  style={{ background: "#ef4444", fontSize: "10px" }}
                >
                  {cartCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center gap-3">
                <Link to="/profile" className="text-sm font-semibold transition-colors" style={{ color: "#374151" }}>
                  Hi, {user.name?.split(" ")[0]}
                </Link>
                <button
                  onClick={logout}
                  className="text-white text-xs font-semibold px-3.5 py-1.5 rounded-lg transition-colors"
                  style={{ background: "#ef4444" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#dc2626"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "#ef4444"; }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="p-2 rounded-lg transition-colors text-2xl"
                style={{ color: "#6b7280" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#059669"; e.currentTarget.style.background = "#ecfdf5"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "#6b7280"; e.currentTarget.style.background = "transparent"; }}
              >
                <FaUserCircle />
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl p-2 rounded-lg transition-colors"
            style={{ color: "#374151" }}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="md:hidden"
          style={{ background: "#fff", borderTop: "1px solid #f3f4f6", boxShadow: "0 10px 30px -5px rgba(0,0,0,0.1)" }}
        >
          <form onSubmit={handleSearch} className="flex px-5 py-3 gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search groceries..."
              className="flex-1 rounded-lg px-4 py-2.5 focus:outline-none text-sm"
              style={{ background: "#f3f4f6" }}
            />
            <button
              type="submit"
              className="text-white px-4 py-2.5 rounded-lg"
              style={{ background: "#059669" }}
            >
              🔍
            </button>
          </form>
          {[
            { to: "/", label: "Home" },
            { to: "/products", label: "Products" },
            { to: "/wishlist", label: "Wishlist" },
          ].map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className="block px-5 py-3 font-medium transition-colors"
              style={{ color: "#374151" }}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/cart" onClick={() => setMenuOpen(false)} className="block px-5 py-3 font-medium" style={{ color: "#374151" }}>
            Cart {cartCount > 0 && (
              <span className="ml-2 text-white text-xs px-2 py-0.5 rounded-full" style={{ background: "#ef4444" }}>
                {cartCount}
              </span>
            )}
          </Link>
          {user ? (
            <>
              <Link to="/orders" onClick={() => setMenuOpen(false)} className="block px-5 py-3 font-medium" style={{ color: "#374151" }}>My Orders</Link>
              <Link to="/profile" onClick={() => setMenuOpen(false)} className="block px-5 py-3 font-medium" style={{ color: "#374151" }}>Profile</Link>
              <button
                onClick={() => { logout(); setMenuOpen(false); }}
                className="block w-full text-left px-5 py-3 font-medium"
                style={{ color: "#dc2626" }}
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" onClick={() => setMenuOpen(false)} className="block px-5 py-3 font-medium" style={{ color: "#374151" }}>Login</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
