const ProductCategory = require("../../models/product-category.model");
const Product = require("../../models/product.model");
const createTree = require("../../helpers/createTree");

const productHelper = require("../../helpers/product");

// [get] /
module.exports.index = async (req, res) => {
    //get category
    const records = await ProductCategory.find({ deleted: false });
    const newRecords = createTree.tree(records);

    // get featured products
    const featuredProducts = await Product.find(
        {
            deleted: false,
            featured: true,
            status: "available"
        }
    );

    const newProducts = productHelper.fixedPrice(featuredProducts);

    res.render("client/pages/home/index", {
        pageTitle: "Home",
        layoutProductCategory: newRecords,
        featuredProducts: newProducts
    });
}

