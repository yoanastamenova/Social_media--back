export const isAdmin = (req, res, next) => {
    try {
        if(req.tokenData.role_id !== 2) {
         return res.status(400).json(
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
