module.exports.fixedPrice = (products) => {
    const newProducts = products.map(element => {
        element.newPrice = (element.price / (1 - element.discountPercentage / 100)).toFixed(2);
        return element;
    });

    return newProducts;
};