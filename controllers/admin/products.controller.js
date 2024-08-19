const Product = require("../../models/product.model");

module.exports.products = async (req, res) => {
    let products = await Product.find({});
    res.render("admin/pages/products/index", {
        products: products
    });
}
