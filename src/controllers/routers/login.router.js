const express = require('express');
const passport = require('passport');

const router = express.Router();

router.post('', passport.authenticate('local', { session: false }), async (req, res, next) => {
    try {
        const data = req.user;
        res.json(data);
    } catch (error) {
        next(error);
    }
});

module.exports = router;