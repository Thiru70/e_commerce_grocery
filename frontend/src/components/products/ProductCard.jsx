import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const discount =
    product.oldPrice && product.oldPrice > product.price
      ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
      : null;

  return (
    <div
      className="rounded-2xl overflow-hidden group transition-all duration-300 hover:-translate-y-1"
      style={{
        background: "#fff",
        border: "1px solid #f3f4f6",
        boxShadow: "0 2px 8px -2px rgba(0,0,0,0.06)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 20px 40px -8px rgba(0,0,0,0.12)";
        e.currentTarget.style.borderColor = "transparent";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 2px 8px -2px rgba(0,0,0,0.06)";
        e.currentTarget.style.borderColor = "#f3f4f6";
      }}
    >
      <Link to={`/products/${product._id}`}>
        <div className="relative overflow-hidden" style={{ background: "#f9fafb" }}>
          <img
            src={product.image}
            alt={product.name}
            className="h-56 w-full object-contain p-5 group-hover:scale-110 transition-transform duration-500"
          />
          {discount && (
            <span
              className="absolute top-3 left-3 text-white text-xs font-bold px-2.5 py-1 rounded-lg"
              style={{ background: "#ef4444" }}
            >
              {discount}% OFF
            </span>
          )}
          <button
            className="absolute top-3 right-3 w-9 h-9 rounded-full flex justify-center items-center transition-all opacity-0 group-hover:opacity-100"
            style={{
              background: "rgba(255,255,255,0.85)",
              backdropFilter: "blur(4px)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <FaHeart style={{ color: "#f87171", fontSize: "14px" }} />
          </button>
        </div>

        <div className="p-5">
          <div className="flex items-center gap-1 mb-2">
            <FaStar style={{ color: "#f59e0b", fontSize: "14px" }} />
            <span className="text-sm font-medium" style={{ color: "#6b7280" }}>
              {product.rating || "5.0"}
            </span>
          </div>
          <h3 className="font-bold text-gray-800" style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {product.name}
          </h3>
          <p className="text-sm mt-1" style={{ color: "#9ca3af" }}>{product.weight}</p>
          <div className="flex items-center gap-3 mt-3">
            <span className="text-xl font-bold" style={{ color: "#059669" }}>
              ₹{product.price}
            </span>
            {product.oldPrice && (
              <span className="text-sm" style={{ color: "#d1d5db", textDecoration: "line-through" }}>
                ₹{product.oldPrice}
              </span>
            )}
          </div>
        </div>
      </Link>

      <div className="px-5 pb-5">
        <button
          onClick={(e) => {
            e.preventDefault();
            addToCart(product);
          }}
          className="w-full text-white py-3 rounded-xl flex justify-center items-center gap-2 transition-all duration-300 font-semibold text-sm"
          style={{
            background: "linear-gradient(135deg, #059669, #047857)",
            boxShadow: "0 4px 15px -3px rgba(5,150,105,0.3)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 8px 25px -3px rgba(5,150,105,0.4)";
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "0 4px 15px -3px rgba(5,150,105,0.3)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <FaShoppingCart />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
