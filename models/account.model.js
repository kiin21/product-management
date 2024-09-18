const mongoose = require("mongoose");
const gen = require("../helpers/generate.js");

const accountSchema = new mongoose.Schema(
    {
        fullname: String, 
        email: String,
        password: String,
        token: {
            type: String,
            default: gen.generateRandomString(32)
        },
        phone: String,
        avatar: String,
        role_id: String,
        status: String,
        deleted: {
            type: Boolean,
            default: false
        },
        deletedAt: Date,
    },
    {
        timestamps: true
    }
);

const Account = mongoose.model('Account', accountSchema, "Accounts");

module.exports = Account;