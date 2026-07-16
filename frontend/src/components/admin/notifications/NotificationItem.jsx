import { FaTrash } from "react-icons/fa";

const NotificationItem = ({
    notification,
    onRead,
    onDelete
}) => {

    return (

        <div
            className={`border-b p-4 ${
                notification.read
                    ? "bg-white"
                    : "bg-blue-50"
            }`}
        >

            <div className="flex justify-between">

                <div>

                    <h3 className="font-bold">

                        {notification.title}

                    </h3>

                    <p className="text-gray-600 text-sm">

                        {notification.message}

                    </p>

                    <p className="text-xs text-gray-400 mt-1">

                        {new Date(
                            notification.createdAt
                        ).toLocaleString()}

                    </p>

                </div>

                <div className="flex flex-col gap-2">

                    {!notification.read && (

                        <button
                            onClick={() =>
                                onRead(notification._id)
                            }
                            className="text-blue-600 text-sm"
                        >
                            Mark Read
                        </button>

                    )}

                    <button
                        onClick={() =>
                            onDelete(notification._id)
                        }
                        className="text-red-600"
                    >
                        <FaTrash />
                    </button>

                </div>

            </div>

        </div>

    );

};

export default NotificationItem;