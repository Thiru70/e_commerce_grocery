import { useState } from "react";
import { useCart } from "../../context/CartContext";

const ProductInfo = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) addToCart(product);
  };

  return (
    <div>
      <h1 className="text-4xl font-bold">{product.name}</h1>

      <div className="text-yellow-500 mt-3">
        ⭐⭐⭐⭐⭐ ({product.rating || "5.0"})
      </div>

      <div className="flex gap-3 mt-5 items-center">
        <span className="text-3xl font-bold text-emerald-600">
          ₹{product.price}
        </span>
        {product.oldPrice && (
          <span className="line-through text-gray-500">₹{product.oldPrice}</span>
        )}
      </div>

      {product.weight && (
        <p className="text-gray-500 mt-2">{product.weight}</p>
      )}

      <div className="mt-6 space-y-2">
        <p>✔ Fresh Product</p>
        <p>✔ Organic</p>
        <p>✔ Fast Delivery</p>
      </div>

      <div className="flex items-center gap-4 mt-6">
        <button
          onClick={() => setQuantity((q) => Math.max(q - 1, 1))}
          className="bg-gray-200 w-10 h-10 rounded-lg text-xl hover:bg-gray-300"
        >
          -
        </button>
        <span className="text-xl font-bold">{quantity}</span>
        <button
          onClick={() => setQuantity((q) => q + 1)}
          className="bg-gray-200 w-10 h-10 rounded-lg text-xl hover:bg-gray-300"
        >
          +
        </button>
      </div>

      <div className="flex gap-4 mt-8">
        <button
          onClick={handleAdd}
          className="bg-emerald-600 text-white px-8 py-3 rounded-lg hover:bg-emerald-700"
        >
          Add to Cart
        </button>
        <button
          onClick={handleAdd}
          className="border border-emerald-600 text-emerald-600 px-8 py-3 rounded-lg hover:bg-emerald-600 hover:text-white"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductInfo;
