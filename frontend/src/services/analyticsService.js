import api from "./api";

const auth = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
});

export const getAnalytics = async () => {

    const response = await api.get(
        "/admin/analytics",
        auth()
    );

    return response.data;

};