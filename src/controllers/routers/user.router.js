const express = require('express');
const User = require('../../services/User.service');

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

router.delete('/:id', async (req, res, next) => {
    try {
        const params = req.params;
        console.log(params);
        const data = await service.delete(params);
        res.status(201);
        res.json(data);
    }
    catch (error) {
        next(error)
    }
});

module.exports = router;