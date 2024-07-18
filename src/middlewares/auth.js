import jwt from 'jsonwebtoken';
import 'dotenv/config'

export const auth = (req, res, next) => {
    try {
        if(!req.headers.authorization) {                   //check if token is passed 
            return res.status(401).json(
                {
                    success: false,
                    message: "Unauthorized access!"
                }
            )
        }
        const token = req.headers.authorization.split(' ')[1];              //split token to read it
        const decoded = jwt.verify(token, process.env.JWT_SECRET)          //check if token is with the correct secret word
        req.tokenData = {                                                 //save the data we see if we decode the code of the token of the token as logging session
            id: decoded.id,
            role: decoded.role           
        }
        next();
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "Error authenticating user",
                error: error
            }
        )
    }
}