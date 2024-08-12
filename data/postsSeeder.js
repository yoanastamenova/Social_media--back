import mongoose from "mongoose";
import 'dotenv/config';
import Post from "../models/Post.js";

export const postSeeder = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {})
        const userIds = Array.from({ length: 8 }, () => new mongoose.Types.ObjectId());
        const posts = [
            {
              _id: new mongoose.Types.ObjectId(),
              userId: userIds[1],
              firstName: "Steve",
              lastName: "Ralph",
              location: "New York, CA",
              description: "Some really long random description",
              picturePath: "post1.jpeg",
              userPicturePath: "p3.jpeg",
              likes: new Map([
                [userIds[0], true],
                [userIds[2], true],
                [userIds[3], true],
                [userIds[4], true],
              ]),
              comments: [
                "random comment",
                "another random comment",
                "yet another random comment",
              ],
            },
            {
              _id: new mongoose.Types.ObjectId(),
              userId: userIds[3],
              firstName: "Whatcha",
              lastName: "Doing",
              location: "Korea, CA",
              description:
                "Another really long random description. This one is longer than the previous one.",
              picturePath: "post2.jpeg",
              userPicturePath: "p6.jpeg",
              likes: new Map([
                [userIds[7], true],
                [userIds[4], true],
                [userIds[1], true],
                [userIds[2], true],
              ]),
              comments: [
                "one more random comment",
                "and another random comment",
                "no more random comments",
                "I lied, one more random comment",
              ],
            },
            {
              _id: new mongoose.Types.ObjectId(),
              userId: userIds[4],
              firstName: "Jane",
              lastName: "Doe",
              location: "Utah, CA",
              description:
                "This is the last really long random description. This one is longer than the previous one.",
              picturePath: "post3.jpeg",
              userPicturePath: "p5.jpeg",
              likes: new Map([
                [userIds[1], true],
                [userIds[6], true],
                [userIds[3], true],
                [userIds[5], true],
              ]),
              comments: [
                "one more random comment",
                "I lied, one more random comment",
                "I lied again, one more random comment",
                "Why am I doing this?",
                "I'm bored",
              ],
            },
            {
              _id: new mongoose.Types.ObjectId(),
              userId: userIds[5],
              firstName: "Harvey",
              lastName: "Dunn",
              location: "Los Angeles, CA",
              description:
                "This is the last really long random description. This one is longer than the previous one. Man I'm bored. I'm going to keep typing until I run out of things to say.",
              picturePath: "post4.jpeg",
              userPicturePath: "p7.jpeg",
              likes: new Map([
                [userIds[1], true],
                [userIds[6], true],
                [userIds[3], true],
              ]),
              comments: [
                "I lied again, one more random comment",
                "Why am I doing this?",
                "I'm bored",
                "I'm still bored",
                "All I want to do is play video games",
                "I'm going to play video games",
              ],
            },
            {
              _id: new mongoose.Types.ObjectId(),
              userId: userIds[6],
              firstName: "Carly",
              lastName: "Vowel",
              location: "Chicago, IL",
              description:
                "Just a short description. I'm tired of typing. I'm going to the mountain.",
              picturePath: "post5.jpeg",
              userPicturePath: "p8.jpeg",
              likes: new Map([
                [userIds[1], true],
                [userIds[3], true],
                [userIds[5], true],
                [userIds[7], true],
              ]),
              comments: [
                "I lied again, one more random comment",
                "Why am I doing this?",
                "Man I'm bored",
                "What should I do?",
                "I'm going to play video games",
              ],
            },
            {
              _id: new mongoose.Types.ObjectId(),
              userId: userIds[7],
              firstName: "Jessica",
              lastName: "Dunn",
              location: "Washington, DC",
              description:
                "For the last time, I'm going to hike now. I'm tired of typing. I'm going to play video games now.",
              picturePath: "post6.jpeg",
              userPicturePath: "p9.jpeg",
              likes: new Map([
                [userIds[1], true],
                [userIds[2], true],
              ]),
          
              comments: [
                "Can I play video games now?",
                "No let's actually study",
                "Never mind, I'm going to play video games",
                "Stop it.",
                "Michael, stop it.",
              ],
            },
          ];

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