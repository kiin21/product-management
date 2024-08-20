module.exports = async (query, numberOfProducts, paginationObj) => {
    //Get currentPage
    if (query.page) {
        paginationObj.currentPage = parseInt(query.page);
    }

    // Count number of products
    
    let numberOfPages = Math.ceil(numberOfProducts / paginationObj.limitItems);
    paginationObj.totalPages = numberOfPages;

    return paginationObj;
};