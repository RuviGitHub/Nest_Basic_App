import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const blogPostSchema = new Schema(
    {
        title: { type: String, maxlength: 100, trim: true },
        content: { type: String, maxlength: 5000, trim: true },
        imageUrl: { type: String, trim: true },
        imagePath: { type: String, trim: true },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        blogCategoryId: {
            type: Schema.Types.ObjectId,
            ref: "BlogCategory",
            required: true,
        },
        tags: {
            type: JSON,
        },
        isActive: { type: Boolean, default: true },
    }
    ,
    { timestamps: true }
);

const BlogPost = model('BlogPost', blogPostSchema);

export default BlogPost;