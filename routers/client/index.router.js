const productRouter = require('./product.router');
const homeRouter = require('./home.router');
const searchRouter = require('./search.router');
const cartRouter = require('./cart.router');
const checkoutRouter = require('./checkout.router');
const userRouter = require('./user.router');
const chatRouter = require('./chat.router');
const categoryMiddleware = require('../../middlewares/client/category.middlewares');
const cartMiddleware = require('../../middlewares/client/cart.middlewares');
const userMiddleware = require('../../middlewares/client/user.middlewares');
const generalSettingMiddleware = require('../../middlewares/client/setting.middlewares');

module.exports = (app) => {
    console.log("You are in this client route");
    app.use(categoryMiddleware.category);
    app.use(cartMiddleware.cartId);
    app.use(userMiddleware.infoUser);
    app.use(generalSettingMiddleware.generalSetting);
    app.use('/', homeRouter);
    app.use('/products', productRouter);
    app.use('/search', searchRouter);
    app.use('/cart', cartRouter);
    app.use('/checkout', checkoutRouter);
    app.use('/user', userRouter);
    app.use('/chat', chatRouter);
};