import NotificationItem from "./NotificationItem";

const NotificationDropdown = ({
    notifications,
    onRead,
    onDelete
}) => {

    return (

        <div className="absolute right-0 mt-2 w-96 bg-white shadow-xl rounded-lg overflow-hidden z-50">

            <div className="p-4 border-b font-bold">

                Notifications

            </div>

            <div className="max-h-96 overflow-y-auto">

                {notifications.length === 0 ? (

                    <div className="p-6 text-center text-gray-500">

                        No Notifications

                    </div>

                ) : (

                    notifications.map((notification) => (

                        <NotificationItem

                            key={notification._id}

                            notification={notification}

                            onRead={onRead}

                            onDelete={onDelete}

                        />

                    ))

                )}

            </div>

        </div>

    );

};

export default NotificationDropdown;