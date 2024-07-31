import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import User from "../models/User.js"

// REGISTER
export const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            ocupation
        } = req.body;

        if(!email || !password) {
            return res.json(
                {
                    success: false,
                    message: "Email and password cannot be empty!"
                }
             )
         }

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            ocupation,
            viewdProfile: Math.floor(Math.random() * 10),
            impressions: Math.floor(Math.random() * 10)
        })

        const savedUser = await newUser.save();

        res.status(201).json(
            {
                success: true,
                message: "Register was successfull!",
                data: savedUser
    });

    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "Error creating user!",
                error: error
            }
        )
    }
}

// LOGIN
export const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        if(!email || !password) {
            return res.status(404).json({
                success: false,
                message: "Email and password cannot be empty!"
            })
        }

        const user = await User.findOne({
            email: email,
        })

        if(!user) {
            return res.status(404).json(
                {
                    success: false,
                    message: "User does not exist!"
                }
            )
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Invalid password!"
                }
            )
        }
        
        const token = jwt.sign({
            id: user._id,
        },
        process.env.JWT_SECRET
    )
    
    delete user.password;
    
    res.status(200).json({
        token,
        user
    })

    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "Error logging in!",
                error: error
            }
        )
    }
}