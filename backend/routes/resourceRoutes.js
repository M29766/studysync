const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Group = require("../models/Group");
const Resource = require("../models/Resource");

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(__dirname, "../uploads");

        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath);
        }

        cb(null, uploadPath);
    },

    filename: function (req, file, cb) {
        const uniqueName = Date.now() + "-" + file.originalname.replace(/\s+/g, "-");
        cb(null, uniqueName);
    },
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = [
        "application/pdf",
        "image/png",
        "image/jpeg",
        "image/jpg",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.ms-powerpoint",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    ];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only PDF, images, DOCX, and PPT files are allowed"), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024,
    },
});

router.post("/upload/:groupId", upload.single("file"), async (req, res) => {
    try {
        const group = await Group.findById(req.params.groupId);

        if (!group) {
            return res.status(404).json({
                message: "Group not found",
            });
        }

        if (!req.file) {
            return res.status(400).json({
                message: "Please upload a file",
            });
        }

        const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

        const resource = await Resource.create({
            groupId: group._id,
            title: req.body.title || req.file.originalname,
            fileName: req.file.originalname,
            fileUrl,
            fileType: req.file.mimetype,
            fileSize: req.file.size,
        });

        res.status(201).json({
            message: "File uploaded successfully",
            resource,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to upload file",
            error: error.message,
        });
    }
});

router.get("/:groupId", async (req, res) => {
    try {
        const resources = await Resource.find({
            groupId: req.params.groupId,
        }).sort({ createdAt: -1 });

        res.json(resources);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch resources",
            error: error.message,
        });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const resource = await Resource.findById(req.params.id);

        if (!resource) {
            return res.status(404).json({
                message: "Resource not found",
            });
        }

        const filePath = path.join(
            __dirname,
            "../uploads",
            path.basename(resource.fileUrl)
        );

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        await Resource.findByIdAndDelete(req.params.id);

        res.json({
            message: "Resource deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete resource",
            error: error.message,
        });
    }
});

module.exports = router;