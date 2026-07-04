import { useState } from "react";
import QuestionCard from "../components/QuestionCard";

function PracticePage() {

    const questions = [
        {
            id: 1,
            title: "Tell me about yourself",
            description: "Introduce yourself in an interview."
        },
        {
            id: 2,
            title: "Why should we hire you?",
            description: "Explain why you are suitable."
        },
        {
            id: 3,
            title: "What are your strengths?",
            description: "Describe your strengths."
        },
        {
            id: 4,
            title: "What are your weaknesses?",
            description: "Describe your weaknesses."
        },
        {
            id: 5,
            title: "Where do you see yourself in 5 years?",
            description: "Talk about your future goals."
        }
    ];

    const [selectedQuestion, setSelectedQuestion] = useState(null);

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