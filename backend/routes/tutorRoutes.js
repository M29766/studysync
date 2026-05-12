const express = require("express");
const Tutor = require("../models/Tutor");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        let tutors = await Tutor.find().sort({ rating: -1 });

        if (tutors.length === 0) {
            tutors = await Tutor.insertMany([
                {
                    name: "Dr. Patel",
                    subject: "Mathematics",
                    rating: 4.9,
                    price: 35,
                    icon: "🧮",
                },
                {
                    name: "Ms. Chen",
                    subject: "Chemistry",
                    rating: 4.8,
                    price: 30,
                    icon: "🧪",
                },
                {
                    name: "Mr. Williams",
                    subject: "English Lit",
                    rating: 4.7,
                    price: 25,
                    icon: "📚",
                },
                {
                    name: "Dr. Kim",
                    subject: "Physics",
                    rating: 5.0,
                    price: 40,
                    icon: "⚡",
                },
                {
                    name: "Ms. Garcia",
                    subject: "Biology",
                    rating: 4.6,
                    price: 28,
                    icon: "🧬",
                },
                {
                    name: "Mr. Okafor",
                    subject: "Computer Science",
                    rating: 4.9,
                    price: 45,
                    icon: "💻",
                },
            ]);
        }

        res.json(tutors);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch tutors", error: error.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const { name, subject, rating, price, icon } = req.body;

        if (!name || !subject || !price) {
            return res.status(400).json({ message: "Name, subject, and price are required" });
        }

        const tutor = await Tutor.create({
            name,
            subject,
            rating,
            price,
            icon,
        });

        res.status(201).json(tutor);
    } catch (error) {
        res.status(500).json({ message: "Failed to create tutor", error: error.message });
    }
});

module.exports = router;