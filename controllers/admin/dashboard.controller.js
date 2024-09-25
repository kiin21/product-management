const Product = require("../../models/product.model");
const ProductCategory = require("../../models/product-category.model");
const AdminAccount = require("../../models/account.model");
const User = require("../../models/user.model");

module.exports.dashboard = async (req, res) => {
    const stat = {
        product: {
            total: await Product.countDocuments(),
            active: await Product.countDocuments({ status: "available" }),
            inactive: await Product.countDocuments({ status: "unavailable" }),
        },
        productCategory: {
            total: await ProductCategory.countDocuments(),
            active: await ProductCategory.countDocuments({ status: "available" }),
            inactive: await ProductCategory.countDocuments({ status: "unavailable" }),
        },
        admin: {
            total: await AdminAccount.countDocuments(),
            active: await AdminAccount.countDocuments({ status: "available" }),
            inactive: await AdminAccount.countDocuments({ status: "unavailable" }),
        },
        user: {
            total: await User.countDocuments(),
            active: await User.countDocuments({ status: "active" }),
            inactive: await User.countDocuments({ status: "inactive" }),
        }
    }



    res.render("admin/pages/dashboard/index", {
        pageTitle: "Dashboard",
        stat,
    });
}
