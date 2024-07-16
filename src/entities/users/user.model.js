import { Schema, model } from "mongoose";

const UserSchema = new Schema(
    {
        name: {
            type: String,
            require: true,
        },
        email: {
            type: String,
            unique: true,
            require: true
        },
        password: {
            type: String,
            require: true
        },
        role: {
            type: String,
            enum: ["user", "admin", "super_admin"],
            default: "user"
        },
        isActive: {
            type: Boolean,
            default: true
        },
        followers: {
            type: Array,
            default: "",
        },
        following: {
            type: Array,
            default: ""
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const User = model('User', UserSchema)

export default User;