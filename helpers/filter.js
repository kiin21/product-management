module.exports = (query) => {
    let filterBar = [
        { name: "All", status: "", class: "" },
        { name: "Available", status: "available", class: "" },
        { name: "Unavailable", status: "unavailable", class: "" }
    ]

    if (query.status) {
        for (let element of filterBar) {
            if (element.status === query.status) {
                element.class = "active";
                break;
            }
        }
    }
    else {
        filterBar[0].class = "active";
    }

    return filterBar;
};