import { Link, useLocation } from "react-router-dom";

function Navbar() {

    useLocation(); // causes Navbar to re-render when route changes

    const role = sessionStorage.getItem("role");

    console.log("Navbar Role:", role);

    return (

        <nav style={{ padding: "15px", borderBottom: "1px solid gray" }}>

            <Link to="/practice">Practice</Link>

            {" | "}

            <Link to="/history">History</Link>

            {" | "}

            {role === "ADMIN" && (
                <>
                    <Link to="/admin">Admin</Link>
                    {" | "}
                </>
            )}

        </nav>

    );

}

export default Navbar;