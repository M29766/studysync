import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Users,
    PenTool,
    CircleHelp,
    GraduationCap,
    CalendarCheck,
    Trash2,
} from "lucide-react";
import FeatureCard from "../components/FeatureCard";
import API from "../api/axios";

function Home() {
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);

    const fetchBookings = async () => {
        try {
            const res = await API.get("/api/bookings");
            setBookings(res.data);
        } catch (error) {
            console.log("Failed to fetch bookings");
        }
    };

    const deleteBooking = async (bookingId) => {
        const confirmDelete = window.confirm("Delete this booking?");

        if (!confirmDelete) return;

        try {
            await API.delete(`/api/bookings/${bookingId}`);
            fetchBookings();
            alert("Booking deleted successfully");
        } catch (error) {
            alert(error.response?.data?.message || "Failed to delete booking");
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const formatDateTime = (dateValue) => {
        const date = new Date(dateValue);

        return date.toLocaleString("en-IN", {
            dateStyle: "medium",
            timeStyle: "short",
        });
    };

    return (
        <main className="page home-page">
            <section className="hero">
                <h1>StudySync Pro</h1>
                <p>Collaborate, Learn, Succeed</p>

                <div className="hero-actions">
                    <button onClick={() => navigate("/groups")} className="primary-btn">
                        Get Started
                    </button>

                    <button
                        onClick={() => navigate("/study-room")}
                        className="secondary-btn"
                    >
                        Try Study Room
                    </button>
                </div>
            </section>

            <section className="features-grid">
                <FeatureCard
                    icon={<Users />}
                    title="Study Groups"
                    description="Create groups, share resources, collaborate"
                    onClick={() => navigate("/groups")}
                />

                <FeatureCard
                    icon={<PenTool />}
                    title="Whiteboard"
                    description="Draw and brainstorm together in real-time"
                    onClick={() => navigate("/study-room")}
                />

                <FeatureCard
                    icon={<CircleHelp />}
                    title="Quizzes"
                    description="Create flashcards and test each other"
                    onClick={() => navigate("/quizzes")}
                />

                <FeatureCard
                    icon={<GraduationCap />}
                    title="Tutors"
                    description="Book sessions with peer tutors"
                    onClick={() => navigate("/tutors")}
                />
            </section>

            <section className="home-bookings-section">
                <div className="home-section-heading">
                    <h2>Your Tutor Bookings</h2>
                    <p>Booked tutor sessions will appear here.</p>
                </div>

                {bookings.length === 0 ? (
                    <div className="empty-booking-card">
                        <CalendarCheck size={42} />
                        <p>No tutor bookings yet.</p>
                    </div>
                ) : (
                    <div className="booking-grid">
                        {bookings.map((booking) => (
                            <div className="booking-card" key={booking._id}>
                                <div className="booking-left">
                                    <div className="booking-icon">
                                        <CalendarCheck size={28} />
                                    </div>

                                    <div>
                                        <h3>{booking.tutorId?.name || "Tutor"}</h3>
                                        <p>{booking.tutorId?.subject || "Subject"}</p>

                                        <span>
                                            Student: <strong>{booking.studentName}</strong>
                                        </span>

                                        <span>
                                            Time: <strong>{formatDateTime(booking.slotTime)}</strong>
                                        </span>
                                    </div>
                                </div>

                                <button
                                    className="booking-delete-btn"
                                    onClick={() => deleteBooking(booking._id)}
                                    title="Delete booking"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}

export default Home;