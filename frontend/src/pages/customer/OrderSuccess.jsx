import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const OrderSuccess = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-5">

      <div className="bg-white rounded-2xl shadow-xl p-10 text-center max-w-lg">

        <FaCheckCircle
          className="text-green-500 mx-auto"
          size={80}
        />

        <h1 className="text-4xl font-bold mt-6">
          Order Placed Successfully!
        </h1>

        <p className="text-gray-600 mt-4">
          Thank you for shopping with FreshMart.
        </p>

        <p className="text-gray-600">
          Your groceries will be delivered soon.
        </p>

        <div className="mt-8 flex gap-4 justify-center">

          <Link
            to="/orders"
            className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700"
          >
            View Orders
          </Link>

          <Link
            to="/"
            className="border border-emerald-600 text-emerald-600 px-6 py-3 rounded-lg hover:bg-emerald-600 hover:text-white"
          >
            Continue Shopping
          </Link>

        </div>

      </div>

    </div>
  );
};

export default OrderSuccess;