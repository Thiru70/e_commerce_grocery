import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({

    code: {

        type: String,

        unique: true

    },

    discount: Number,

    expiryDate: Date,

    active: {

        type: Boolean,

        default: true

    }

},

{

    timestamps: true

});

export default mongoose.model(

    "Coupon",

    couponSchema

);