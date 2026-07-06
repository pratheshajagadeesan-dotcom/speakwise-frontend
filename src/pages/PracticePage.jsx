import { useEffect, useState } from "react";
import api from "../services/api";
import QuestionCard from "../components/QuestionCard";
import { useNavigate } from "react-router-dom";

function PracticePage() {

    const [questions, setQuestions] = useState([]);


    const [selectedQuestion, setSelectedQuestion] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [selectedFile, setSelectedFile] = useState(null);

    const [uploading, setUploading] = useState(false);

    const [uploadError, setUploadError] = useState("");

    const [uploadProgress, setUploadProgress] = useState(0);

    const navigate = useNavigate();

    const handleLogout = () => {

        sessionStorage.removeItem("token");

        navigate("/login");

    };

    const handleUpload = async () => {

        if (!selectedQuestion) {

            alert("Please select a question.");
            return;

        }

        if (!selectedFile) {

            alert("Please choose an audio file.");
            return;

        }

        if (!selectedFile.type.startsWith("audio/")) {

            setUploadError("Please upload an audio file.");
            return;

        }

        if (selectedFile.size > 10 * 1024 * 1024) {

            setUploadError("File size should be less than 10 MB.");
            return;

        }

        const formData = new FormData();

        formData.append("file", selectedFile);
        formData.append("questionId", selectedQuestion.id);

        setUploading(true);
        setUploadProgress(0);
        setUploadError("");

        try {

            const response = await api.post(
                "/sessions",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },

                    onUploadProgress: (progressEvent) => {

                        const percent = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        );

                        setUploadProgress(percent);
                    }
                }
            );

            console.log(response.data);

            console.log("Speech Report ID:", response.data.id);

            navigate("/report/" + response.data.id);

        } catch (error) {

            console.error(error);

            setUploadError("Upload failed.");

        }

        setUploading(false);

    };

    useEffect(() => {

        api.get("/test")
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            });

    }, []);

    useEffect(() => {
        api.get("/questions")
            .then((response) => {
                setQuestions(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setError("Failed to load questions.");
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <h2>Loading...</h2>;
    }

    if (error) {
        return <h2>{error}</h2>;
    }

    return (
        <div>
            {questions.map((question) => (
                <QuestionCard
                    key={question.id}
                    title={question.title}
                    description={question.description}
                    onSelect={() => setSelectedQuestion(question)}
                />
            ))}

            {selectedQuestion && (
                <div>

                    <button onClick={handleLogout}>
                        Logout
                    </button>

                    <br />
                    <br />

                    <h3>
                        Selected Question: {selectedQuestion.title}
                    </h3>

                    <input
                        type="file"
                        onChange={(e) => setSelectedFile(e.target.files[0])}
                    />

                    <br />
                    <br />

                    <button onClick={handleUpload}>
                        Upload Audio
                    </button>

                    {uploadError && (
                        <p>{uploadError}</p>
                    )}

                    {uploading && (
                        <div>

                            <p>Upload Progress: {uploadProgress}%</p>

                            <p>Analyzing audio...</p>

                        </div>
                    )}

                </div>
            )}
        </div>
    );

}

export default PracticePage;