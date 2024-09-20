const Product = require("../../models/product.model");
const ProductCategory = require("../../models/product-category.model");
const productHelper = require("../../helpers/product");
const { isDescendant } = require("../../helpers/isDescendant");

// [get] /products
module.exports.index = async (req, res) => {
    let products = await Product.find({});

    const newProducts = productHelper.fixedPrice(products);

    res.render("client/pages/products/index.pug", {
        pageTitle: "Products",
        products: newProducts
    });
}

// [get] /products/detail/:slugProduct
module.exports.detail = async (req, res) => {
    try {
        let product = await Product.findOne(
            {
                slug: req.params.slugProduct,
                deleted: false,
            });

        if (product.product_category_id) {
            const category = await ProductCategory.findOne({
                _id: product.product_category_id,
                status: 'available',
                deleted: false
            });

            product.category = category;
            console.log('CATEGORY', product);
        }

        const newProduct = productHelper.fixedPrice([product])[0];
        product.newPrice = newProduct.newPrice;

        res.render("client/pages/products/detail.pug", {
            pageTitle: "Product detail",
            product: product
        });

    } catch (err) {
        res.render("/products")
    }
}

// [get] /products/:slugCategory
module.exports.category = async (req, res) => {
    let slugCategory = req.params.slugCategory;

    let category = await ProductCategory.findOne({
        slug: slugCategory
    });

    const categories = await ProductCategory.find({ deleted: false, status: 'available' });
    const descendant_category = [category._id];
    for (const item of categories) {
        if (await isDescendant(item, category._id)) {
            descendant_category.push(item._id);
        }
    }



    let products = await Product.find({
        deleted: false,
        status: 'available',
        product_category_id: { $in: descendant_category }
    });

    console.log(products);

    res.render("client/pages/products/index", {
        pageTitle: category.title,
        products: productHelper.fixedPrice(products)
    });
}