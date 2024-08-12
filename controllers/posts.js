import Post from "../models/Post.js";
import User from "../models/User.js";

/* CREATE */
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();

    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* DELETE */
export const deletePost = async (req, res) => {
  const { postId } = req.params;
  const userIdFromToken = req.user.id;

  try {
      const post = await Post.findById(postId);
      if (!post) {
          return res.status(404).json({ message: "Post not found" });
      }

      if (post.userId.toString() !== userIdFromToken) {
          return res.status(401).json({ message: "Unauthorized: You can only delete your own posts." });
      }

      // Use findByIdAndDelete instead of findByIdAndRemove
      await Post.findByIdAndDelete(postId);
      res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
      res.status(500).json({ message: "Server error: " + err.message });
  }
};

/* UPDATE POST DESCRIPTION */
export const updatePost = async (req, res) => {
  const { postId } = req.params;
  const { description } = req.body;
  const userIdFromToken = req.user.id; // Assuming your authentication middleware adds user id to req.user

  try {
      const post = await Post.findById(postId);
      if (!post) {
          return res.status(404).json({ message: "Post not found" });
      }

      if (post.userId.toString() !== userIdFromToken) {
          return res.status(401).json({ message: "Unauthorized: You can only update your own posts." });
      }

      post.description = description;
      const updatedPost = await Post.findByIdAndUpdate(postId, { description: post.description }, { new: true });
      res.status(200).json(updatedPost);
  } catch (err) {
      res.status(500).json({ message: "Server error: " + err.message });
  }
};

//ADMIN CRUD
// GET ALL POSTS

export const getAllPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// DELETE POST

export const errasePost = async (req, res) => {
  const { postId } = req.params;
  
  try {
      const post = await Post.findById(postId);
      if (!post) {
          return res.status(404).json({ message: "Post not found" });
      }

      await Post.findByIdAndDelete(postId);
      res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
      res.status(500).json({ message: "Server error: " + err.message });
  }
};