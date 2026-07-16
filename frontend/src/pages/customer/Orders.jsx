import { useEffect, useState } from "react";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import { getMyOrders } from "../../services/orderService";

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-700",
  Confirmed: "bg-blue-100 text-blue-700",
  Packed: "bg-purple-100 text-purple-700",
  "Out For Delivery": "bg-orange-100 text-orange-700",
  Delivered: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyOrders()
      .then(setOrders)
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen py-10">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-10">My Orders</h1>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : orders.length === 0 ? (
            <div className="bg-white rounded-xl shadow p-10 text-center">
              <h2 className="text-2xl font-semibold">No orders yet 📦</h2>
              <p className="text-gray-500 mt-3">Start shopping to place your first order.</p>
            </div>
          ) : (
            <div className="space-y-5">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white rounded-xl shadow p-6"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <h2 className="font-bold text-xl">
                        #{order._id.slice(-8).toUpperCase()}
                      </h2>
                      <p className="text-gray-500 text-sm mt-1">
                        {new Date(order.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                      <div className="mt-3 space-y-1">
                        {order.items.map((item, i) => (
                          <p key={i} className="text-sm text-gray-600">
                            {item.productId?.name || "Product"} × {item.quantity}
                          </p>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-3">
                      <p className="font-bold text-lg">₹{order.totalAmount}</p>
                      <span
                        className={`px-4 py-1 rounded-full text-sm font-medium ${
                          statusColors[order.status] || "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {order.status}
                      </span>
                      <p className="text-sm text-gray-500">{order.paymentMethod}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Orders;
