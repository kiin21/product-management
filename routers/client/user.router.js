const express = require('express');
const router = express.Router();
const controller = require('../../controllers/client/user.controller');
const validator = require('../../validates/client/user.validate');

router.get('/register', controller.register);

router.post('/register',
    validator.register,
    controller.registerPost);

router.get('/login', controller.login);

router.post('/login',
    validator.loginPost,
    controller.loginPost);

router.get('/logout', controller.logout);

module.exports = router;