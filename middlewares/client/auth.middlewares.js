const systemConfig = require('../../config/system');
const User = require('../../models/user.model');

module.exports.requireAuth = async (req, res, next) => {
    let token_ = req.cookies.userToken;
    if (!token_) {
        res.redirect(`/user/login`);
    } else {
        const user = await User.findOne({ userToken: token_ }).select("-password");

        if (!user) {
            res.redirect(`/user/login`);
        } else {
            res.locals.user = user;
            next();
        }
    }
}