const express = require("express");
const Group = require("../models/Group");

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { name, subject, description } = req.body;

        if (!name || !subject) {
            return res.status(400).json({
                message: "Group name and subject are required",
            });
        }

        const group = await Group.create({
            name,
            subject,
            description,
        });

        res.status(201).json(group);
    } catch (error) {
        res.status(500).json({
            message: "Failed to create group",
            error: error.message,
        });
    }
});

router.get("/", async (req, res) => {
    try {
        const groups = await Group.find().sort({ createdAt: -1 });
        res.json(groups);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch groups",
            error: error.message,
        });
    }
});

router.post("/join/:inviteCode", async (req, res) => {
    try {
        const group = await Group.findOne({ inviteCode: req.params.inviteCode });

        if (!group) {
            return res.status(404).json({
                message: "Invalid invite link",
            });
        }

        res.json({
            message: "Joined group successfully",
            group,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to join group",
            error: error.message,
        });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const group = await Group.findById(req.params.id);

        if (!group) {
            return res.status(404).json({
                message: "Group not found",
            });
        }

        res.json(group);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch group",
            error: error.message,
        });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const group = await Group.findByIdAndDelete(req.params.id);

        if (!group) {
            return res.status(404).json({
                message: "Group not found",
            });
        }

        res.json({
            message: "Group deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete group",
            error: error.message,
        });
    }
});

module.exports = router;