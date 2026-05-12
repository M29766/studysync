import { useEffect, useState } from "react";
import API from "../api/axios";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";

function Quizzes() {
    const [tab, setTab] = useState("flashcards");
    const [cards, setCards] = useState([]);
    const [index, setIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const [form, setForm] = useState({
        question: "",
        answer: "",
    });

    const fetchCards = async () => {
        try {
            const res = await API.get("/api/flashcards");
            setCards(res.data);
        } catch (error) {
            alert("Failed to fetch flashcards");
        }
    };

    const createCard = async (event) => {
        event.preventDefault();

        try {
            await API.post("/api/flashcards", form);
            setForm({ question: "", answer: "" });
            setTab("flashcards");
            fetchCards();
        } catch (error) {
            alert("Failed to create flashcard");
        }
    };

    const markKnown = async () => {
        if (!cards[index]) return;

        try {
            await API.patch(`/api/flashcards/${cards[index]._id}/known`);
            fetchCards();
        } catch (error) {
            alert("Failed to update card");
        }
    };

    const nextCard = () => {
        setShowAnswer(false);
        setIndex((prev) => (cards.length === 0 ? 0 : (prev + 1) % cards.length));
    };

    const prevCard = () => {
        setShowAnswer(false);
        setIndex((prev) => (cards.length === 0 ? 0 : prev === 0 ? cards.length - 1 : prev - 1));
    };

    useEffect(() => {
        fetchCards();
    }, []);

    const currentCard = cards[index];

    return (
        <main className="page">
            <h1 className="page-heading">Peer Quizzes</h1>

            <div className="tabs">
                <button className={tab === "flashcards" ? "active-tab" : ""} onClick={() => setTab("flashcards")}>
                    Flashcards
                </button>
                <button className={tab === "create" ? "active-tab" : ""} onClick={() => setTab("create")}>
                    Create Card
                </button>
                <button className={tab === "leaderboard" ? "active-tab" : ""} onClick={() => setTab("leaderboard")}>
                    Leaderboard
                </button>
            </div>

            {tab === "flashcards" && (
                <>
                    <div className="flashcard" onClick={() => setShowAnswer(!showAnswer)}>
                        {currentCard ? (
                            <>
                                <h2>{showAnswer ? currentCard.answer : currentCard.question}</h2>
                                <p>{showAnswer ? "Answer" : "Click card to show answer"}</p>
                            </>
                        ) : (
                            <h2>Click "Create Card" to add flashcards</h2>
                        )}
                    </div>

                    <div className="quiz-controls">
                        <button className="secondary-btn" onClick={prevCard}>
                            <ChevronLeft size={18} />
                            Prev
                        </button>

                        <span>
                            {cards.length === 0 ? 0 : index + 1}/{cards.length}
                        </span>

                        <button className="secondary-btn" onClick={nextCard}>
                            Next
                            <ChevronRight size={18} />
                        </button>

                        <button className="primary-btn" onClick={markKnown}>
                            <Check size={18} />
                            Got it
                        </button>
                    </div>
                </>
            )}

            {tab === "create" && (
                <form className="quiz-form" onSubmit={createCard}>
                    <h2>Create Flashcard</h2>

                    <input
                        type="text"
                        placeholder="Enter question"
                        value={form.question}
                        onChange={(e) => setForm({ ...form, question: e.target.value })}
                    />

                    <textarea
                        placeholder="Enter answer"
                        value={form.answer}
                        onChange={(e) => setForm({ ...form, answer: e.target.value })}
                    />

                    <button className="primary-btn" type="submit">
                        Save Card
                    </button>
                </form>
            )}

            {tab === "leaderboard" && (
                <div className="leaderboard">
                    <h2>Leaderboard</h2>

                    {cards.length === 0 ? (
                        <p>No score data yet.</p>
                    ) : (
                        cards
                            .slice()
                            .sort((a, b) => b.knownCount - a.knownCount)
                            .map((card, cardIndex) => (
                                <div className="leaderboard-row" key={card._id}>
                                    <span>#{cardIndex + 1}</span>
                                    <strong>{card.question}</strong>
                                    <p>{card.knownCount} got-it points</p>
                                </div>
                            ))
                    )}
                </div>
            )}
        </main>
    );
}

export default Quizzes;