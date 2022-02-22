const { Strategy } = require('passport-local');
const UserService = require('./../../../services/User.service');
const bcrypt = require('bcrypt');

const service = new UserService();

const LocalStrategy = new Strategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        const user = await service.findByCorreo(email);
        if (user == null) {
            const data = { error: true, severity: 'info', summary: 'No existe el usuario', detail: 'El usuario no esta registrado' };
            done(null, data);
        } else {
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                const data = { error: true, severity: 'info', summary: 'La contraseña es incorrrecta', detail: 'La contraseña es incorrrecta' };
                done(null, data);
            } else {
                delete user.password;
                user.role  = 'admin';
                done(null, user);
            }
        }
    } catch (error) {
        done(error, false);
    }
});

module.exports = LocalStrategy;