const Product = require("../../models/product.model");

module.exports.index = async (req, res) => {
    let products = await Product.find({});

    const newProducts = products.map(element => {
        element.newPrice = (element.price / (1 - element.discountPercentage / 100)).toFixed(2);
        return element;
    });

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
                // status: 'available'
            });

        res.render("client/pages/products/detail.pug", {
            pageTitle: "Product detail",
            product: product
        });

    } catch (err) {
        res.render("/products")
    }
}
