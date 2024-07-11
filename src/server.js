import express from 'express';
import 'dotenv/config';
import { dbConnection } from './database/db.js';

const app = express();
app.use(express.json())

const PORT = process.env.PORT

app.get('/healthy', (req, res) => {
    res.json({
        success: true,
        message: "Server is healthy!"
    });
});

dbConnection()
   .then(() => {
    console.log('Database connection established!');
    app.listen(PORT, () => {
        console.log(`Server running on ${PORT}. No issues found.`)
    });
   }) .catch(error => {
    console.error('Error establishing connection with the database:', error)
   });
