import { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";

import NotificationDropdown from "./NotificationDropdown";

import {

    getNotifications,
    getUnreadCount,
    markAsRead,
    deleteNotification

} from "../../../services/notificationService";

import socket from "../../../socket/socket";

const NotificationBell = () => {

    const [open, setOpen] = useState(false);

    const [notifications, setNotifications] = useState([]);

    const [count, setCount] = useState(0);

    const loadNotifications = async () => {

        const data = await getNotifications();

        setNotifications(data);

        const unread = await getUnreadCount();

        setCount(unread);

    };

    useEffect(() => {

        loadNotifications();

        socket.on(

            "newNotification",

            () => {

                loadNotifications();

            }

        );

        return () => {

            socket.off("newNotification");

        };

    }, []);

    const handleRead = async (id) => {

        await markAsRead(id);

        loadNotifications();

    };

    const handleDelete = async (id) => {

        await deleteNotification(id);

        loadNotifications();

    };

    return (

        <div className="relative">

            <button

                onClick={() =>
                    setOpen(!open)
                }

            >

                <FaBell className="text-2xl" />

                {count > 0 && (

                    <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex justify-center items-center">

                        {count}

                    </span>

                )}

            </button>

            {open && (

                <NotificationDropdown

                    notifications={notifications}

                    onRead={handleRead}

                    onDelete={handleDelete}

                />

            )}

        </div>

    );

};

export default NotificationBell;