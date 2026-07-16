import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import CartItem from "../../components/cart/CartItem";
import OrderSummary from "../../components/cart/OrderSummary";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {

  const { cartItems } = useCart();

  return (
    <>
      <Navbar />

      <div className="bg-gray-100 min-h-screen py-10">

        <div className="max-w-7xl mx-auto px-6">

          <h1 className="text-4xl font-bold mb-10">
            Shopping Cart
          </h1>

          {cartItems.length === 0 ? (

            <div className="bg-white rounded-xl shadow p-10 text-center">
              <h2 className="text-2xl font-semibold">
                Your cart is empty 🛒
              </h2>
              <p className="text-gray-500 mt-3">
                Start adding products to your cart.
              </p>
              <Link
                to="/products"
                className="inline-block mt-6 bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700"
              >
                Shop Now
              </Link>
            </div>

          ) : (

            <div className="grid lg:grid-cols-3 gap-10">

              <div className="lg:col-span-2">

                {cartItems.map((item) => (
                  <CartItem
                    key={item._id || item.id}
                    item={item}
                  />
                ))}

              </div>

              <OrderSummary />

            </div>

          )}

        </div>

      </div>

      <Footer />
    </>
  );
};

export default Cart;