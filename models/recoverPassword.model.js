const mongoose = require("mongoose");

const recoverPasswordSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true
        },
        OTP: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            expires: process.env.OTP_EXPIRE_TIME // in seconds
        }
    },
    {
        timestamps: true,
    }
);

const RecoverPassword = mongoose.model("RecoverPassword", recoverPasswordSchema, "RecoverPassword");

module.exports = RecoverPassword;