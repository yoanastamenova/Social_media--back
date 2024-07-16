import mongoose from "mongoose";
import 'dotenv/config';

export const dbConnection = () => {
    console.log('============');
    console.log('Connected to MongoDB!');
    return mongoose.connect(process.env.MONGO_URI, {})
}