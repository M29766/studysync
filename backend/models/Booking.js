const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
    {
        tutorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tutor",
            required: true,
        },
        studentName: {
            type: String,
            required: true,
        },
        slotTime: {
            type: Date,
            required: true,
        },
    },
    { timestamps: true }
);

bookingSchema.index({ tutorId: 1, slotTime: 1 }, { unique: true });

module.exports = mongoose.model("Booking", bookingSchema);