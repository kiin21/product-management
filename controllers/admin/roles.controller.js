const Role = require('../../models/roles.model');
const systemConfig = require('../../config/system');

// [get] /admin/roles
module.exports.roles = async (req, res) => {
    let filter = { deleted: false };
    let roles = await Role.find(filter);


    res.render('admin/pages/roles/index', {
        pageTitle: 'Roles',
        roles: roles
    });
}

// [get] /admin/create
module.exports.create = async (req, res) => {
    res.render('admin/pages/roles/create', {
        pageTitle: 'Add new role'
    });
}

// [post] /admin/create
module.exports.createPost = async (req, res) => {
    let record = new Role(req.body);
    await record.save();

    console.log(record, req.body);

    res.redirect(`${systemConfig.prefixAdmin}/roles`);
}

// [get] /admin/edit/:id
module.exports.edit = async (req, res) => {
    let id = req.params.id;
    let role = await Role.findById(id);

    res.render('admin/pages/roles/edit', {
        pageTitle: 'Edit role',
        role: role
    });
}
// [patch] /admin/edit/:id
module.exports.editPatch = async (req, res) => {
    let id = req.params.id;

    await Role.updateOne({ _id: id }, req.body);

    res.redirect(`${systemConfig.prefixAdmin}/roles/edit/${id}`);
}

// [get] /admin/detail/:id
module.exports.detail = async (req, res) => {
    let id = req.params.id;
    let role = await Role.findById(id);

    res.render('admin/pages/roles/detail', {
        pageTitle: 'Role detail',
        role: role
    });
}

// [delete] /admin/delete/:id
module.exports.delete = async (req, res) => {
    let id = req.params.id;

    await Role.updateOne({ _id: id }, { deleted: true, deletedAt: new Date() });

    res.redirect(`${systemConfig.prefixAdmin}/roles`);
}

// [get] /admin/roles/permissions
module.exports.permissions = async (req, res) => {
    let filter = { deleted: false };

    let records = await Role.find(filter);

    res.render('admin/pages/roles/permissions', {
        pageTitle: 'Roles permissions',
        records: records
    });
}

// [patch] /admin/roles/permissions
module.exports.permissionsPatch = async (req, res) => {
    let records = JSON.parse(req.body.permissions);

    records.forEach(async record => {
        await Role.updateOne({ _id: record.id }, { permission: record.permissions });
    });

    req.flash('success', 'Update permissions successfully');
    res.redirect(`${systemConfig.prefixAdmin}/roles/permissions`);
}