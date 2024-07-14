import express from 'express';
import 'dotenv/config';
import { dbConnection } from './database/db.js';
import rootRouter from './router.js';

const app = express();
app.use(express.json())

const PORT = process.env.PORT

app.get('/healthy', (req, res) => {
    res.json({
        success: true,
        message: "Server is healthy!"
    });
});

app.use('/api', rootRouter)   

dbConnection()
   .then(() => {
    console.log('Connected to MongoDB!');
    app.listen(PORT, () => {
        console.log(`Server running on port: ${PORT}.`)
        console.log('============');
    });
   }) .catch(error => {
    console.error('Error establishing connection with the database:', error)
   });