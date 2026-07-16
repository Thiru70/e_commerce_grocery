import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

const exists = await User.findOne({
    email: "admin@freshmart.com"
});

if (!exists) {

    const password = await bcrypt.hash("Admin@123", 10);

    await User.create({

        name: "Administrator",

        email: "admin@freshmart.com",

        phone: "9876543210",

        password:password,

        role: "admin"

    });

    console.log("Admin Created");

} else {

    console.log("Admin Already Exists");

}

process.exit();