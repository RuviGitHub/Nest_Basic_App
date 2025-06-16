import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const rolePermissionSchema = new Schema(
    {
        roleId: {
            type: Schema.Types.ObjectId,
            ref: "Role",
            required: true,
        },
        permissionId: {
            type: Schema.Types.ObjectId,
            ref: "Permission",
            required: true,
        },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

const RolePermission = model('RolePermission', rolePermissionSchema);

export default RolePermission;