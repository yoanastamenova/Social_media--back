import { Mongoose, Schema, model } from "mongoose";

const PostSchema = new Schema(
    {
        message: {
            type: String,
            required: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        likes: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const Post = model('Post', PostSchema)
export default Post;