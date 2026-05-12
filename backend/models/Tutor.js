const mongoose = require("mongoose");

const tutorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        subject: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            default: 4.5,
        },
        price: {
            type: Number,
            required: true,
        },
        icon: {
            type: String,
            default: "📚",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Tutor", tutorSchema);