import mongoose from "mongoose";
import 'dotenv/config';
import Post from '../../entities/posts/post.model.js';

export const postSeeder = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {})
        const posts = [
            {
                message: "Hi world, first post here!",
                userId: "65edc829352c4f2a5cf087af"
            },
            {
                message: "Today was a good day for USA, lets see tomorrow!",
                userId: "65edc842352c4f2a5cf087b3"
            },
            {
                message: "Weather is disgusting! Ewwww!",
                userId: "65edc858352c4f2a5cf087b7"
            },
            {
                message: "Just saw the new MacBook prototype! Awesome!",
                userId: "65edc887352c4f2a5cf087bf"
            }
        ]
        await Post.insertMany(posts)
        console.log('===================')
        console.log('Posts seeder executed successfully!')
        console.log('===================')
    } catch (error) {
        console.log('===================')
        console.log('Error in execution of posts seeder:', error)
        console.log('===================')
    } finally {
        await mongoose.connection.close()
    }
}
export default postSeeder