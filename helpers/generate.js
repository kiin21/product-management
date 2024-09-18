module.exports.generateRandomString = (length) => {
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";

    let result = "";
    for(let i = 0; i < length; i++) {
        const rnum = Math.floor(Math.random() * chars.length);
        result += chars.charAt(Math.floor(rnum));
    }

    return result;
}