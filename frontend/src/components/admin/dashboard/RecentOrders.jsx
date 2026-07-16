const RecentOrders = ({ orders = [] }) => {
  return (
    <div className="bg-white rounded-xl shadow p-5">

      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-bold">
          Recent Orders
        </h2>

        <span className="text-sm text-gray-500">
          {orders.length} Orders
        </span>
      </div>

      {orders.length === 0 ? (

        <div className="text-center py-10 text-gray-500">
          No Orders Found
        </div>

      ) : (

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="text-left py-3">Order</th>

              <th className="text-left">Customer</th>

              <th className="text-center">Amount</th>

              <th className="text-center">Status</th>

            </tr>

          </thead>

          <tbody>

            {orders.map((order) => (

              <tr
                key={order._id}
                className="border-b hover:bg-gray-50"
              >

                <td className="py-3">
                  #{order._id.slice(-6)}
                </td>

                <td>
                  {order.userId?.name || "Customer"}
                </td>

                <td className="text-center">
                  ₹{order.totalAmount}
                </td>

                <td className="text-center">

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : order.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {order.status}
                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      )}

    </div>
  );
};

export default RecentOrders;