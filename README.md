# StudySync Pro

StudySync Pro is a full-stack collaborative study platform built for students who want to learn together online. It recreates the digital version of a library study group by allowing students to create study groups, share resources, use a real-time collaborative whiteboard, chat inside a study room, create flashcards, and book tutor sessions.

---

## Live Project

Frontend Live Link:  
https://studysync-blond.vercel.app/

Backend API Link:  
https://studysync-ngqu.onrender.com

GitHub Repository:  
https://github.com/M29766/studysync

---

## Project Overview

Remote learning can feel lonely because students often miss the experience of studying together in groups. StudySync Pro solves this problem by giving students a platform where they can collaborate in real time.

The platform allows users to:

- Create study groups
- Open individual group pages
- Share group invite links
- Upload study resources
- Use a collaborative whiteboard
- Send real-time chat messages
- Create flashcards
- Track learning using leaderboard-style progress
- Book tutor sessions
- View and delete bookings from the home page

---

## Key Features

### 1. Home Page

The home page contains a modern dark-themed dashboard with quick navigation cards.

Features:

- StudySync Pro landing section
- Get Started button
- Try Study Room button
- Clickable cards for:
  - Study Groups
  - Whiteboard
  - Quizzes
  - Tutors
- Tutor booking details displayed on home page
- Delete option for tutor bookings

---

### 2. Study Groups

Students can create and manage study groups.

Features:

- Create new study group
- View all groups
- Open group details
- Delete study group
- Copy invite link
- Join group using invite link
- Group details page with subject and description

Example groups:

- Calculus 101
- React Study Circle
- DSA Interview Prep
- Machine Learning Group

---

### 3. Group Resource Hub

Each group has a resource hub where users can upload and access study materials.

Features:

- Upload PDF files
- Upload images
- Upload DOC/DOCX files
- Upload PPT/PPTX files
- View uploaded files
- Open/download resources
- Delete uploaded files

Note: The current version stores uploaded files in the backend `uploads` folder. For production, this can be improved by using Cloudinary, AWS S3, or Firebase Storage.

---

### 4. Virtual Study Room

The study room allows students to collaborate in real time.

Features:

- Real-time collaborative whiteboard
- Color selection for drawing
- Clear whiteboard option
- Real-time group chat
- Socket.io based communication
- Multiple users can open the study room in different browser tabs and interact live

---

### 5. Peer Quizzes and Flashcards

The quiz section helps students revise topics using flashcards.

Features:

- Create flashcards
- View question and answer
- Next and previous flashcard navigation
- Mark card as completed using Got It button
- Leaderboard-style progress display

---

### 6. Tutor Marketplace

Students can view tutors and book sessions.

Features:

- Tutor cards
- Tutor subject
- Tutor rating
- Book session button
- Booking form with student name and date/time
- Prevent duplicate booking for the same slot
- Bookings displayed on home page
- Delete booking option

---

## Tech Stack

### Frontend

- React.js
- React Router DOM
- Axios
- Socket.io-client
- Lucide React Icons
- CSS3

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.io
- Multer
- CORS
- Dotenv

### Database

- MongoDB Atlas

### Deployment

- Frontend: Vercel
- Backend: Render

---

## Folder Structure

```txt
studysync/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── models/
│   │   ├── Group.js
│   │   ├── Resource.js
│   │   ├── Flashcard.js
│   │   ├── Tutor.js
│   │   └── Booking.js
│   │
│   ├── routes/
│   │   ├── groupRoutes.js
│   │   ├── resourceRoutes.js
│   │   ├── flashcardRoutes.js
│   │   ├── tutorRoutes.js
│   │   └── bookingRoutes.js
│   │
│   ├── socket/
│   │   └── socketHandler.js
│   │
│   ├── uploads/
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── public/
│   │
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js
│   │   │
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── FeatureCard.js
│   │   │   ├── Whiteboard.js
│   │   │   └── ChatBox.js
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Groups.js
│   │   │   ├── GroupDetails.js
│   │   │   ├── JoinGroup.js
│   │   │   ├── StudyRoom.js
│   │   │   ├── Quizzes.js
│   │   │   └── Tutors.js
│   │   │
│   │   ├── styles/
│   │   │   └── style.css
│   │   │
│   │   ├── App.js
│   │   └── index.js
│   │
│   ├── vercel.json
│   └── package.json
│
├── .gitignore
└── README.md
