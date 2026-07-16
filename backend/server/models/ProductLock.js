import mongoose from "mongoose";

const productLockSchema=new mongoose.Schema({

    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    },

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    quantity:Number,

    status:{
        type:String,
        enum:["ACTIVE","COMPLETED","EXPIRED"],
        default:"ACTIVE"
    },

    lockedAt:{
        type:Date,
        default:Date.now
    },

    expiresAt:Date

},{
    timestamps:true
});

export default mongoose.model("ProductLock",productLockSchema);