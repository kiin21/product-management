const Product = require("../../models/product.model");
const filterBarHelper = require("../../helpers/filter");
const searchHelper = require("../../helpers/search");

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
    let paginationObj = {
        limitItems: 4,
        currentPage: 1,
    }

    //Get currentPage
    if (query.page) {
        paginationObj.currentPage = parseInt(query.page);
    }

    //Retrieve products
    let products = await Product.find(filter)
        .limit(paginationObj.limitItems)
        .skip((paginationObj.currentPage - 1) * paginationObj.limitItems);

    // Count number of products
    let numberOfProducts = await Product.countDocuments(filter);
    let numberOfPages = Math.ceil(numberOfProducts / paginationObj.limitItems);
    paginationObj.totalPages = numberOfPages;

    res.render("admin/pages/products/index", {
        products: products,
        filterBar: filterStatus,
        keyword: searchObj.keyword,
        paginationObj: paginationObj
    });
}
