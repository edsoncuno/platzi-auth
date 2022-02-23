const express = require('express');
const User = require('../../services/User.service');
const passport = require('passport');
const authenticationMiddleware = require('./../middlewares/authentication.middleware');

const router = express.Router();
const service = new User();

router.get('/', async (req, res, next) => {
    try {
        const data = await service.toList();
        res.json(data);
    }
    catch (error) {
        next(error)
    }
});

router.delete('/:id',
    passport.authenticate('jwt', { session: false }),
    authenticationMiddleware.checkRoles(['customer', 'admin']),
    async (req, res, next) => {
        try {
            console.log(req.user); // { sub: '6214cd241fa14ab3e12bca0e', role: 'admin', iat: 1645541970 }
            const params = req.params;
            console.log(params); // { id: '621501c120e40c5489562516' }
            const data = await service.delete(params);
            res.status(200);
            res.json(data);
        }
        catch (error) {
            next(error)
        }
    });

module.exports = router;