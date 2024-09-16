const ProductCategory = require("../../models/product-category.model");
const createTree = require("../../helpers/createTree");
const systemConfig = require('../../config/system');
const { get } = require("mongoose");

// [get] /admin/product-category
module.exports.index = async (req, res) => {

    let filter = { deleted: false };

    const records = await ProductCategory.find(filter);

    res.render("admin/pages/product-category/index", {
        pageTitle: "Product Category",
        records: createTree.tree(records)
    });
}

// [get] /admin/product-category/create
module.exports.create = async (req, res) => {
    let filter = { deleted: false };

    let records = await ProductCategory.find(filter);



    res.render("admin/pages/product-category/create", {
        pageTitle: "Create Product Category",
        records: createTree.tree(records)
    });
}

// [post] /admin/product-category/create
module.exports.createPost = async (req, res) => {
    req.body.parent_id = String(req.body.parent_id);
    req.body.description = String(req.body.description);

    console.log("req.body", req.body);

    if (!req.body.position) {
        let amount = await ProductCategory.countDocuments();
        req.body.position = amount + 1;
    } else {
        req.body.position = parseInt(req.body.position);
    }

    let record = new ProductCategory(req.body);
    await record.save();


    res.redirect(`${systemConfig.prefixAdmin}/product-category`);
}

module.exports.deleteCategory = async (req, res) => {
    let id = req.params.id;
    let currentTime = new Date();

    await ProductCategory.updateOne(
        { _id: id },
        {
            deleted: true,
            deletedAt: currentTime
        });

    // // res.redirect('back');
    res.redirect(`${systemConfig.prefixAdmin}/product-category`);
}

// [get] admin/products/edit/:id
module.exports.edit = async (req, res) => {
    try {
        let id = req.params.id;

        let category = await ProductCategory.findOne({ _id: id, deleted: false });

        //find add category
        let filter = { deleted: false };
        let records = await ProductCategory.find(filter);

        //end find add category

        res.render(
            "admin/pages/product-category/edit",
            {
                pageTitle: "Edit category",
                category: category,
                records: createTree.tree(records)
            }
        );
    } catch (err) {
        req.flash('error', 'Category not found');
        res.redirect(`${systemConfig.prefixAdmin}/product-category`);
    }
}
// [patch] admin/products/edit/:id
module.exports.editPostPatch = async (req, res) => {
    req.body.parent_id = String(req.body.parent_id);
    req.body.description = String(req.body.description);

    console.log("req.body edit category", req.body);

    try {
        await ProductCategory.updateOne({ _id: req.params.id }, req.body);
        req.flash('success', 'Edit category successfully');
    } catch (err) {
        req.flash('error', 'Edit category failed');
    }

    // res.redirect(`back`);
    res.redirect(`${systemConfig.prefixAdmin}/product-category/edit/${req.params.id}`);
}


// [patch] admin/product-category/change-status/:status/:ID
module.exports.changeStatus = async (req, res) => {
    let status = req.params.status;
    let ID = req.params.ID;

    await ProductCategory.updateOne({ _id: ID }, { status: status });

    req.flash('success', 'Change status successfully');

    res.redirect(`${systemConfig.prefixAdmin}/product-category`);
}

// [get] admin/product-category/detail/:id
module.exports.detail = async (req, res) => {
    try {
        let Id = req.params.id;

        let category = await ProductCategory.findOne({ _id: Id, deleted: false });

        res.render(
            "admin/pages/product-category/detail",
            {
                pageTitle: category.title,
                category: category
            }
        );
    } catch (err) {
        req.flash('error', 'Category not found');
        res.redirect(`${systemConfig.prefixAdmin}/product-category`);
    }
}