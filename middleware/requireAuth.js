import jwt from 'jsonwebtoken';

// Middleware to require authentication using JWT
const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers; // Extract authorization header

    // Check if authorization header is present
    if (!authorization) {
        return res.status(401).json({ message: 'Unauthorized' }); // No token provided
    }

    // Extract the token from the header
    const token = authorization.split(' ')[1]; // Assumes the format "Bearer token"

    try {
        // Verify the token using the secret
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Attach user info and token to the request object
        req.user = decoded; 
        req.token = token; 
        next(); // Call the next middleware or route handler
    } catch (error) {
        // Handle token verification failure
        return res.status(401).json({ message: 'Invalid token' }); // Return unauthorized status for invalid tokens
    }
};

export default requireAuth; // Export the middleware
