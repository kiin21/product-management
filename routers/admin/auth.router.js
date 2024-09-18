const express = require('express');
const router = express.Router();
const controller = require('../../controllers/admin/auth.controller');
const validator = require('../../validates/admin/login.validate');

router.get('/login', controller.login);
router.post('/login',
    validator.login,
    controller.loginPost);

module.exports = router;