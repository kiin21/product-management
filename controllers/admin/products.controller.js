const Product = require("../../models/product.model");
const filterBar = require("../../helpers/filter");

module.exports.products = async (req, res) => {

    let query = req.query;

    let filter = {};

    if (query.status) {
        filter.status = query.status;
    }

    let keyword = "";
    if (query.keyword) {
        keyword = query.keyword;
        let regex = new RegExp(keyword, "i");
        filter.title = regex;
    }

    let filterStatus = filterBar(query);

    let products = await Product.find(filter);

    res.render("admin/pages/products/index", {
        products: products,
        filterBar: filterStatus,
        keyword: keyword
    });
}
