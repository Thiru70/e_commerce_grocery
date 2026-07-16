import { useEffect, useState } from "react";

import NotificationItem from "../../components/admin/notifications/NotificationItem";

import {

    getNotifications,
    markAsRead,
    deleteNotification

} from "../../services/notificationService";

const Notifications = () => {

    const [notifications, setNotifications] = useState([]);

    const loadNotifications = async () => {

        const data = await getNotifications();

        setNotifications(data);

    };

    useEffect(() => {

        loadNotifications();

    }, []);

    return (

        <div>

            <h1 className="text-3xl font-bold mb-6">

                Notifications

            </h1>

            <div className="bg-white rounded-xl shadow">

                {notifications.map((notification) => (

                    <NotificationItem

                        key={notification._id}

                        notification={notification}

                        onRead={async(id)=>{

                            await markAsRead(id);

                            loadNotifications();

                        }}

                        onDelete={async(id)=>{

                            await deleteNotification(id);

                            loadNotifications();

                        }}

                    />

                ))}

            </div>

        </div>

    );

};

export default Notifications;