import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Groups from "./pages/Groups";
import GroupDetails from "./pages/GroupDetails";
import JoinGroup from "./pages/JoinGroup";
import StudyRoom from "./pages/StudyRoom";
import Quizzes from "./pages/Quizzes";
import Tutors from "./pages/Tutors";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/groups/:id" element={<GroupDetails />} />
          <Route path="/join/:inviteCode" element={<JoinGroup />} />
          <Route path="/study-room" element={<StudyRoom />} />
          <Route path="/quizzes" element={<Quizzes />} />
          <Route path="/tutors" element={<Tutors />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;