import mongoose from "mongoose";
import 'dotenv/config';
import bcrypt from 'bcrypt';
import User from "../../entities/users/user.model";

export const userSeeder = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {})

        const users = [
            {
                email: "yoana@banana.com",
                password: bcrypt.hashSync("123456789", parseInt(process.env.SALT_ROUNDS))
            },
            {
                email: "morena@morepe.com",
                password: bcrypt.hashSync("123456789", parseInt(process.env.SALT_ROUNDS))
            },
            {
                email: "dani@dani.com",
                password: bcrypt.hashSync("123456789", parseInt(process.env.SALT_ROUNDS))
            },
            {
                email: "nina@nina.com",
                password: bcrypt.hashSync("123456789", parseInt(process.env.SALT_ROUNDS))
            },
            {
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