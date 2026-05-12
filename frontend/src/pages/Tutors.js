import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Tutors() {
    const navigate = useNavigate();

    const [tutors, setTutors] = useState([]);
    const [selectedTutor, setSelectedTutor] = useState(null);
    const [studentName, setStudentName] = useState("");
    const [slotTime, setSlotTime] = useState("");

    const fetchTutors = async () => {
        try {
            const res = await API.get("/api/tutors");
            setTutors(res.data);
        } catch (error) {
            alert("Failed to fetch tutors");
        }
    };

    const bookSession = async (event) => {
        event.preventDefault();

        if (!studentName || !slotTime) {
            alert("Please enter your name and select time");
            return;
        }

        try {
            await API.post("/api/bookings", {
                tutorId: selectedTutor._id,
                studentName,
                slotTime,
            });

            alert("Session booked successfully");

            setSelectedTutor(null);
            setStudentName("");
            setSlotTime("");

            navigate("/");
        } catch (error) {
            alert(error.response?.data?.message || "Failed to book session");
        }
    };

    useEffect(() => {
        fetchTutors();
    }, []);

    return (
        <main className="page">
            <h1 className="page-heading">Tutor Marketplace</h1>

            <div className="tutor-grid">
                {tutors.map((tutor) => (
                    <div className="tutor-card" key={tutor._id}>
                        <div className="tutor-icon">{tutor.icon}</div>

                        <h3>{tutor.name}</h3>
                        <p>{tutor.subject}</p>

                        <div className="tutor-info">
                            <span>★ {tutor.rating}</span>
                        </div>

                        <button className="book-btn" onClick={() => setSelectedTutor(tutor)}>
                            Book Session
                        </button>
                    </div>
                ))}
            </div>

            {selectedTutor && (
                <div className="modal-overlay">
                    <form className="modal-card" onSubmit={bookSession}>
                        <h2>Book {selectedTutor.name}</h2>

                        <input
                            type="text"
                            placeholder="Your name"
                            value={studentName}
                            onChange={(e) => setStudentName(e.target.value)}
                        />

                        <input
                            type="datetime-local"
                            value={slotTime}
                            onChange={(e) => setSlotTime(e.target.value)}
                        />

                        <div className="modal-actions">
                            <button
                                type="button"
                                className="secondary-btn"
                                onClick={() => setSelectedTutor(null)}
                            >
                                Cancel
                            </button>

                            <button type="submit" className="primary-btn">
                                Confirm Booking
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </main>
    );
}

export default Tutors;