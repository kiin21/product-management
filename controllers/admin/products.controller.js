const Product = require("../../models/product.model");
const filterBarHelper = require("../../helpers/filter");
const searchHelper = require("../../helpers/search");

module.exports.products = async (req, res) => {

    let query = req.query;

    let filter = {};

    if (query.status) {
        filter.status = query.status;
    }

    let searchObj = searchHelper(query);

    if (searchObj.regex) {
        filter.title = searchObj.regex;
    }

    let products = await Product.find(filter);

    let filterStatus = filterBarHelper(query);



    res.render("admin/pages/products/index", {
        products: products,
        filterBar: filterStatus,
        keyword: searchObj.keyword
    });
}
