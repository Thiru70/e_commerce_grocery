const OrderReport = ({ orders }) => {

    return (

        <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-2xl font-bold mb-5">

                Order Report

            </h2>

            <table className="w-full">

                <thead>

                    <tr>

                        <th>Order</th>

                        <th>Customer</th>

                        <th>Amount</th>

                        <th>Status</th>

                    </tr>

                </thead>

                <tbody>

                    {orders.map(order => (

                        <tr key={order._id}>

                            <td>

                                #{order._id.slice(-6)}

                            </td>

                            <td>

                                {order.userId?.name}

                            </td>

                            <td>

                                ₹{order.totalAmount}

                            </td>

                            <td>

                                {order.status}

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

};

export default OrderReport;