import React from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";

function AdminIndex() {
    return (
        <div className="mx-8 mt-8">
            <div className="flex gap-4 flex-wrap">
                <Link to="register">
                    <Card>Register User</Card>
                </Link>
                <Link to="users">
                    <Card>User List</Card>
                </Link>
            </div>
        </div>
    );
}

export default AdminIndex;
