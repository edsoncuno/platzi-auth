const express = require('express');
const SignUp = require('../../services/SignUp.service');

const router = express.Router();
const service = new SignUp();

router.post('/', async (req, res, next) => {
    try {
        const body = req.body;
        const data = await service.createAccount(body);
        res.status(201);
        res.json(data);
    }
    catch (error) {
        next(error)
    }
});

module.exports = router;