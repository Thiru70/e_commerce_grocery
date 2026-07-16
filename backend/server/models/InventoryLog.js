import mongoose from "mongoose";

const inventoryLogSchema=new mongoose.Schema({

    adminId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    },

    oldStock:Number,

    newStock:Number,

    reason:String

},{
    timestamps:true
});

export default mongoose.model("InventoryLog",inventoryLogSchema);