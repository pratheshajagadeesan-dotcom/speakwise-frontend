import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function ReportPage() {

    const { id } = useParams();

    const [report, setReport] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        api.get("/sessions/" + id + "/report")
            .then((response) => {

                console.log("Report from backend:", response.data);
                console.log("URL session id:", id);

                setReport(response.data);

                setLoading(false);

            })
            .catch((error) => {

                console.error(error);

                setError("Failed to load report.");

                setLoading(false);

            });

    }, [id]);

    if (loading) {

        return <h2>Loading Report...</h2>;

    }

    if (error) {

        return <h2>{error}</h2>;

    }

    return (

        <div
            style={{
                maxWidth: "600px",
                margin: "40px auto",
                textAlign: "center",
                padding: "20px",
                border: "1px solid #ddd",
                borderRadius: "10px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
            }}
        >

            <h1>Speech Report</h1>

            <h2>Report ID: {report.id}</h2>

            <h3>Relevance Score</h3>

            <progress
                value={report.score}
                max="100"
                style={{
                    width: "100%",
                    height: "25px"
                }}
            />

            <p>{report.score}%</p>

            <hr />

            <h3>Words Per Minute</h3>
            <p>{report.wpm}</p>

            <h3>Pause Count</h3>
            <p>{report.pauseCount}</p>

            <h3>Filler Count</h3>
            <p>{report.fillerWords.length}</p>

            <h3>Missing Key Points</h3>
            <p>{report.missingKeyPoints}</p>

            <h3>Tip</h3>
            <p>{report.tipMessage}</p>

        </div>

    );
}

export default ReportPage;