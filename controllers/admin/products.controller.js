const Product = require("../../models/product.model");
const filterBarHelper = require("../../helpers/filter");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");
const systemConfig = require('../../config/system');

// [get] admin/products
module.exports.products = async (req, res) => {
    let query = req.query;

    //search
    let filter = { deleted: false };

    if (query.status) {
        filter.status = query.status;
    }

    let searchObj = searchHelper(query);

    if (searchObj.regex) {
        filter.title = searchObj.regex;
    }
    //filter
    let filterStatus = filterBarHelper(query);

    //pagination
    let numberOfProducts = await Product.countDocuments(filter);
    let paginationObj = await paginationHelper(
        query,
        numberOfProducts, {
        limitItems: 5,
        currentPage: 1,
    });

    // sort
    let sort = {};
    if (req.query.sortkey && req.query.sortvalue) {
        sort[req.query.sortkey] = req.query.sortvalue;
    } else {
        sort.position = 'desc';
    }
    // end sort

    //Retrieve products
    let products = await Product.find(filter)
        .sort(sort)
        .limit(paginationObj.limitItems)
        .skip((paginationObj.currentPage - 1) * paginationObj.limitItems);

    res.render("admin/pages/products/index", {
        products: products,
        filterBar: filterStatus,
        keyword: searchObj.keyword,
        paginationObj: paginationObj
    });
}

// [patch] admin/products/change-status/:status/:ID
module.exports.changeStatus = async (req, res) => {
    let status = req.params.status;
    let ID = req.params.ID;

    await Product.updateOne({ _id: ID }, { status: status });

    req.flash('success', 'Change status successfully');

    res.redirect(`${systemConfig.prefixAdmin}/products`);
}

// [patch] admin/products/changes-multi-status
module.exports.changeMultiStatus = async (req, res) => {
    let IDs = req.body.IDs.split(', ');
    let status = req.body.status;


    switch (status) {
        case 'available':
            await Product.updateMany({ _id: { $in: IDs } }, { status: 'available' });
            req.flash('success', `Change status of ${IDs.length} successfully`);
            break;
        case 'unavailable':
            await Product.updateMany({ _id: { $in: IDs } }, { status: 'unavailable' });
            req.flash('success', `Change status of ${IDs.length} product(s) successfully`);
            break;
        case 'delete-all':
            await Product.updateMany({ _id: { $in: IDs } }, { deleted: true });
            req.flash('success', `Delete successfully`);
            break;
        case 'change-position':
            for (const product of IDs) {
                let [id, position] = product.split('-');
                position = parseInt(position);
                await Product.updateOne({ _id: id }, { position: position });
            }
            break;
        default:
            break;
    }

    // res.redirect('back');
    res.redirect(`${systemConfig.prefixAdmin}/products`);
}


// [delete] admin/products/delete/:id
module.exports.deleteItem = async (req, res) => {
    let id = req.params.id;
    let currentTime = new Date();

    await Product.updateOne(
        { _id: id },
        {
            deleted: true,
            deletedAt: currentTime
        });

    // res.redirect('back');
    res.redirect(`${systemConfig.prefixAdmin}/products`);
}

// // [get] admin/products/configdb
// module.exports.configDB = async (req, res) => {
//     let products = await Product.find();

//     // add position/index for each product
//     for (let i = 0; i < products.length; i++) {
//         await Product.updateOne({ _id: products[i]._id }, { position: i + 1 });
//     }

//     res.redirect('back');
// }

// [get] admin/products/create
module.exports.createItem = async (req, res) => {
    res.render(
        "admin/pages/products/create",
        {
            pageTitle: "Create Product",
        }
    );
}

// [post] admin/products/create
module.exports.createPost = async (req, res) => {
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    req.body.description = String(req.body.description);

    if (!req.body.position) {
        let amount = await Product.countDocuments();
        req.body.position = amount + 1;
    } else {
        req.body.position = parseInt(req.body.position);
    }

    let newProduct = new Product(req.body);
    await newProduct.save();

    res.redirect(`${systemConfig.prefixAdmin}/products`);
}

// [get] admin/products/edit/:id
module.exports.editPost = async (req, res) => {
    try {
        let productId = req.params.id;

        let product = await Product.findOne({ _id: productId, deleted: false });

        res.render(
            "admin/pages/products/edit",
            {
                pageTitle: "Edit Product",
                product: product
            }
        );
    } catch (err) {
        req.flash('error', 'Product not found');
        res.redirect(`${systemConfig.prefixAdmin}/products`);
    }
}
// [patch] admin/products/edit/:id
module.exports.editPostPatch = async (req, res) => {
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    req.body.position = parseInt(req.body.position);

    console.log("req.body product edit", req.body);

    try {
        await Product.updateOne({ _id: req.params.id }, req.body);
        req.flash('success', 'Edit product successfully');
    } catch (err) {
        req.flash('error', 'Edit product failed');
    }

    // res.redirect(`back`);
    res.redirect(`${systemConfig.prefixAdmin}/products/edit/${req.params.id}`);
}

// [get] admin/products/detail/:id
module.exports.detail = async (req, res) => {
    try {
        let productId = req.params.id;

        let product = await Product.findOne({ _id: productId, deleted: false });

        res.render(
            "admin/pages/products/detail",
            {
                pageTitle: product.title,
                product: product
            }
        );
    } catch (err) {
        req.flash('error', 'Product not found');
        res.redirect(`${systemConfig.prefixAdmin}/products`);
    }
}