const User = require('../../models/user.model');
const RecoverPassword = require('../../models/recoverPassword.model');

module.exports.infoUser = async (req, res, next) => {
    const userToken = req.cookies.userToken;
    if (userToken) {
        res.locals.user = await User.findOne(
            { userToken: userToken, deleted: false, status: "active" }
        ).select("-password");
    }
    next();
};

module.exports.checkIfOTPExpired = async (req, res, next) => {
    const email = req.query.email;
    const recoverPassword = await RecoverPassword.findOne({ email: email });
    if (!recoverPassword) {
        req.flash('error', 'OTP is expired');
        res.redirect('/user/password/recover');
        return;
    }
    next();
}