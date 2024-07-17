import mongoose from "mongoose";
import 'dotenv/config';
import bcrypt from 'bcrypt';
import User from "../../entities/users/user.model.js";

export const userSeeder = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {})

        const users = [
            {
                _id: "65edc829352c4f2a5cf087af",
                email: "yoana@banana.com",
                password: bcrypt.hashSync("123456789", parseInt(process.env.SALT_ROUNDS))
            },
            {
                _id: "65edc842352c4f2a5cf087b3",
                email: "morena@morepe.com",
                password: bcrypt.hashSync("123456789", parseInt(process.env.SALT_ROUNDS))
            },
            {
                _id: "65edc858352c4f2a5cf087b7",
                email: "dani@dani.com",
                password: bcrypt.hashSync("123456789", parseInt(process.env.SALT_ROUNDS))
            },
            {
                _id: "65edc873352c4f2a5cf087bb",
                email: "nina@nina.com",
                password: bcrypt.hashSync("123456789", parseInt(process.env.SALT_ROUNDS))
            },
            {
                _id: "65edc887352c4f2a5cf087bf",
                email: "javier@javier.com",
                password: bcrypt.hashSync("123456789", parseInt(process.env.SALT_ROUNDS))
            }
        ]
        await User.insertMany(users)
        console.log('===================')
        console.log('User seeder executed successfully!')
        console.log('===================')
    } catch (error) {
        console.log('===================')
        console.log('Error in execution of users seeder:', error)
        console.log('===================')
    } finally {
        await mongoose.connection.close()
    }
}
export default userSeeder