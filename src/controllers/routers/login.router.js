const express = require('express');
const passport = require('passport');

const Login = require('../../services/Login.service');
const service = new Login();

const router = express.Router();

router.post('', passport.authenticate('local', { session: false }), async (req, res, next) => {
    try {
        const user = req.user;
        if (user.error) {
            res.json(user);
        } else {
            const token = service.signToken(user);
            res.json({ user, token });
        }
    } catch (error) {
        next(error);
    }
});

module.exports = router;