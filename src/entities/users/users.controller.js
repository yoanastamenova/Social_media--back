import User from "./user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password ){
            return res.status(400).json(
                {
                    success: false,
                    message: "Email and password fields cannot be empty!"
                }
            )
        }

        if (password.length < 8 || password.length > 12) {
            return res.status(400).json(
                {
                    success: false,
                    message: "The provided password does not respond to the requirements!"
                }
            )
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        const user = await User.create(
            {
                email: email,
                password: hashedPassword
            }
        )

        res.status(201).json(
            {
                success: true,
                message: "User registered successfully!",
                data: user
            }
        )
        
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "Error registering user",
                error: error.message
            }
        )
    }
}

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        // validar

        const user = await User.findOne(
            {
              email: email
            }
       )

       console.log(user)

       if(!user){
        return res.status(400).json(
            {
                success: false,
                message: "Invalid email or password!"
            }
        )
       }

       const token = jwt.sign(
        {
            id: user._id,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "2h"
        }
       )


       res.status(200).json(
        {
            success: true,
            message: "Logged in!",
            data: token
        }
       )
        
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "Error logging in user! Try again!",
                error: error.message
            }
        )
    }
}