const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('', passport.authenticate('local', { session: false }), async (req, res, next) => {
    try {
        const data = req.user;
        const payload = {
            sub: data._id,
            role: data.role
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET);
        res.json({ data, token });
    } catch (error) {
        next(error);
    }
});

module.exports = router;