import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const blogCategorySchema = new Schema(
    {
        category: { type: String, maxlength: 100, trim: true, index: true },
        isActive: { type: Boolean, default: true },
    }
    ,
    { timestamps: true }
);

const BlogCategory = model('BlogCategory', blogCategorySchema);

export default BlogCategory;