import { useState } from "react";
import api from "../services/api";

function AdminPage() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [keyPoints, setKeyPoints] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        const question = {

            title,

            description,

            expectedKeyPoints: keyPoints
                .split(",")
                .map(point => ({
                    point: point.trim()
                }))

        };

        try {

            await api.post("/admin/questions", question);

            alert("Question added successfully!");

            setTitle("");
            setDescription("");
            setKeyPoints("");

        } catch (error) {

            console.error(error);

            alert("Failed to add question.");

        }

    };

    return (

        <div>

            <h1>Admin Page</h1>

            <form onSubmit={handleSubmit}>

                <div>
                    <label>Question Title</label>
                    <br />
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <br />

                <div>
                    <label>Description</label>
                    <br />
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <br />

                <div>
                    <label>Expected Key Points (comma separated)</label>
                    <br />
                    <textarea
                        value={keyPoints}
                        onChange={(e) => setKeyPoints(e.target.value)}
                    />
                </div>

                <br />

                <button type="submit">
                    Add Question
                </button>

            </form>

        </div>

    );

}

export default AdminPage;