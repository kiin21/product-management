const ProductCategory = require("../../models/product-category.model");
const createTree = require("../../helpers/createTree");

// [get] /
module.exports.index = async (req, res) => {
    let filter = {
        deleted: false
    };
    const records = await ProductCategory.find(filter);
    const newRecords = createTree.tree(records);
    console.log("Records", newRecords);

    res.render("client/pages/home/index", {
        pageTitle: "Home",
        layoutProductCategory: newRecords
    });
}

