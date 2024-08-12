import mongoose from "mongoose";
import 'dotenv/config';
import User from "../models/User.js"
import bcrypt from "bcrypt";

export const usersSeeder = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {})

        const userIds = [
            new mongoose.Types.ObjectId(),
            new mongoose.Types.ObjectId(),
            new mongoose.Types.ObjectId(),
            new mongoose.Types.ObjectId(),
            new mongoose.Types.ObjectId(),
            new mongoose.Types.ObjectId(),
            new mongoose.Types.ObjectId(),
            new mongoose.Types.ObjectId(),
          ];          

        const users = [
            {
                _id: userIds[0],
                firstName: "admin",
                lastName: "Mr Admin",
                email: "admin@admin.com",
                password: bcrypt.hashSync('123456789', 10),
                role: "admin",
                picturePath: "p4.jpeg",
                friends: [],
                location: "San Fran, CA",
                occupation: "Software Engineer",
                viewedProfile: 14,
                impressions: 82,
                createdAt: 1115211422,
                updatedAt: 1115211422,
                __v: 0,
            },
            {
                _id: userIds[1],
                firstName: "Steve",
                lastName: "Ralph",
                email: "thataaa@gmail.com",
                password: bcrypt.hashSync('123456789', 10),
                picturePath: "p3.jpeg",
                friends: [],
                location: "New York, CA",
                occupation: "Degenerate",
                viewedProfile: 12,
                impressions: 55,
                createdAt: 1595589072,
                updatedAt: 1595589072,
                __v: 0,
            },
            {
                _id: userIds[2],
                firstName: "Some",
                lastName: "Guy",
                email: "someguy@gmail.com",
                password: bcrypt.hashSync('123456789', 10),
                picturePath: "p4.jpeg",
                friends: [],
                location: "Canada, CA",
                occupation: "Data Scientist Hacker",
                viewedProfile: 45,
                impressions: 196,
                createdAt: 1288090662,
                updatedAt: 1288090662,
                __v: 0,
            },
            {
                _id: userIds[3],
                firstName: "Liana",
                lastName: "Doing",
                email: "whatchadoing@gmail.com",
                password: bcrypt.hashSync('123456789', 10),
                picturePath: "p6.jpeg",
                friends: [],
                location: "Korea, CA",
                occupation: "Educator",
                viewedProfile: 41,
                impressions: 55,
                createdAt: 1219214568,
                updatedAt: 1219214568,
                __v: 0,
            },
            {
                _id: userIds[4],
                firstName: "Jane",
                lastName: "Doe",
                email: "janedoe@gmail.com",
                password: bcrypt.hashSync('123456789', 10),
                picturePath: "p5.jpeg",
                friends: [],
                location: "Utah, CA",
                occupation: "Hacker",
                viewedProfile: 40,
                impressions: 7,
                createdAt: 1493463661,
                updatedAt: 1493463661,
                __v: 0,
            },
            {
                _id: userIds[5],
                firstName: "Harvey",
                lastName: "Dunn",
                email: "harveydunn@gmail.com",
                password: bcrypt.hashSync('123456789', 10),
                picturePath: "p7.jpeg",
                friends: [],
                location: "Los Angeles, CA",
                occupation: "Journalist",
                viewedProfile: 96,
                impressions: 46,
                createdAt: 1381326073,
                updatedAt: 1381326073,
                __v: 0,
            },
            {
                _id: userIds[6],
                firstName: "Carly",
                lastName: "Vowel",
                email: "carlyvowel@gmail.com",
                password: bcrypt.hashSync('123456789', 10),
                picturePath: "p8.jpeg",
                friends: [],
                location: "Chicago, IL",
                occupation: "Nurse",
                viewedProfile: 15,
                impressions: 775,
                createdAt: 1714704324,
                updatedAt: 1642716557,
                __v: 0,
            },
            {
                _id: userIds[7],
                firstName: "Jessica",
                lastName: "Dunn",
                email: "jessicadunn@gmail.com",
                password: bcrypt.hashSync('123456789', 10),
                picturePath: "p9.jpeg",
                friends: [],
                location: "Washington, DC",
                occupation: "A Student",
                viewedProfile: 19420,
                impressions: 82970,
                createdAt: 1369908044,
                updatedAt: 1359322268,
                __v: 0,
            },
        ];
        await User.insertMany(users)
        console.log('===================')
        console.log('Users seeder executed successfully!')
        console.log('===================')
    } catch (error) {
        console.log('===================')
        console.log('Error in execution of users seeder:', error)
        console.log('===================')
    } finally {
        await mongoose.connection.close()
    }
}
export default usersSeeder