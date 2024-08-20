const Product = require("../../models/product.model");

module.exports.products = async (req, res) => {

    let query = req.query;

    let filter = {};

    if (req.query.status) {
        filter.status = query.status;
    }

    let keyword = "";
    if (req.query.keyword) {
        keyword = req.query.keyword;
        let regex = new RegExp(keyword, "i");
        filter.title = regex;
    }

    let filterBar = [
        { name: "All", status: "", class: "" },
        { name: "Available", status: "available", class: "" },
        { name: "Unavailable", status: "unavailable", class: "" }
    ]

    if (req.query.status) {
        for (let element of filterBar) {
            if (element.status === req.query.status) {
                element.class = "active";
                break;
            }
        }
    }
    else {
        filterBar[0].class = "active";
    }

    let products = await Product.find(filter);

    res.render("admin/pages/products/index", {
        products: products,
        filterBar: filterBar,
        keyword: keyword
    });
}
