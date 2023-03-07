const mongoose = require("mongoose");

const movieSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        text: {
            type: String,
            required: [true, "please add a text value"],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Movie", movieSchema);
