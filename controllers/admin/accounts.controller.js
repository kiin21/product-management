const Account = require('../../models/account.model');
const Role = require('../../models/role.model');
const systemConfig = require('../../config/system');
const md5 = require('md5')

// [get] /admin/accounts
module.exports.index = async (req, res) => {
    let filter = { deleted: false };
    let accounts = await Account.find(filter).select('-password -token');

    for (const acc of accounts) {
        let role = await Role.findOne({ _id: acc.role_id });
        acc.role = role;
    }

    console.log(accounts);

    res.render('admin/pages/accounts/index', {
        pageTitle: 'Accounts',
        accounts: accounts,
    });
}

// [get] /admin/create
module.exports.create = async (req, res) => {
    let filter = { deleted: false };
    let roles = await Role.find(filter);
    res.render('admin/pages/accounts/create', {
        pageTitle: 'Add new account',
        roles: roles,
    });
}

// [post] /admin/create
module.exports.createPost = async (req, res) => {
    req.body.password = md5(req.body.password);

    const existedEmail = await Account.findOne({ email: req.body.email, deleted: false });

    console.log(existedEmail);

    if (existedEmail) {
        req.flash('error', 'Email is existed');
        res.redirect(`${systemConfig.prefixAdmin}/accounts/create`);
        return;
    }
    else {
        const record = new Account(req.body);

        await record.save();
        req.flash('success', 'Create account successfully');
        res.redirect(`${systemConfig.prefixAdmin}/accounts`);
    }
}

// [get] /admin/edit/:id
module.exports.edit = async (req, res) => {
    let filter = {
        _id: req.params.id,
        deleted: false
    };

    let roles = await Role.find({ deleted: false });

    let account = await Account.findOne(filter);

    res.render('admin/pages/accounts/edit', {
        pageTitle: 'Edit account',
        account: account,
        roles: roles
    });

}

// [patch] /admin/edit/:id
module.exports.editPatch = async (req, res) => {
    if (req.body.password) {
        req.body.password = md5(req.body.password);
    }
    else {
        delete req.body.password;
    }

    let id = req.params.id;

    let checkEmail = await Account.findOne({ email: req.body.email, _id: { $ne: id }, deleted: false });
    if (checkEmail) {
        req.flash('error', `Email ${req.body.email} is already existed`);
        res.redirect(`${systemConfig.prefixAdmin}/accounts/edit/${id}`);
    }
    else {
        await Account.updateOne({ _id: id }, req.body);

        req.flash('success', 'Update account successfully');
        res.redirect(`${systemConfig.prefixAdmin}/accounts`);
    }
}