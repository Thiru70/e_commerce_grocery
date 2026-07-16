import api from "./api";

export const addToCartAPI = async (productId, quantity = 1) => {
    const response = await api.post("/cart/add", { productId, quantity });
    return response.data;
};

export const getCartAPI = async () => {
    const response = await api.get("/cart");
    return response.data;
};

export const removeFromCartAPI = async (productId) => {
    const response = await api.delete(`/cart/${productId}`);
    return response.data;
};
