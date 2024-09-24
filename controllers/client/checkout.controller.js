const Cart = require("../../models/cart.model");
const Product = require("../../models/product.model");
const Order = require("../../models/order.model");
const helper = require("../../helpers/product");

//[GET] /checkout
module.exports.index = async (req, res) => {
    const cartId = req.cookies.cartId;
    const cart = await Cart.findOne({ _id: cartId });

    if (cart.products.length > 0) {
        for (item of cart.products) {
            const productId = item.product_id;
            const product = await Product.findOne({
                _id: productId
            }).select("title thumbnail slug price discountPercentage");

            product.newPrice = helper.fixedPrice([product])[0].newPrice;

            item.productInfo = product;
            item.total = product.newPrice * item.quantity;
        }
        cart.total = cart.products.reduce((total, item) => total + item.total, 0);
        res.render("client/pages/checkout/index", {
            cart: cart
        });
    };
};

//[POST] /checkout/order
module.exports.order = async (req, res) => {
    const cartId = req.cookies.cartId;

    const user_info = {
        fullname: req.body.fullname,
        phone: req.body.phone,
        address: req.body.address,
        email: req.body.email
    };

    const cart = await Cart.findOne({ _id: cartId });
    const products = [];
    for (const item of cart.products) {
        const productId = item.product_id;
        const product = await Product.findOne({ _id: productId }).select("price discountPercentage");
        products.push({
            product_id: productId,
            price: product.price,
            discountPercentage: product.discountPercentage,
            quantity: item.quantity
        });
    }
    const orderInfo = {
        cart_id: cartId,
        user_info: user_info,
        products: products
    };

    const order = new Order(orderInfo);
    await order.save();

    await Cart.updateOne({ _id: cartId }, { $set: { products: [] } });

    res.redirect(`/checkout/success/${order._id}`);
};

//[GET] /checkout/success/:orderId
module.exports.success = async (req, res) => {
    const order = await Order.findOne({ _id: req.params.orderId });

    order.totalPrice = 0;
    for (const item of order.products) {
        const productInfo = await Product.findOne({ _id: item.product_id }).select("title price discountPercentage thumbnail");
        item.productInfo = productInfo;

        item.newPrice = helper.fixedPrice([productInfo])[0].newPrice;
        item.totalPrice = item.newPrice * item.quantity;
        order.totalPrice += item.totalPrice;
    }

    res.render("client/pages/checkout/success", {
        pageTitle: "Order success",
        order: order
    });
};