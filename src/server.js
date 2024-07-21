import express from 'express';
import 'dotenv/config';
import { dbConnection } from './database/db.js';
import rootRouter from './router.js';

const app = express();
app.use(express.json())
const PORT = process.env.PORT

app.get('/home', (req, res) => {
    res.json({
        success: true,
        message: "Welcome to home page!"
    });
});

app.use('/api', rootRouter);   

dbConnection()
   .then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port: ${PORT}.`)
        console.log('============');
    });
   }) .catch(error => {
    console.error('Error establishing connection with the database:', error)
   });