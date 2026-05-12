import { useEffect, useState } from "react";
import { Plus, Inbox, Trash2, ExternalLink, Copy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Groups() {
    const navigate = useNavigate();

    const [groups, setGroups] = useState([]);
    const [showForm, setShowForm] = useState(false);

    const [form, setForm] = useState({
        name: "",
        subject: "",
        description: "",
    });

    const fetchGroups = async () => {
        try {
            const res = await API.get("/api/groups");
            setGroups(res.data);
        } catch (error) {
            alert("Failed to fetch groups");
        }
    };

    const createGroup = async (event) => {
        event.preventDefault();

        try {
            const res = await API.post("/api/groups", form);

            setForm({
                name: "",
                subject: "",
                description: "",
            });

            setShowForm(false);

            navigate(`/groups/${res.data._id}`);
        } catch (error) {
            alert(error.response?.data?.message || "Failed to create group");
        }
    };

    const deleteGroup = async (id) => {
        const confirmDelete = window.confirm("Delete this group?");

        if (!confirmDelete) return;

        try {
            await API.delete(`/api/groups/${id}`);
            fetchGroups();
        } catch (error) {
            alert("Failed to delete group");
        }
    };

    const copyInviteLink = async (inviteCode) => {
        const link = `${window.location.origin}/join/${inviteCode}`;

        try {
            await navigator.clipboard.writeText(link);
            alert("Group invite link copied!");
        } catch (error) {
            alert(link);
        }
    };

    useEffect(() => {
        fetchGroups();
    }, []);

    return (
        <main className="page">
            <div className="page-title-row">
                <h1>Study Groups</h1>

                <button className="primary-btn small-btn" onClick={() => setShowForm(true)}>
                    <Plus size={20} />
                    New Group
                </button>
            </div>

            {showForm && (
                <div className="modal-overlay">
                    <form className="modal-card" onSubmit={createGroup}>
                        <h2>Create Study Group</h2>

                        <input
                            type="text"
                            placeholder="Group name"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                        />

                        <input
                            type="text"
                            placeholder="Subject"
                            value={form.subject}
                            onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        />

                        <textarea
                            placeholder="Description"
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                        />

                        <div className="modal-actions">
                            <button
                                type="button"
                                className="secondary-btn"
                                onClick={() => setShowForm(false)}
                            >
                                Cancel
                            </button>

                            <button type="submit" className="primary-btn">
                                Create
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {groups.length === 0 ? (
                <div className="empty-state">
                    <Inbox size={70} />
                    <p>No groups yet. Create one to get started!</p>
                </div>
            ) : (
                <div className="group-grid">
                    {groups.map((group) => (
                        <div className="group-card" key={group._id}>
                            <div className="group-card-content">
                                <h3>{group.name}</h3>
                                <p>{group.subject}</p>
                                <span>{group.description || "No description added"}</span>

                                <small>Members: {group.membersCount || 1}</small>
                            </div>

                            <div className="group-actions">
                                <button
                                    className="open-group-btn"
                                    onClick={() => navigate(`/groups/${group._id}`)}
                                >
                                    <ExternalLink size={17} />
                                    Open
                                </button>

                                <button
                                    className="copy-link-btn"
                                    onClick={() => copyInviteLink(group.inviteCode)}
                                >
                                    <Copy size={17} />
                                    Link
                                </button>

                                <button
                                    className="danger-icon"
                                    onClick={() => deleteGroup(group._id)}
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
}

export default Groups;