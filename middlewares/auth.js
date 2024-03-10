const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
    try {
        const token = req.headers.get('Authorization');
        if (!token) {
            return res.status(403).send({message:'Invalid credentials'});   
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded.user
        next();
    } catch (error) {
        console.error(error);
        res.status(403).send({message:'Invalid token.'});
    }
};