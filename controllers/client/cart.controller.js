const Cart = require("../../models/cart.model");
const helper = require("../../helpers/product");


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