const express = require('express');

const signUpRouter = require('./signUp.router');
const userRouter = require('./user.router');

const authMiddleware = require('./../../controllers/middlewares/auth.middleware');

const routers = (app) => {
    const router = express.Router();
    app.use('', router);
    router.use('/sign-up', signUpRouter);
    router.use('/user', authMiddleware.checkKey, userRouter);
}

module.exports = routers;