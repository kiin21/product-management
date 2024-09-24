const User = require('../../models/user.model');

module.exports.infoUser = async (req, res, next) => {
    const userToken = req.cookies.userToken;
    if (userToken) {
        res.locals.user = await User.findOne(
            { userToken: userToken, deleted: false, status: "active" }
        ).select("-password");
    }
    next();
};