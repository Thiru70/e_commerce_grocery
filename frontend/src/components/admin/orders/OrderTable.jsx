import OrderRow from "./OrderRow";

const OrderTable = ({
    orders,
    refresh
}) => {

    return (

        <div className="bg-white rounded-xl shadow">

            <table className="w-full">

                <thead className="bg-emerald-600 text-white">

                    <tr>

                        <th>Order</th>

                        <th>Customer</th>

                        <th>Amount</th>

                        <th>Payment</th>

                        <th>Status</th>

                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {orders.map(order => (

                        <OrderRow

                            key={order._id}

                            order={order}

                            refresh={refresh}

                        />

                    ))}

                </tbody>

            </table>

        </div>

    );

};

export default OrderTable;