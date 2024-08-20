module.exports = (query) => {

    let searchObj = {
        keyword: "",
    };

    if (query.keyword) {
        searchObj.keyword = query.keyword;
        let regex = new RegExp(searchObj.keyword, "i");
        searchObj.regex = regex;
    }
    return searchObj;
};