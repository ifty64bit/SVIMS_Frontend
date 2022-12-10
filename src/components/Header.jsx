import { useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { AppState } from "../App";

function Header() {
    const [appState, dispatch] = useContext(AppState);
    //const nav = useNavigate();
    // useEffect(() => {
    //     if (!appState.isLoggedin) {
    //         nav("/login");
    //     }
    // }, [appState.isLoggedin]);

    const token = localStorage.getItem("token");

    return (
        <div className="w-screen bg-green-400 h-24 flex justify-between items-center px-4">
            <div>
                <Button variant="contained">Home</Button>
            </div>
            <div>
                <Link to={"/"}>
                    <h1 className="text-4xl">SVIMS</h1>
                </Link>
            </div>
            <div>
                {token ? (
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => dispatch({ type: "logout" })}
                    >
                        Logout
                    </Button>
                ) : (
                    <Link to={"/login"}>
                        <Button variant="contained" >Login</Button>
                    </Link>
                )}
            </div>
        </div>
    );
}

export default Header;
