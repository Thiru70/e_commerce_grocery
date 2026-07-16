import mongoose from "mongoose";

const auditSchema = new mongoose.Schema(

    {

        adminId: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "User",

            required: true

        },

        action: {

            type: String,

            required: true

        },

        entity: {

            type: String,

            required: true

        },

        entityId: {

            type: mongoose.Schema.Types.ObjectId

        },

        description: {

            type: String

        },

        ipAddress: {

            type: String

        }

    },

    {

        timestamps: true

    }

);

export default mongoose.model(

    "AuditLog",

    auditSchema

);