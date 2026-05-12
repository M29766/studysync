const express = require("express");
const Booking = require("../models/Booking");

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { tutorId, studentName, slotTime } = req.body;

        if (!tutorId || !studentName || !slotTime) {
            return res.status(400).json({
                message: "Tutor, student name, and slot time are required",
            });
        }

        const existingBooking = await Booking.findOne({
            tutorId,
            slotTime: new Date(slotTime),
        });

        if (existingBooking) {
            return res.status(409).json({
                message: "This slot is already booked",
            });
        }

        const booking = await Booking.create({
            tutorId,
            studentName,
            slotTime,
        });

        res.status(201).json({
            message: "Session booked successfully",
            booking,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to book session",
            error: error.message,
        });
    }
});

router.get("/", async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate("tutorId")
            .sort({ slotTime: 1 });

        res.json(bookings);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch bookings",
            error: error.message,
        });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id);

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found",
            });
        }

        res.json({
            message: "Booking deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete booking",
            error: error.message,
        });
    }
});

module.exports = router;