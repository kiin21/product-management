const Product = require("../../models/product.model");

module.exports.products = async (req, res) => {

    let query = req.query;

    let filter = {};
    if (req.query.status) {
        filter.status = query.status;
    }

    let filterBar = [
        { name: "All", status: "", class: "" },
        { name: "Avaiable", status: "available", class: "" },
        { name: "Unavaiable", status: "unavailable", class: "" }
    ]

    if (req.query.status) {
        for (let element of filterBar) {
            if (element.status === req.query.status) {
                element.class = "active";
                break;
            }
        }
    }
    else{
        filterBar[0].class = "active";
    }

    let products = await Product.find(filter);

    res.render("admin/pages/products/index", {
        products: products,
        filterBar: filterBar
    });
}
