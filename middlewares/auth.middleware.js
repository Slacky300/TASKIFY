const jwt = require('jsonwebtoken');
require('dotenv').config();

const validateToken = async (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(401).json({message:"Please Log In Again"});
            } else {
                req.user = decoded;
                next();
            }
        });
    } else {
        res.status(401).json({message:"Please Log In Again"});
    }
};

module.exports = { validateToken };