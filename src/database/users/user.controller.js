import User from "./user.model";
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
    
}