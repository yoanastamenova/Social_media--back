import { Schema, model } from "mongoose";

const PostSchema = new Schema(
    {
        message: {

        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const Post = model('Post', PostSchema)

export default Post;