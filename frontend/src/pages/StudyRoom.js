import { useEffect, useMemo } from "react";
import { io } from "socket.io-client";
import Whiteboard from "../components/Whiteboard";
import ChatBox from "../components/ChatBox";

function StudyRoom() {
    const roomId = "main-study-room";

    const socket = useMemo(() => {
        return io("https://studysync-ngqu.onrender.com");
    }, []);

    useEffect(() => {
        socket.emit("join-room", roomId);

        return () => {
            socket.disconnect();
        };
    }, [socket]);

    return (
        <main className="page">
            <h1 className="page-heading">Virtual Study Room</h1>

            <div className="study-room-layout">
                <Whiteboard socket={socket} roomId={roomId} />
                <ChatBox socket={socket} roomId={roomId} />
            </div>
        </main>
    );
}

export default StudyRoom;