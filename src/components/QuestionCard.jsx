import Card from "./Card";
import Button from "./Button";

function QuestionCard({ title, description, onSelect }) {
    return (
        <Card>
            <h2>{title}</h2>

            <p>{description}</p>

            <Button
                text="Start Practice"
                onClick={onSelect}
            />
        </Card>
    );
}

export default QuestionCard;