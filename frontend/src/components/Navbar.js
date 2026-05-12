import { NavLink } from "react-router-dom";
import { BookOpen } from "lucide-react";

function Navbar() {
    return (
        <nav className="navbar">
            <NavLink to="/" className="brand">
                <span className="brand-icon">
                    <BookOpen size={22} />
                </span>
                <span>StudySync</span>
            </NavLink>

            <div className="nav-links">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/groups">Groups</NavLink>
                <NavLink to="/study-room">Study Room</NavLink>
                <NavLink to="/quizzes">Quizzes</NavLink>
                <NavLink to="/tutors">Tutors</NavLink>
            </div>
        </nav>
    );
}

export default Navbar;