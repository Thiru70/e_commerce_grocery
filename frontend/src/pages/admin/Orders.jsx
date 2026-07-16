import { useEffect, useState } from "react";

import OrderTable from "../../components/admin/orders/OrderTable";

import {
    getOrders
} from "../../services/orderService";

const Orders = () => {

    const [orders, setOrders] = useState([]);

    const loadOrders = async () => {

        const data = await getOrders();

        setOrders(data);

    };

    useEffect(() => {

        loadOrders();

    }, []);

    return (

        <div>

            <h1 className="text-3xl font-bold mb-6">

                Orders

            </h1>

            <OrderTable

                orders={orders}

                refresh={loadOrders}

            />

        </div>

    );

};

export default Orders;