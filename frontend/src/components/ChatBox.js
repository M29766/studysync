import { useEffect, useState } from "react";
import { Send } from "lucide-react";

function ChatBox({ socket, roomId }) {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const sendMessage = () => {
        if (!message.trim()) return;

        const data = {
            roomId,
            user: "Student",
            message,
            time: new Date().toLocaleTimeString(),
        };

        setMessages((prev) => [...prev, data]);
        socket.emit("send-message", data);
        setMessage("");
    };

    useEffect(() => {
        if (!socket) return;

        socket.on("receive-message", (data) => {
            setMessages((prev) => [...prev, data]);
        });

        return () => {
            socket.off("receive-message");
        };
    }, [socket]);

    return (
        <div className="chat-card">
            <div className="card-header">
                <h3>Group Chat</h3>
            </div>

            <div className="chat-messages">
                {messages.length === 0 ? (
                    <p className="empty-chat">No messages yet. Start the discussion!</p>
                ) : (
                    messages.map((item, index) => (
                        <div className="message" key={index}>
                            <strong>{item.user}</strong>
                            <span>{item.message}</span>
                            <small>{item.time}</small>
                        </div>
                    ))
                )}
            </div>

            <div className="chat-input">
                <input
                    type="text"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    onKeyDown={(event) => {
                        if (event.key === "Enter") sendMessage();
                    }}
                />
                <button onClick={sendMessage}>
                    <Send size={22} />
                </button>
            </div>
        </div>
    );
}

export default ChatBox;