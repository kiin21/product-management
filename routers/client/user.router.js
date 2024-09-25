const express = require('express');
const router = express.Router();
const controller = require('../../controllers/client/user.controller');
const validator = require('../../validates/client/user.validate');
const otpMiddleware = require('../../middlewares/client/user.middlewares');
const authMiddleware = require('../../middlewares/client/auth.middlewares');

router.get('/register', controller.register);

router.post('/register',
    validator.register,
    controller.registerPost);

router.get('/login', controller.login);

router.post('/login',
    validator.loginPost,
    controller.loginPost);

router.get('/logout', controller.logout);

router.get('/password/recover', controller.recoverPassword);

router.post('/password/recover', controller.recoverPasswordPost);

router.get('/password/otp',
    otpMiddleware.checkIfOTPExpired,
    controller.otpPassword);

router.post('/password/otp',
    controller.otpPasswordPost);

router.get('/password/reset', controller.resetPassword);

router.post('/password/reset',
    validator.confirmPasswordPost,
    controller.resetPasswordPost);

router.get('/profile',
    authMiddleware.requireAuth,
    controller.profile);

module.exports = router;