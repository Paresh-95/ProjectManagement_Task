const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
    try {
       
        let token = req.cookies.token || req.body.token || (req.header("Authorization") && req.header("Authorization").replace("Bearer ", "").trim())

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token Missing"
            });
        }

        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            req.user = payload;
            next(); 
        } catch (error) {
            console.log(error);
            return res.status(401).json({
                success: false,
                message: "Token is Invalid"
            });
        }

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            success: false,
            message: "Something went wrong while verifying the token"
        });
    }
}
