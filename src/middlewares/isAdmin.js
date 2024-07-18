import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const isAdmin = (req, res, next) => {
    try {
        if(!req.headers.authorization) {                
            return res.status(401).json({
                success: false,
                message: "Unauthorized access!"
            })
        }
        const token = req.headers.authorization.split(' ')[1];            
        const decoded = jwt.verify(token, process.env.JWT_SECRET)         
        if(decoded.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: "Forbidden: Invalid role"
            })
        }
        req.tokenData = {                                            
            id: decoded.id,
            role: decoded.role           
        }
        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error authenticating user",
            error: error
        })
    }
}