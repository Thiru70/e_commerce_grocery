import { Server } from "socket.io";

let io;

export const initializeSocket = (server) => {

    io = new Server(server, {

        cors: {

            origin: "http://localhost:5173",

            methods: ["GET", "POST"],

            credentials: true

        }

    });

    io.on("connection", (socket) => {

        console.log(`✅ User Connected : ${socket.id}`);

        socket.on("joinAdminDashboard", () => {

            socket.join("admin");

        });

        socket.on("joinCustomer", (userId) => {

            socket.join(userId);

        });

        socket.on("disconnect", () => {

            console.log(`❌ User Disconnected : ${socket.id}`);

        });

    });

};

export const getIO = () => {

    if (!io) {

        throw new Error("Socket.IO not initialized");

    }

    return io;

};