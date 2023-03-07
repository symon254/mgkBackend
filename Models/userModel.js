const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "please add a NAME"],
        },
        email: {
            type: String,
            required: [true, "please add an EMAIL"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "please add a PASSWORD"],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);
