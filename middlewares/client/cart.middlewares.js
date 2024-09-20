const Cart = require("../../models/cart.model");

module.exports.cartId = async (req, res, next) => {
    if (!req.cookies.cartId) {
        const cart = new Cart();
        await cart.save();

        const expiredTime = 1000 * 60 * 60 * 24 * 30; // 30 days

        res.cookie('cartId', cart._id, {
            expires: new Date(Date.now() + expiredTime),
        });
    } else {
        const cart = await Cart.findById(req.cookies.cartId);
    }

    next();
}