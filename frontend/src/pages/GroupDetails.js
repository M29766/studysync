import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    ArrowLeft,
    Copy,
    Upload,
    FileText,
    Download,
    Trash2,
    MessageCircle,
} from "lucide-react";
import API from "../api/axios";

function GroupDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [group, setGroup] = useState(null);
    const [resources, setResources] = useState([]);
    const [title, setTitle] = useState("");
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    const fetchGroup = async () => {
        try {
            const res = await API.get(`/api/groups/${id}`);
            setGroup(res.data);
        } catch (error) {
            alert("Group not found");
            navigate("/groups");
        }
    };

    const fetchResources = async () => {
        try {
            const res = await API.get(`/api/resources/${id}`);
            setResources(res.data);
        } catch (error) {
            alert("Failed to fetch resources");
        }
    };

    const uploadFile = async (event) => {
        event.preventDefault();

        if (!file) {
            alert("Please select a file");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("file", file);

        try {
            setUploading(true);

            await API.post(`/api/resources/upload/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setTitle("");
            setFile(null);
            event.target.reset();

            fetchResources();
        } catch (error) {
            alert(error.response?.data?.message || "Failed to upload file");
        } finally {
            setUploading(false);
        }
    };

    const deleteResource = async (resourceId) => {
        const confirmDelete = window.confirm("Delete this file?");

        if (!confirmDelete) return;

        try {
            await API.delete(`/api/resources/${resourceId}`);
            fetchResources();
        } catch (error) {
            alert("Failed to delete file");
        }
    };

    const copyInviteLink = async () => {
        const link = `${window.location.origin}/join/${group.inviteCode}`;

        try {
            await navigator.clipboard.writeText(link);
            alert("Invite link copied!");
        } catch (error) {
            alert(link);
        }
    };

    useEffect(() => {
        fetchGroup();
        fetchResources();
    }, [id]);

    if (!group) {
        return (
            <main className="page">
                <h1>Loading group...</h1>
            </main>
        );
    }

    const inviteLink = `${window.location.origin}/join/${group.inviteCode}`;

    return (
        <main className="page">
            <button className="back-btn" onClick={() => navigate("/groups")}>
                <ArrowLeft size={18} />
                Back to Groups
            </button>

            <div className="group-detail-hero">
                <div>
                    <h1>{group.name}</h1>
                    <p>{group.subject}</p>
                    <span>{group.description || "No description added"}</span>
                </div>

                <button
                    className="primary-btn small-btn"
                    onClick={() => navigate("/study-room")}
                >
                    <MessageCircle size={18} />
                    Open Study Room
                </button>
            </div>

            <section className="invite-box">
                <div>
                    <h3>Group Invite Link</h3>
                    <p>{inviteLink}</p>
                </div>

                <button className="copy-link-btn large" onClick={copyInviteLink}>
                    <Copy size={18} />
                    Copy Link
                </button>
            </section>

            <section className="resource-section">
                <div className="section-title-row">
                    <h2>Resource Hub</h2>
                    <p>Upload notes, PDFs, images, documents, and presentations.</p>
                </div>

                <form className="upload-card" onSubmit={uploadFile}>
                    <input
                        type="text"
                        placeholder="File title, example: Calculus Chapter 1 Notes"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <input
                        type="file"
                        accept=".pdf,.png,.jpg,.jpeg,.doc,.docx,.ppt,.pptx"
                        onChange={(e) => setFile(e.target.files[0])}
                    />

                    <button className="primary-btn" type="submit" disabled={uploading}>
                        <Upload size={18} />
                        {uploading ? "Uploading..." : "Upload File"}
                    </button>
                </form>

                {resources.length === 0 ? (
                    <div className="empty-resource">
                        <FileText size={55} />
                        <p>No files uploaded yet.</p>
                    </div>
                ) : (
                    <div className="resource-grid">
                        {resources.map((resource) => (
                            <div className="resource-card" key={resource._id}>
                                <div className="resource-icon">
                                    <FileText size={34} />
                                </div>

                                <div className="resource-info">
                                    <h3>{resource.title}</h3>
                                    <p>{resource.fileName}</p>
                                    <small>
                                        {(resource.fileSize / 1024 / 1024).toFixed(2)} MB
                                    </small>
                                </div>

                                <div className="resource-actions">
                                    <a
                                        href={resource.fileUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="download-btn"
                                    >
                                        <Download size={17} />
                                        Open
                                    </a>

                                    <button
                                        className="danger-icon"
                                        onClick={() => deleteResource(resource._id)}
                                    >
                                        <Trash2 size={17} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}

export default GroupDetails;