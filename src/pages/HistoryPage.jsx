import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function HistoryPage() {

    const [sessions, setSessions] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        api.get("/sessions")
            .then((response) => {

                console.log(response.data);

                setSessions(response.data);

                setLoading(false);

            })
            .catch((error) => {

                console.error(error);

                setError("Failed to load session history.");

                setLoading(false);

            });

    }, []);

    if (loading) {

        return <h2>Loading...</h2>;

    }

    if (error) {

        return <h2>{error}</h2>;

    }

    if (sessions.length === 0) {

        return <h2>No sessions yet.</h2>;

    }

    return (

        <div>

            <h1>Session History</h1>

            <table border="1" cellPadding="10">

                <thead>

                <tr>

                    <th>Session ID</th>

                    <th>Question</th>

                    <th>Report</th>

                </tr>

                </thead>

                <tbody>

                {sessions.map((session) => (

                    <tr key={session.id}>

                        <td>{session.id}</td>

                        <td>
                            {session.question ? session.question.title : "No Question"}
                        </td>

                        <td>

                            <Link to={`/report/${session.id}`}>
                                View Report
                            </Link>

                        </td>

                    </tr>

                ))}

                </tbody>

            </table>

        </div>

    );

}

export default HistoryPage;