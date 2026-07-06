import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function LoginPage() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const [error, setError] = useState("");

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const response = await api.post("/auth/login", {
                username,
                password
            });

            console.log(response.data);

            sessionStorage.setItem("token", response.data.token);

            sessionStorage.setItem("role", response.data.role);

            navigate("/practice");

        } catch (err) {

            console.error(err);

            setError("Invalid username or password");

        }

    };

    return (
        <div>

            <h2>Login</h2>

            <form onSubmit={handleLogin}>

                <div>
                    <label>Username</label>
                    <br />
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <br />

                <div>
                    <label>Password</label>
                    <br />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <br />

                <button type="submit">
                    Login
                </button>

                {error && <p>{error}</p>}

            </form>

        </div>
    );
}

export default LoginPage;