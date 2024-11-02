// corsMiddleware.js
require("dotenv").config();


const corsMiddleware = (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", process.env.FRONTEND_URL); // Change "*" to your front-end URL if using credentials
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204); // No content response for OPTIONS
    }

    next(); // Move to the next middleware or route handler
};

module.exports = corsMiddleware;
