const express = require("express");
const Flashcard = require("../models/Flashcard");

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { question, answer, groupId } = req.body;

        if (!question || !answer) {
            return res.status(400).json({ message: "Question and answer are required" });
        }

        const flashcard = await Flashcard.create({
            question,
            answer,
            groupId: groupId || null,
        });

        res.status(201).json(flashcard);
    } catch (error) {
        res.status(500).json({ message: "Failed to create flashcard", error: error.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const flashcards = await Flashcard.find().sort({ createdAt: -1 });
        res.json(flashcards);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch flashcards", error: error.message });
    }
});

router.patch("/:id/known", async (req, res) => {
    try {
        const flashcard = await Flashcard.findByIdAndUpdate(
            req.params.id,
            { $inc: { knownCount: 1 } },
            { new: true }
        );

        if (!flashcard) {
            return res.status(404).json({ message: "Flashcard not found" });
        }

        res.json(flashcard);
    } catch (error) {
        res.status(500).json({ message: "Failed to update flashcard", error: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const flashcard = await Flashcard.findByIdAndDelete(req.params.id);

        if (!flashcard) {
            return res.status(404).json({ message: "Flashcard not found" });
        }

        res.json({ message: "Flashcard deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete flashcard", error: error.message });
    }
});

module.exports = router;