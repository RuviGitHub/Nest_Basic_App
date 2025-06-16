import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const permissionSchema = new Schema(
    {
        permission: {
            type: String,
            required: true,
        },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

const Permission = model('Permission', permissionSchema);

export default Permission;