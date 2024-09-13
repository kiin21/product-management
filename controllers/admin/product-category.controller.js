const ProductCategory = require("../../models/product-category.model");

const systemConfig = require('../../config/system');
const { get } = require("mongoose");

// [get] /admin/product-category
module.exports.index = async (req, res) => {

    let filter = { deleted: false };

    const records = await ProductCategory.find(filter);

    res.render("admin/pages/product-category/index", {
        pageTitle: "Product Category",
        records: records
    });
}

// [get] /admin/product-category/create
module.exports.create = (req, res) => {
    res.render("admin/pages/product-category/create", {
        pageTitle: "Create Product Category"
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
