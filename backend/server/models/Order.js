import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    items:[
        {
            productId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product"
            },

            quantity:Number,

            price:Number
        }
    ],

    shippingAddress:{
        fullName:String,
        phone:String,
        email:String,
        address:String,
        city:String,
        state:String,
        pincode:String
    },

    paymentMethod:{
        type:String,
        enum:["COD","UPI","CARD"],
        default:"COD"
    },

    subtotal:Number,

    deliveryCharge:Number,

    discount:Number,

    totalAmount:Number,

    status:{
        type:String,
        enum:[
            "Pending",
            "Confirmed",
            "Packed",
            "Out For Delivery",
            "Delivered",
            "Cancelled"
        ],
        default:"Pending"
    }

},{
    timestamps:true
});

export default mongoose.model("Order",orderSchema);