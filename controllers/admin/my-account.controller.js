const Account = require('../../models/account.model');
const Role = require('../../models/role.model');
const systemConfig = require('../../config/system');
const md5 = require('md5')

// [get] /admin/my-account
module.exports.index = (req, res) => {
    res.render(
        'admin/pages/my-account/index',
        {
            pageTitle: 'Personal Information'
        }
    );
};


// [get] /admin/my-account/edit
module.exports.edit = (req, res) => {
    res.render(
        'admin/pages/my-account/edit',
        {
            pageTitle: 'Edit personal Information'
        }
    );
};

// [patch] /admin/my-account/edit
module.exports.editPatch = async (req, res) => {
    let id = res.locals.user._id;

    if (req.body.password) {
        req.body.password = md5(req.body.password);
    }
    else {
        delete req.body.password;
    }


    let checkEmail = await Account.findOne({ email: req.body.email, _id: { $ne: id }, deleted: false });
    if (checkEmail) {
        req.flash('error', `Email ${req.body.email} is already existed`);
        res.redirect(`${systemConfig.prefixAdmin}/my-account/edit`);
    }
    else {
        await Account.updateOne({ _id: id }, req.body);

        req.flash('success', 'Edit account successfully');
        res.redirect(`${systemConfig.prefixAdmin}/my-account`);
    }
};