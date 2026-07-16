import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

const OrderSummary = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const delivery = subtotal > 500 ? 0 : 40;
  const discount = subtotal > 1000 ? 100 : 0;
  const total = subtotal + delivery - discount;

  return (
    <div className="bg-white shadow rounded-xl p-6 sticky top-24">
      <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

      <div className="space-y-4">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery</span>
          <span>{delivery === 0 ? "Free" : `₹${delivery}`}</span>
        </div>
        <div className="flex justify-between">
          <span>Discount</span>
          <span className="text-green-600">-₹{discount}</span>
        </div>
        <hr />
        <div className="flex justify-between text-xl font-bold">
          <span>Total</span>
          <span>₹{total}</span>
        </div>
      </div>

      <button
        onClick={() => navigate("/checkout")}
        className="w-full mt-6 bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition"
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default OrderSummary;
