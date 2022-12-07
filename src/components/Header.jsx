import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

function Header() {
    return (
        <div className="w-screen bg-green-400 h-24 flex justify-between items-center px-4">
            <div>
                <Button type="primary">Home</Button>
            </div>
            <div>
                <Link to={"/"}>
                    <h1 className="text-4xl">SVIMS</h1>
                </Link>
            </div>
            <div><Button type={'secondary'}>Logout</Button></div>
        </div>
    );
}

export default Header;
