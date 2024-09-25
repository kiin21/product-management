const dashboardRouter = require('./dashboard.router');
const systemConfig = require('../../config/system');
const productsRouter = require('./products.router');
const productCategoryRouter = require('./product-category.router');
const rolesRouter = require('./roles.router');
const accountsRouter = require('./accounts.router');
const authRouter = require('./auth.router');
const accountRouter = require('./my-account.router');
const settingRouter = require('./setting.router');

const authMiddleware = require('../../middlewares/admin/auth.middlewares');

const prefixAdmin = systemConfig.prefixAdmin;

module.exports = (app) => {
    app.use(prefixAdmin + '/dashboard', authMiddleware.requireAuth, dashboardRouter);
    app.use(prefixAdmin + '/products', authMiddleware.requireAuth, productsRouter);
    app.use(prefixAdmin + '/product-category', authMiddleware.requireAuth, productCategoryRouter);
    app.use(prefixAdmin + '/roles', authMiddleware.requireAuth, rolesRouter);
    app.use(prefixAdmin + '/accounts', authMiddleware.requireAuth, accountsRouter);
    app.use(prefixAdmin + '/auth', authRouter);
    app.use(prefixAdmin + '/my-account', authMiddleware.requireAuth, accountRouter);
    app.use(prefixAdmin + '/setting',
        authMiddleware.requireAuth,
        settingRouter);
};


