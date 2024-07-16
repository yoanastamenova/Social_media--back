import User from "../users/user.model.js";
import Post from "./post.model.js";

export const createPost = async (req, res) => {
    try {
        //1. Get the needded data for a post creation
        const { message } = req.body;
        const userId = req.tokenData.id;

        //2. Validate our info if is empty && user exists
        if (!message) {
            res.status(400).json(
                {
                    success: false,
                    message: "Post message cannot be empty!"
                }
            )
        }

        const user = await User.findOne(
            {
                _id: userId
            }
        )

        if (!user) {
            return res.status(404).json(
                {
                    status: false,
                    message: "User does not exist!"
                }
            )
        }

        //3. Create the post in our database
        const newPost = await Post.create(
            {
                userId: userId,
                message: message
            }
        )

        //4. Respond
        res.status(201).json(
            {
                success: true,
                message: "Post created successfully!",
                data: newPost
            }
        )

    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "Error creating new post!",
                error: error.message
            }
        )
    }

}

export const deletePost = async (req, res) => {
    try {
        //1. Obtain the post id 
        const postId = req.params._id;

        //2. Find it in our DB
        const post = await Post.findOne(
            {
                _id: postId
            }
        )

        if(!post) {
            return res.status(404).json(
                {
                    success: false,
                    message: "Post not found!"
                }
            )
        }
        //3. Delete the post from our DB
        const deleted = await Post.deleteOne(
            {
                _id: postId
            }
        )

        //4. Confirm it 
        res.status(200).json(
            {
                success: true,
                message: "Post was deleted successfully!",
                data: deleted
            }
        )

    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "Error deleting post!",
                error: error.message
            }
        )
    }
}