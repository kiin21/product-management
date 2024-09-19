const ProductCategory = require("../../models/product-category.model");
const createTree = require("../../helpers/createTree");

module.exports.category = async (req, res, next) => {
    let filter = {
        deleted: false
    };
    const records = await ProductCategory.find(filter); // Get all records from ProductCategory
    const newRecords = createTree.tree(records); // Create tree structure
    res.locals.layoutProductCategory = newRecords; // Set layoutProductCategory to res.locals
    next();
}