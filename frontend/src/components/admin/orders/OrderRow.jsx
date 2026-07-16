import StatusBadge from "./StatusBadge";

import {
    updateOrderStatus
} from "../../../services/orderService";

const OrderRow = ({
    order,
    refresh
}) => {

    const changeStatus = async (status) => {

        await updateOrderStatus(

            order._id,

            status

        );

        refresh();

    };

    return (

        <tr className="border-b">

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

                {order.paymentMethod}

            </td>

            <td>

                <StatusBadge

                    status={order.status}

                />

            </td>

            <td>

                <select

                    value={order.status}

                    onChange={(e)=>

                        changeStatus(e.target.value)

                    }

                    className="border rounded px-2 py-1"

                >

                    <option>Pending</option>

                    <option>Confirmed</option>

                    <option>Packed</option>

                    <option>Out For Delivery</option>

                    <option>Delivered</option>

                    <option>Cancelled</option>

                </select>

            </td>

        </tr>

    );

};

export default OrderRow;