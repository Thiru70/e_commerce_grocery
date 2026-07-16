import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({

    userId: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true

    },

    name: String,

    phone: String,

    address: String,

    city: String,

    state: String,

    pincode: String,

    landmark: String,

    type: {

        type: String,

        enum: [

            "Home",

            "Office",

            "Other"

        ],

        default: "Home"

    }

},

{

    timestamps: true

});

export default mongoose.model(

    "Address",

    addressSchema

);