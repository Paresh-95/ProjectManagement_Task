// corsMiddleware.js
const cors = require("cors");

const corsMiddleware = (req, res, next) => {
    // Define allowed origins
    const allowedOrigins = [
        'http://localhost:3000', // Development URL
        'https://project-management-task-u2qo.vercel.app', // Your deployed frontend URL
        process.env.FRONTEND_URL // Additional dynamic frontend URL from environment variables
    ];

    const origin = req.headers.origin;

    // Check if the origin is allowed
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.setHeader('Access-Control-Max-Age', '1800');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Add any other headers your app needs
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');

        // Handle preflight request
        if (req.method === 'OPTIONS') {
            return res.sendStatus(204); // No Content
        }
    } else {
        // If origin is not allowed, respond with a 403 Forbidden
        return res.status(403).send('CORS policy: Access denied');
    }

    // Proceed to the next middleware or route handler
    next();
};

module.exports = corsMiddleware;
