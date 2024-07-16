import { Schema,model } from "mongoose";

const FollowerSchema = new Schema(
    {
        followerId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        followedId: {
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

const Follower = model('Follower', FollowerSchema);

export default Follower;