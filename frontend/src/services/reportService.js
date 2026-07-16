import api from "./api";

const auth = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
});

export const getSalesReport = async () => {
    const res = await api.get("/admin/reports/sales", auth());
    return res.data;
};

export const getInventoryReport = async () => {
    const res = await api.get("/admin/reports/inventory", auth());
    return res.data;
};

export const getOrderReport = async () => {
    const res = await api.get("/admin/reports/orders", auth());
    return res.data;
};

export const getAuditReport = async () => {
    const res = await api.get("/admin/reports/audit", auth());
    return res.data;
};