const mongoose = require("mongoose");
const validaters = require("validator");
const { default: isEmail } = require("validator/lib/isEmail");
// const { default: isEmail } = require("validate/lib/isemail");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validaters.isEmail, "Invalid Email"],
    },
    image: {
        type: String,
    },
    github: {
        type: String,
    },
    linkedin: {
        type: String,
    },
});

const users = mongoose.model("users", userSchema);

module.exports = users;
