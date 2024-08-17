import User from "../models/User.js"
import Post from "../models/Post.js"
import mongoose from "mongoose";

const seedUsers = async () => {
  // Assuming you have a User model
  await User.deleteMany({});
  await User.insertMany(users);
};

const seedPosts = async () => {
  // Assuming you have a Post model
  await Post.deleteMany({});
  await Post.insertMany(posts);
};

const seedDB = async () => {
  await mongoose.connect('mongodb://localhost:27017/yourDatabaseName', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  
  await seedUsers();
  console.log('Users seeded successfully');
  
  await seedPosts();
  console.log('Posts seeded successfully');
  
  mongoose.disconnect();
};

seedDB().catch(err => {
  console.error('Failed seeding database', err);
  mongoose.disconnect();
});
