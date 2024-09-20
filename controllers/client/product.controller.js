const Product = require("../../models/product.model");
const productHelper = require("../../helpers/product");

module.exports.index = async (req, res) => {
    let products = await Product.find({});

    const newProducts = productHelper.fixedPrice(products);

    res.render("client/pages/products/index.pug", {
        pageTitle: "Products",
        products: newProducts
    });
}

module.exports.detail = async (req, res) => {
    try {
        let product = await Product.findOne(
            {
                slug: req.params.slug,
                deleted: false,
            });

        res.render("client/pages/products/detail.pug", {
            pageTitle: "Product detail",
            product: product
        });

    } catch (err) {
        res.render("/products")
    }
}
