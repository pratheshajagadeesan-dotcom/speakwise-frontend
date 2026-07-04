import { useEffect, useState } from "react";
import api from "../services/api";
import QuestionCard from "../components/QuestionCard";

function PracticePage() {

    const [questions, setQuestions] = useState([]);


    const [selectedQuestion, setSelectedQuestion] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

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
                <h3>Selected Question: {selectedQuestion.title}</h3>
            )}
        </div>
    );

}

export default PracticePage;