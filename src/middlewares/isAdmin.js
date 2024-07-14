export const isAdmin = (req, res, next) => {
    try {
        if(req.tokenData.role !== 'admin') {
         return res.status(401).json(
            {
            success: false,
            message: "Access denied! You are not admin!"
            }
         )
        }
        
        next();
        
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "Error in checking admin role!"
            }
        )
        
    }
} 
