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
                message: "Forbidden: Invalid role!!!"
            })
        }
        req.tokenData = {                                            
            id: decoded.id,
            role: decoded.role           
        }
        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({
                success: false,
                message: "Invalid token"
            });
        } else if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({
                success: false,
                message: "Token expired"
            });
        } else {
            return res.status(500).json({
                success: false,
                message: "Error processing request",
                error: error.message
            });
        }
    }
}