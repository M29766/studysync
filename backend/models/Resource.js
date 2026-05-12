const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema(
    {
        groupId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Group",
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        fileName: {
            type: String,
            required: true,
        },
        fileUrl: {
            type: String,
            required: true,
        },
        fileType: {
            type: String,
        },
        fileSize: {
            type: Number,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Resource", resourceSchema);