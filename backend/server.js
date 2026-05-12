const express = require("express");
const http = require("http");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const { Server } = require("socket.io");

const connectDB = require("./config/db");
const groupRoutes = require("./routes/groupRoutes");
const flashcardRoutes = require("./routes/flashcardRoutes");
const tutorRoutes = require("./routes/tutorRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const resourceRoutes = require("./routes/resourceRoutes");
const socketHandler = require("./socket/socketHandler");

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);

const allowedOrigins = [
    "http://localhost:3000",
    process.env.CLIENT_URL,
    "https://studysync-9fzqlknqq-m29766s-projects.vercel.app",
];

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
    })
);

app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
    res.send("StudySync backend is running");
});

app.use("/api/groups", groupRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/flashcards", flashcardRoutes);
app.use("/api/tutors", tutorRoutes);
app.use("/api/bookings", bookingRoutes);

const io = new Server(server, {
    cors: {
        origin: allowedOrigins,
        methods: ["GET", "POST", "PATCH", "DELETE"],
    },
});

socketHandler(io);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});