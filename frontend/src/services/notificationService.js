import api from "./api";

const auth = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
});

export const getNotifications = async () => {

    const response = await api.get(
        "/admin/notifications",
        auth()
    );

    return response.data.notifications;
};

export const getUnreadCount = async () => {

    const response = await api.get(
        "/admin/notifications/unread",
        auth()
    );

    return response.data.unread;
};

export const markAsRead = async (id) => {

    return api.put(
        `/admin/notifications/${id}/read`,
        {},
        auth()
    );

};

export const markAllRead = async () => {

    return api.put(
        "/admin/notifications/read-all",
        {},
        auth()
    );

};

export const deleteNotification = async (id) => {

    return api.delete(
        `/admin/notifications/${id}`,
        auth()
    );

};