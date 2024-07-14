import User from "./user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    try {
        //1. Get the needed info to create a user
        const { email, password } = req.body;

        //2. Validate if this info is okay or not empty
        if (!email || !password) {
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

		const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

        if(!validEmail.test(email)){
            return res.status(400).json(
                {
                    success: false,
                    message: "The entered email is not valid!"
                }
            )
        }

        //3. Work with the info - in our case, encrypt the password of the user
        const hashedPassword = bcrypt.hashSync(password, 10);

        //4. Save the user in our database
        const user = await User.create(
            {
                email: email,
                password: hashedPassword
            }
        )

        //5. Provide a response that it is all done
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
        //1. Get the info
        const { email, password } = req.body;

        //2.Validate it
        if (!email || !password) {
            return res.status(404).json(
                {
                    success: false,
                    message: "Email and password invalid!"
                }
            )
        }

        const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

        if(!validEmail.test(email)){
            return res.status(400).json(
                {
                    success: false,
                    message: "The entered email is not valid!"
                }
            )
        }

        //3. Look for the info in the database
        const user = await User.findOne(
            {
                email: email
            }
        )

        // 3.1 if no user is found return a response
        if (!user) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Invalid email or password!"
                }
            )
        }

        // 3.2 if the user is found check if the entered password is the same as the one we have in our DB
        const validPassword = bcrypt.compareSync(password, user.password);

        //3.2 if user is found and info is correct create a token
        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "2h"
            }
        );


        //4. Give the token as a reposne
        res.status(200).json(
            {
                success: true,
                message: "Welcome, user!",
                token: token
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

export const getAllUsers = async (req, res) => {
    try {
        //1. Get all the users
        const users = await User.find()
            .select('-password')

        res.status(200).json(
            {
                success: true,
                message: "All users retrieved successfully!",
                data: users
            }
        )

    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "Error retrieving users!",
                error: error.message
            }
        )
    }
}

export const getUserProfile = async (req, res) => {
    try {
        //1. Check token data
        const userID = req.tokenData.userID;

        //.2 Validate this user exists
        const user = await User.findById(
            {
                _id: userID
            }
        ) .select ('-password')

        if (!user) {
            return res.status(404).json(
                {
                    success: false,
                    message: "Profile of this user does not exist!"
                }
            )
        }

        //3. Provide a response with the user information
        res.status(200).json(
            {
                success: true,
                message: "Profile found!",
                data: user
            }
        )
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "Error retriving profile!",
                error: error
            }
        )
    }
}

export const updateProfile = async (req, res) => {
    try {
        //1. Get the info for the profile we want to amend
        const userID = req.token._id;
        const email = req.body.email;
        const password = req.body.password;

        //2. Check if that user exists
        const user = User.findById(userID);

        if (!user) {
            return res.status(404).json(
                {
                    succes: false,
                    message: "User does not exist! Try again!"
                }
            )
        }

        //If we are changing the password it should be hashed again

        const hashedPassword = bcrypt.hashSync(password, 10);

        //3. If user is found, save the changes

        const newUser = User.findOneAndUpdate(
            {
                email: email
            },
            {
                password: hashedPassword
            }
        )

        //4. Provide a response
        res.status(200).json(
            {
                success: true,
                message: "User info updated successfully",
                data: newUser
            }
        )

    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "Error updating user profile!",
                error: error.message
            }
        )
    }
}


//// EXTRA CRUD

