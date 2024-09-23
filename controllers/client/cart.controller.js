const Cart = require("../../models/cart.model");
const Product = require("../../models/product.model");
const helper = require("../../helpers/product");

// [get] /cart
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
        res.render("client/pages/cart/index",{
            cart: cart
        });
    };

}
// [post] /cart/add/:productId
module.exports.add = async (req, res) => {
    const productId = req.params.productId;
    const quantity = req.body.quantity;
    const cartId = req.cookies.cartId;

    const cart = await Cart.findOne({ _id: cartId });
    const existedProduct = cart.products.find((product) => product.product_id == productId);

    if (existedProduct) {
        const newQuantity = parseInt(existedProduct.quantity) + parseInt(quantity);
        await Cart.updateOne(
            {
                _id: cartId,
                "products.product_id": productId
            },
            {
                $set: {
                    "products.$.quantity": newQuantity
                }
            }
        );
    }
    else {
        const record = {
            product_id: productId,
            quantity: quantity,
        };

        await Cart.updateOne({ _id: cartId }, { $push: { products: record } });

    }
    req.flash('success', 'Add product to cart successfully!');
    res.redirect("/products");
};