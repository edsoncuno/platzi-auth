const { Strategy } = require('passport-local');
const UserService = require('./../../../services/User.service');

const service = new UserService();

const LocalStrategy = new Strategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        const user = await service.checkUser(email, password);
        done(null, user);
    } catch (error) {
        done(error, false);
    }
});

module.exports = LocalStrategy;