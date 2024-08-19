const Product = require("../../models/product.model");

module.exports.products = async (req, res) => {
    let products = await Product.find({});

    console.log(products);

    products.forEach(element => {
        if (element.stock === 0) {
            element.status = "out of stock";
        }
        else if (element.stock < 10) {
            element.status = "low stock";
        }
        else {
            element.status = "in stock";
        }
    });

    res.render("admin/pages/products/index", {
        products: products
    });
}
