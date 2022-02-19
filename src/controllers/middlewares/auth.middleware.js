require('dotenv').config();

const auth = {}

auth.checkKey = (req, res, next) => {
    const key = req.headers['api'];
    if (process.env.KEY == key) {
        next();
    } else {
        const error = new Error();
        error.name = 'No autorizado';
        error.message = 'No autorizado';
        next(error);
    }
}

module.exports = auth;