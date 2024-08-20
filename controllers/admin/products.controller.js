const Product = require("../../models/product.model");
const filterBarHelper = require("../../helpers/filter");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");
module.exports.products = async (req, res) => {
    let query = req.query;

    //search
    let filter = {};

    if (query.status) {
        filter.status = query.status;
    }

    let searchObj = searchHelper(query);

    if (searchObj.regex) {
        filter.title = searchObj.regex;
    }
    //filter
    let filterStatus = filterBarHelper(query);

    //pagination
    let numberOfProducts = await Product.countDocuments(filter);
    let paginationObj = await paginationHelper(
        query,
        numberOfProducts, {
        limitItems: 5,
        currentPage: 1,
    });

    //Retrieve products
    let products = await Product.find(filter)
        .limit(paginationObj.limitItems)
        .skip((paginationObj.currentPage - 1) * paginationObj.limitItems);

    res.render("admin/pages/products/index", {
        products: products,
        filterBar: filterStatus,
        keyword: searchObj.keyword,
        paginationObj: paginationObj
    });
}
