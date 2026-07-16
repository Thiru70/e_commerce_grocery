import api from "./api";

// Admin
export const getOrders = async () => {
    const response = await api.get("/admin/orders");
    return response.data;
};

export const updateOrderStatus = async (id, status) => {
    const response = await api.put(`/admin/orders/${id}/status`, { status });
    return response.data;
};

export const assignDriver = async (id, driverId) => {
    const response = await api.put(`/admin/orders/${id}/assign`, { driverId });
    return response.data;
};

// Customer
export const getMyOrders = async () => {
    const response = await api.get("/orders/my-orders");
    return response.data;
};

export const placeOrder = async (orderData) => {
    const response = await api.post("/orders", orderData);
    return response.data;
};