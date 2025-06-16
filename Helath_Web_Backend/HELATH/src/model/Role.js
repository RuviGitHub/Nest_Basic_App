import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const roleSchema = new Schema(
    {
        role: { type: String, maxlength: 100, trim: true, index: true },
        isActive: { type: Boolean, default: true },
    }
    ,
    { timestamps: true }
);

const Role = model('Role', roleSchema);

export default Role;