const Product = require('../../models/product.model');
const helper = require('../../helpers/product');


module.exports.index = async(req, res) => {
    const keyword = req.query.keyword;

    const products = await Product.find({
        deleted: false,
        status: 'available',
        title: { $regex: keyword, $options: 'i' }
    });

    res.render('client/pages/search/index', {
        pageTitle: 'Search',
        keyword: keyword,
        products: helper.fixedPrice(products)
    });
}