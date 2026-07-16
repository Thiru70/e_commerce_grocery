import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import { useCart } from "../../context/CartContext";
import { placeOrder } from "../../services/orderService";

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [payment, setPayment] = useState("COD");
  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });

  const subtotal = cartItems.reduce((t, i) => t + i.price * i.quantity, 0);
  const delivery = subtotal > 500 ? 0 : 40;
  const discount = subtotal > 1000 ? 100 : 0;
  const total = subtotal + delivery - discount;

  const handleChange = (e) =>
    setAddress({ ...address, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cartItems.length) return alert("Your cart is empty.");
    setLoading(true);
    try {
      await placeOrder({
        shippingAddress: address,
        paymentMethod: payment,
      });
      clearCart();
      navigate("/order-success");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 py-10 min-h-screen">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-10">Checkout</h1>

          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 space-y-6">
                {/* Address */}
                <div className="bg-white rounded-xl shadow p-6">
                  <h2 className="text-2xl font-bold mb-6">Delivery Address</h2>
                  <div className="grid md:grid-cols-2 gap-5">
                    <input
                      name="fullName"
                      value={address.fullName}
                      onChange={handleChange}
                      placeholder="Full Name"
                      required
                      className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <input
                      name="phone"
                      value={address.phone}
                      onChange={handleChange}
                      placeholder="Phone Number"
                      required
                      className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <input
                      name="email"
                      value={address.email}
                      onChange={handleChange}
                      placeholder="Email"
                      type="email"
                      className="border rounded-lg p-3 md:col-span-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <textarea
                      name="street"
                      value={address.street}
                      onChange={handleChange}
                      placeholder="Street Address"
                      required
                      rows="3"
                      className="border rounded-lg p-3 md:col-span-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <input
                      name="city"
                      value={address.city}
                      onChange={handleChange}
                      placeholder="City"
                      required
                      className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <input
                      name="state"
                      value={address.state}
                      onChange={handleChange}
                      placeholder="State"
                      required
                      className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <input
                      name="pincode"
                      value={address.pincode}
                      onChange={handleChange}
                      placeholder="Pincode"
                      required
                      className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                {/* Payment */}
                <div className="bg-white rounded-xl shadow p-6">
                  <h2 className="text-2xl font-bold mb-5">Payment Method</h2>
                  <div className="space-y-4">
                    {["COD", "UPI", "CARD"].map((method) => (
                      <label key={method} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          checked={payment === method}
                          onChange={() => setPayment(method)}
                        />
                        <span>
                          {method === "COD"
                            ? "Cash on Delivery"
                            : method === "UPI"
                            ? "UPI"
                            : "Credit / Debit Card"}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="bg-white rounded-xl shadow p-6 sticky top-24 h-fit">
                <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
                <div className="space-y-3 mb-6">
                  {cartItems.map((item) => (
                    <div key={item._id || item.id} className="flex justify-between text-sm">
                      <span>{item.name} × {item.quantity}</span>
                      <span>₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
                <hr className="mb-4" />
                <div className="space-y-3">
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
                  <div className="flex justify-between font-bold text-xl">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-8 w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 disabled:opacity-60 transition"
                >
                  {loading ? "Placing Order..." : "Place Order"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
