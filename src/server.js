import express from 'express';
import 'dotenv/config'

const app = express();
app.use(express.json())

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}. No issues found.`)
})

app.get('/healthy', (req, res) => {
    res.json({
        success: true,
        message: "Server is healthy!"
    });
});