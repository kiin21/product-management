const dashboardRouter = require('./dashboard.router');
const systemConfig = require('../../config/system');
const productsRouter = require('./products.router');
const productCategoryRouter = require('./product-category.router');

module.exports = (app) => {
    const prefixAdmin = systemConfig.prefixAdmin;
    app.use(prefixAdmin + '/dashboard', dashboardRouter);
    app.use(prefixAdmin + '/products', productsRouter);
    app.use(prefixAdmin + '/product-category', productCategoryRouter);

};


