import { useEffect, useRef, useState } from "react";

const colors = ["#5eead4", "#67e8f9", "#c4b5fd", "#fbbf24", "#ffffff"];

function Whiteboard({ socket, roomId }) {
    const canvasRef = useRef(null);
    const drawingRef = useRef(false);
    const lastPointRef = useRef(null);
    const [color, setColor] = useState("#5eead4");

    const getPosition = (event) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();

        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
        };
    };

    const drawLine = ({ x0, y0, x1, y1, color }) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        ctx.strokeStyle = color;
        ctx.lineWidth = 4;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y1);
        ctx.stroke();
    };

    const startDrawing = (event) => {
        drawingRef.current = true;
        lastPointRef.current = getPosition(event);
    };

    const draw = (event) => {
        if (!drawingRef.current) return;

        const currentPoint = getPosition(event);
        const previousPoint = lastPointRef.current;

        const data = {
            roomId,
            x0: previousPoint.x,
            y0: previousPoint.y,
            x1: currentPoint.x,
            y1: currentPoint.y,
            color,
        };

        drawLine(data);
        socket.emit("draw", data);

        lastPointRef.current = currentPoint;
    };

    const stopDrawing = () => {
        drawingRef.current = false;
        lastPointRef.current = null;
    };

    const clearBoard = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        socket.emit("clear-board", roomId);
    };

    useEffect(() => {
        if (!socket) return;

        socket.on("receive-draw", drawLine);

        socket.on("receive-clear-board", () => {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        });

        return () => {
            socket.off("receive-draw");
            socket.off("receive-clear-board");
        };
    }, [socket]);

    return (
        <div className="whiteboard-card">
            <div className="card-header">
                <h3>Collaborative Whiteboard</h3>

                <div className="color-tools">
                    {colors.map((item) => (
                        <button
                            key={item}
                            className={`color-dot ${color === item ? "selected" : ""}`}
                            style={{ backgroundColor: item }}
                            onClick={() => setColor(item)}
                        />
                    ))}
                    <button className="clear-btn" onClick={clearBoard}>
                        Clear
                    </button>
                </div>
            </div>

            <canvas
                ref={canvasRef}
                width={1100}
                height={500}
                className="whiteboard"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
            />
        </div>
    );
}

export default Whiteboard;