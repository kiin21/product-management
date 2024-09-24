const User = require("../../models/user.model");
const md5 = require('md5')
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