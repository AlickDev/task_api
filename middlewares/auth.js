const jwt = require('jsonwebtoken');
const userRepo = require('../repository/user_repo')
exports.auth = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(403).send({ message: 'Invalid credentials' });   
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error(error);
        res.status(403).send({ message: 'Invalid token.' });
    }
};

exports.isAdmin = async (req, res, next)=>{
    try {
        const {user_id, com_id} = req.user;
        const user = await userRepo.userCheck(user_id, com_id);

        if(!user || user.role_id != 1){
            res.status(400).send({error:'No Permistion.'})
        }

        next();
    } catch (error) {
        console.error(error);
        res.status(403).send({ message: 'No Permistion.' });
    }
}