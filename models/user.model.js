const mongoose = require("mongoose");
const gen = require("../helpers/generate.js");

const userSchema = new mongoose.Schema(
    {
        fullname: String,
        email: String,
        password: String,
        userToken: {
            type: String,
            default: gen.generateRandomString(32)
        },
        phone: String,
        avatar: String,
        status: {
            type: String,
            default: "active"
        },
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

const User = mongoose.model('Users', userSchema, "Users");

module.exports = User;