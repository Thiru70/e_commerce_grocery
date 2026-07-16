import api from "./api";

const auth = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
});

export const getDashboard = async () => {
    const response = await api.get("/admin/dashboard", auth());
    return response.data;
};
