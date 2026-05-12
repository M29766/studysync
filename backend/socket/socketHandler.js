const socketHandler = (io) => {
    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);

        socket.on("join-room", (roomId) => {
            socket.join(roomId);
            console.log(`${socket.id} joined room ${roomId}`);
        });

        socket.on("send-message", (data) => {
            socket.to(data.roomId).emit("receive-message", data);
        });

        socket.on("draw", (data) => {
            socket.to(data.roomId).emit("receive-draw", data);
        });

        socket.on("clear-board", (roomId) => {
            socket.to(roomId).emit("receive-clear-board");
        });

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
    });
};

module.exports = socketHandler;