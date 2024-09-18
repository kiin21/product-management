const systemConfig = require('../../config/system');
const Account = require('../../models/account.model');

module.exports.requireAuth = async (req, res, next) => {
    let token_ = req.cookies.token;
    if (!token_) {
        res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
    } else {
        const user = await Account.findOne({ token: token_ });
        if (!user) {
            res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
        } else {
            next();
        }
    }

}