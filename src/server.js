import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan'
import path from "path";
import authRoutes from "./routes/auth.js"
import { fileURLToPath } from 'url';
import { register } from "./controllers/auth.js"
import userRoutes from "./routes/users.js"
import postRoutes from "./routes/posts.js"
import { verifyToken } from './middleware/auth.js';
import { createPost } from "./controllers/posts.js";
import User from "./models/User.js"
import Post from "./models/Post.js"
import { users, posts } from "./data/index.js"


/* APPLICATION & FILES SETTINGS */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors({
  origin: ['http://localhost:3000'],  // frontend server address
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
  credentials: true  // this allows the server to receive cookies/credentials from the frontend
}));
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* LOCAL FILE STORAGE SETTINGS */

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  const upload = multer({ storage });


/* ROUTES WITH FILES */
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

/* MONGODB SETUP */

const PORT = process.env.PORT || 3001;
mongoose
    .connect(process.env.MONGO_URI, {})
    .then(() => {
        app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    
        /* ADD DATA ONE TIME */
        // User.insertMany(users);
        // Post.insertMany(posts);
      })
      .catch((error) => console.log(`${error} did not connect`));
    
