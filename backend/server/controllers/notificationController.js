import Notification from "../models/Notification.js";
import { getIO } from "../socket/socket.js";

/*
====================================================
GET /api/admin/notifications
====================================================
*/

export const getNotifications = async (req, res) => {

    try {

        const notifications = await Notification.find({

            userId: req.user._id

        })

        .sort({

            createdAt: -1

        });

        res.status(200).json({

            success: true,

            notifications

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


/*
====================================================
GET Unread Count
====================================================
*/

export const getUnreadCount = async (req, res) => {

    try {

        const count = await Notification.countDocuments({

            userId: req.user._id,

            read: false

        });

        res.json({

            success: true,

            unread: count

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


/*
====================================================
Mark Notification Read
====================================================
*/

export const markAsRead = async (req, res) => {

    try {

        const notification = await Notification.findById(req.params.id);

        if (!notification) {

            return res.status(404).json({

                success: false,

                message: "Notification not found"

            });

        }

        notification.read = true;

        await notification.save();

        res.json({

            success: true,

            notification

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


/*
====================================================
Mark All Read
====================================================
*/

export const markAllRead = async (req, res) => {

    try {

        await Notification.updateMany(

            {

                userId: req.user._id,

                read: false

            },

            {

                read: true

            }

        );

        res.json({

            success: true,

            message: "All notifications marked as read"

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


/*
====================================================
Delete Notification
====================================================
*/

export const deleteNotification = async (req, res) => {

    try {

        await Notification.findByIdAndDelete(req.params.id);

        res.json({

            success: true,

            message: "Notification deleted"

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


/*
====================================================
Create Notification
Reusable Helper
====================================================
*/

export const createNotification = async (

    userId,

    title,

    message,

    type = "INFO"

) => {

    const notification = await Notification.create({

        userId,

        title,

        message,

        type

    });

    const io = getIO();

    io.emit("newNotification", notification);

    return notification;

};