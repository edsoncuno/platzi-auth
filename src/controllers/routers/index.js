const express = require('express');

const signUpRouter = require('./signUp.router');
const userRouter = require('./user.router');
const loginRouter = require('./login.router');

const routers = (app) => {
    const router = express.Router();
    app.use('', router);
    router.use('/sign-up', signUpRouter);
    router.use('/login', loginRouter);
    router.use('/user', userRouter);
}

module.exports = routers;