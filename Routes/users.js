const express = require('express');
const router = express.Router();
const { register, login, verifyUser } = require('../Controllers/userControllers')

router.post('/register', async (req, res) => {
    await register(req, res)
})
router.post('/login', async (req, res) => {
    await login(req, res)
})
router.post('/verify', async (req, res) => {
    const user = await verifyUser(req, res);
    user
        ? res.status(200).send({ auth: true, user })
        : res.status(304).send({ auth: false, user })
})
module.exports = router