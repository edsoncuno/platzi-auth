const jwt = require('jsonwebtoken');

class Login {
    constructor() {
    }
    signToken(user) {
        const payload = {
            sub: user._id,
            role: user.role
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET);
        return token;
    }
}

module.exports = Login;