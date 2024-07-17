import User from "./user.model.js";
import Post from "../posts/post.model.js"
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
        const userID = req.tokenData._id;

        //.2 Validate this user exists
        const user = await User.findOne(
            {
                id: userID
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
                error: error.message
            }
        )
    }
}

export const updateProfile = async (req, res) => {
    try {
        const userID = req.tokenData.id;
        const email = req.body.email;

        // Check if that user exists
        const user = await User.findOne({ _id: userID });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User does not exist! Try again!"
            });
        }

        // Update user
        const updatedUser = await User.findOneAndUpdate(
            {_id: userID},
            { email: email },
            {new: true} // Returns the updated user
        );

        if(!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "Nothing to be updated!"
            });
        }

        // Response
        res.status(200).json(
            {
                success: true,
                message: "User info updated successfully",
                data: updatedUser
            }
        );
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "Error updating user profile!",
                error: error.message
            }
        );
    }
}

//// EXTRA CRUD

export const getUserByEmail = async (req, res) => {
        try {
            //1. Check token data
            const userEmail = req.body.email;
    
            //.2 Validate this user exists
            const user = await User.findOne(
                {
                    email: userEmail
                }
            )
    
            if (!user) {
                return res.status(404).json(
                    {
                        success: false,
                        message: "User with the given email does not exist!"
                    }
                )
            }
    
            //3. Provide a response with the user information
            res.status(200).json(
                {
                    success: true,
                    message: "User found!",
                    data: user
                }
            )
        } catch (error) {
            res.status(500).json(
                {
                    success: false,
                    message: "Error retriving user!",
                    error: error.message
                }
            )
        }
}

export const deleteUser = async (req, res) => {
    try {
        // Get the id of the user we want to delete from the request body
        const userID = req.body.id;

        // If user with the given id exists, delete them
        const userDeleted = await User.findByIdAndDelete(userID); // You can directly pass the id here

        // Check if the user existed and was deleted
        if (!userDeleted) {
            return res.status(404).json({
                success: false,
                message: "No user to delete!"
            });
        }

        // Provide a response with the user information
        res.status(200).json({
            success: true,
            message: "User deleted successfully!",
            data: userDeleted
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting user!",
            error: error.message,
        });
    }
}

export const changeUserRole = async (req, res) => {
   try {
     //1. Obtain the userId of the user we want to modify
     const userId = req.body.id;
     const newRole = req.body.role;
 
     //2. Validate the info
     const user = await User.findOne({
        _id: userId
     })

     //3. Save the new info
     const newUser = await User.updateOne(
        {_id: userId},
        { role: newRole },
        {new: true} // Returns the updated user
    );

    if(!newUser) {
        return res.status(404).json({
            success: false,
            message: "Nothing to be changed!"
        });
    }

    // Response
    res.status(200).json(
        {
            success: true,
            message: "User role updated successfully",
            data: newUser
        }
    );
     
   } catch (error) {
    res.status(500).json(
        {
            success: false,
            message: "Error changing user role!",
            error: error.message
        }
    )
   }
}

//FOLLOW CRUD

export const followUnfollow = async (req, res) => {
    try {
        //1. Get both users ID 
        const user1id = req.tokenData.id;
        const user2id = req.params.id;

        //2. Validate their existence
        const user1 = await User.findById(user1id)
        if(!user1) {
            return res.status(404).json(
                {
                    success: false,
                    message: "User not found!"
                }
            )
        }

        const user2 = await User.findById(user2id)
        if(!user2) {
            return res.status(404).json(
                {
                    success: false,
                    message: "User to follow not found!"
                }
            )
        }

        //3. If both users exist - then check if user1 is following user2 if yes, unfollow, else follow
        const isFollowing = user1.following.includes(user2id);
        if (isFollowing) {
            user2.followers.pull(user1id);
            user1.following.pull(user2id);
        } else {
            user2.followers.push(user1id);
            user1.following.push(user2id);
        }
        await user2.save();
        await user1.save();

        res.status(200).json(
            {
                success: true,
                message: isFollowing ? "User unfollowed!" : "User followed!",
            }
        )
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "Error interacting with the selected user!",
                error: error.message
            }
        )
    }
}

// TIMELINE CRUD

export const showTimeline = async (req, res) => {
    try {
        // Get ID of the user requesting their timeline
        const userId = req.tokenData.id;

        // Validate user existence
        const user = await User.findById(userId);

        if(!user) {
            return res.status(404).json({
                success: false,
                message: "User not found!"
            });
        }
        
        let following = user.following.filter(id => id);
        // Fetch all posts from users that the current user is following
        const posts = await Post.find({ userId: { $in: following } }).sort({ createdAt: -1 });

        // Return the fetched posts
        res.status(200).json({
            success: true,
            message: "Posts fetched successfully!",
            data: posts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching posts!",
            error: error.message
        });
    }
}