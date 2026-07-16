import api from "./api";

export const getProducts = async (page = 1, limit = 10, search = "", category = "") => {
    const response = await api.get(
        `/admin/products?page=${page}&limit=${limit}&search=${search}&category=${category}`
    );
    return response.data;
};

export const addProduct = async (formData) => {
    const response = await api.post("/admin/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
};

export const updateProduct = async (id, formData) => {
    const response = await api.put(`/admin/products/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
};

export const deleteProduct = async (id) => {
    const response = await api.delete(`/admin/products/${id}`);
    return response.data;
};

export const refillInventory = async (productId, data) => {
    const response = await api.post(`/admin/products/refill/${productId}`, data);
    return response.data;
};
