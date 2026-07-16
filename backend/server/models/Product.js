import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },

    description:String,

    category:{
        type:String,
        required:true
    },

    image:String,

    price:Number,

    oldPrice:Number,

    stock:{
        type:Number,
        default:0
    },

    reservedStock:{
        type:Number,
        default:0
    },

    availableStock:{
        type:Number,
        default:0
    },

    weight:String,

    rating:{
        type:Number,
        default:5
    },

    lockEnabled:{
        type:Boolean,
        default:true
    },

    lockDuration:{
        type:Number,
        default:7
    },

    isDeleted:{
        type:Boolean,
        default:false
    }

},{
    timestamps:true
});

export default mongoose.model("Product",productSchema);