const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        card_id: String,
        user_info: {
            fullname: String,
            phone: String,
            address: String,
            email: String
        },
        products: [
            {
                product_id: String,
                price: Number,
                discountPercentage: Number,
                quantity: Number,
            },
        ],
        deleted: {
            type: Boolean,
            default: false
        },
        deletedAt: Date
    },
    {
        timestamps: true,
    }
);

const Order = mongoose.model("Order", orderSchema, "Orders");

module.exports = Order;