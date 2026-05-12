import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Users, ArrowRight } from "lucide-react";
import API from "../api/axios";

function JoinGroup() {
    const { inviteCode } = useParams();
    const navigate = useNavigate();

    const [status, setStatus] = useState("Joining group...");
    const [group, setGroup] = useState(null);

    useEffect(() => {
        const joinGroup = async () => {
            try {
                const res = await API.post(`/api/groups/join/${inviteCode}`);

                setGroup(res.data.group);
                setStatus("You joined the group successfully!");
            } catch (error) {
                setStatus(error.response?.data?.message || "Invalid invite link");
            }
        };

        joinGroup();
    }, [inviteCode]);

    return (
        <main className="page join-page">
            <div className="join-card">
                <div className="join-icon">
                    <Users size={42} />
                </div>

                <h1>{status}</h1>

                {group && (
                    <>
                        <h2>{group.name}</h2>
                        <p>{group.subject}</p>
                        <span>{group.description}</span>

                        <button
                            className="primary-btn"
                            onClick={() => navigate(`/groups/${group._id}`)}
                        >
                            Open Group
                            <ArrowRight size={18} />
                        </button>
                    </>
                )}

                {!group && (
                    <button className="secondary-btn" onClick={() => navigate("/groups")}>
                        Back to Groups
                    </button>
                )}
            </div>
        </main>
    );
}

export default JoinGroup;