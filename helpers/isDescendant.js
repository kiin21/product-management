const ProductCategory = require("../models/product-category.model");

module.exports.isDescendant = async (item, parentId) => {
    if (!item.parent_id) {
        return false;
    }
    if (item.parent_id.toString() === parentId.toString()) {
        return true;
    }

    const parent = await ProductCategory.findOne({ _id: item.parent_id });
    return module.exports.isDescendant(parent, parentId);
};