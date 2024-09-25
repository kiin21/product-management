const User = require("../../models/user.model");
const RecoverPassword = require("../../models/recoverPassword.model");
const md5 = require('md5')
const generatorHelper = require('../../helpers/generate');
const sendMailHelper = require('../../helpers/sendMail');

// [get] /user/register
module.exports.register = (req, res) => {
    res.render("client/pages/user/register");
};

// [post] /user/register
module.exports.registerPost = async (req, res) => {
    const existedEmail = await User.findOne({ email: req.body.email });
    if (existedEmail) {
        req.flash('error', 'Email already exists');
        res.redirect('/user/register');
    } else {
        req.body.password = md5(req.body.password);
        const user = new User(req.body);
        await user.save();

        res.cookie('userToken', user.userToken)
        res.redirect('/');
    }
}

// [get] /user/login
module.exports.login = (req, res) => {
    res.render("client/pages/user/login");
};

// [post] /user/login
module.exports.loginPost = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({ email: email, password: md5(password) });
    if (!user) {
        req.flash('error', 'Email or password is incorrect');
        res.redirect('/user/login');
        return;
    }
    if (user.status === 'inactive') {
        req.flash('error', 'Your account is inactive');
        res.redirect('/user/login');
        return;
    }

    res.cookie('userToken', user.userToken)
    res.redirect('/');
}

// [get] /user/logout
module.exports.logout = (req, res) => {
    res.clearCookie('userToken');
    res.redirect('/');
}

// [get] /user/password/recover
module.exports.recoverPassword = (req, res) => {
    res.render("client/pages/user/recover-password", {
        pageTitle: "Recover Password"
    });
}
// [post] /user/password/recover
module.exports.recoverPasswordPost = async (req, res) => {
    const user = await User.findOne({ email: req.body.email, deleted: false });

    if (!user) {
        req.flash('error', 'Email does not exist');
        res.redirect('/user/password/recover');
        return;
    }

    const recoverPassword = new RecoverPassword({
        email: req.body.email,
        OTP: generatorHelper.generateOTP(6)
    });
    await recoverPassword.save();

    const subject = 'Password Recovery';
    const contentHTML =
        `<h1>Your OTP is: <b>${recoverPassword.OTP}</b>. This will expire in 5 minutes.</h1>`;

    sendMailHelper.sendMail(
        recoverPassword.email,
        subject,
        contentHTML
    );

    res.redirect(`/user/password/otp?email=${req.body.email}`);
}

// [get] /user/password/otp
module.exports.otpPassword = async (req, res) => {
    const email = req.query.email;
    const OTP_expired_time = process.env.OTP_EXPIRED_TIME; // in seconds

    res.render("client/pages/user/otp-password", {
        pageTitle: "OTP Password",
        email: email,
        OTP_expired_time: OTP_expired_time // seconds
    });
}

// [post] /user/password/otp
module.exports.otpPasswordPost = async (req, res) => {
    const email = req.body.email;
    const OTP = req.body.OTP;

    console.log('CHECK', email, OTP)

    const checkExisted = await RecoverPassword.findOne({ email: email, OTP: OTP });
    if (!checkExisted) {
        req.flash('error', 'OTP is incorrect');
        res.redirect(`/user/password/recover`);
        return;
    }
    req.flash('success', 'OTP is correct');
    const user = await User.findOne({ email: email });
    res.cookie('userToken', user.userToken);
    res.redirect(`/user/password/reset`);
}

// [get] /user/password/reset
module.exports.resetPassword = async (req, res) => {
    res.render("client/pages/user/reset-password", {
        pageTitle: "Reset Password"
    });
}

// [post] /user/password/reset
module.exports.resetPasswordPost = async (req, res) => {
    const userToken = req.cookies.userToken;
    const user = await User.findOne({ userToken: userToken });
    user.password = md5(req.body.password);
    await user.save();
    res.redirect('/user/login');
}

// [get] /user/profile
module.exports.profile = async (req, res) => {
    const userToken = req.cookies.userToken;
    const user = await User.findOne({ userToken: userToken });
    res.render("client/pages/user/profile", {
        pageTitle: "Profile",
        user: user
    });
}