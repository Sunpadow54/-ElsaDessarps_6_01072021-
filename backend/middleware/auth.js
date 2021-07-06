// autho Token
// ------------------------- IMPORTS -------------------------

const jwToken = require('jsonwebtoken');

// ============================================================
// ---------------------- Middlewares -------------------------

module.exports = (req, res, next) => {
    try {
        // get the token from header and compare
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwToken.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;

        // if id is not ok
        if (req.body.userId && req.body.userId !== userId) {
            throw 'Invalid user ID';
        } 

        // if id is ok
        else {
            next();
        }
    }
    
    // error
    catch {
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
};