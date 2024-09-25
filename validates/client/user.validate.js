module.exports.register = (req, res, next) => {
    if (!req.body.fullname) {
        req.flash('error', 'Fullname is required');
        res.redirect('back');
    }

    if (!req.body.email) {
        req.flash('error', 'Email is required');
        res.redirect('back');
    }

    if (!req.body.password) {
        req.flash('error', 'Password is required');
        res.redirect('back');
    }

    next();
}

module.exports.loginPost = (req, res, next) => {
    if (!req.body.email) {
        req.flash('error', 'Email is required');
        res.redirect('back');
    }

    if (!req.body.password) {
        req.flash('error', 'Password is required');
        res.redirect('back');
    }
    next();
}

module.exports.confirmPasswordPost = (req, res, next) => {
    if (!req.body.password || !req.body.confirmPassword) {
        req.flash('error', 'Please enter password and confirm password');
        res.redirect('/user/password/reset');
        return;
    }
    if (req.body.password !== req.body.confirmPassword) {
        req.flash('error', 'Password and confirm password do not match');
        res.redirect('/user/password/reset');
        return;
    }
    next();
}

