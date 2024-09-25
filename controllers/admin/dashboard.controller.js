const Product = require("../../models/product.model");
const ProductCategory = require("../../models/product-category.model");
const AdminAccount = require("../../models/account.model");
const User = require("../../models/user.model");

module.exports.dashboard = async (req, res) => {
    const stat = {
        product: {
            total: await Product.countDocuments({ deleted: false }),
            active: await Product.countDocuments({ status: "available", deleted: false }),
            inactive: await Product.countDocuments({ status: "unavailable", deleted: false }),
        },
        productCategory: {
            total: await ProductCategory.countDocuments({ deleted: false }),
            active: await ProductCategory.countDocuments({ status: "available", deleted: false }),
            inactive: await ProductCategory.countDocuments({ status: "unavailable", deleted: false }),
        },
        admin: {
            total: await AdminAccount.countDocuments({ deleted: false }),
            active: await AdminAccount.countDocuments({ status: "available", deleted: false }),
            inactive: await AdminAccount.countDocuments({ status: "unavailable", deleted: false }),
        },
        user: {
            total: await User.countDocuments({ deleted: false }),
            active: await User.countDocuments({ status: "active", deleted: false }),
            inactive: await User.countDocuments({ status: "inactive", deleted: false }),
        }
    }

    res.render("admin/pages/dashboard/index", {
        pageTitle: "Dashboard",
        stat,
    });
}
