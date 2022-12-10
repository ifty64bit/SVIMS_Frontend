import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TextField } from "@mui/material";
import Loading from "../../components/Loading";
import { axios } from "../../util/http";

function UserList() {
    const [users, setUsers] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    // useEffect(() => {
    //     (async () => {
    //         const { data } = await axios.get("/users");
    //         setUsers([...data]);
    //     })();
    // }, []);

    useEffect(() => {
        const trigger = setTimeout(async () => {
            setIsLoading(true);
            const { data } = await axios.get("/users/" + searchInput);
            setUsers([...data]);
            setIsLoading(false);
        }, 300);
        return () => clearTimeout(trigger);
    }, [searchInput]);
    return (
        <div className="mx-8 mt-8">
            <div>
                <h3 className="font-bold text-xl">User List: {users.length}</h3>
            </div>
            <div className="mt-4">
                <TextField
                    className="w-full"
                    size="sm"
                    placeholder="Enter Name to Search"
                    onChange={(e) => setSearchInput(e.target.value)}
                />
            </div>
            <div className="mt-4 flex flex-col gap-4">
                {isLoading ? (
                    <Loading />
                ) : users.length ? (
                    users.map((user) => (
                        <Link to={`/admin/user/${user.id}`} key={user.id}>
                            <div className="w-full h-36 flex gap-4 border rounded overflow-hidden shadow-lg hover:border-green-500 transition-colors duration-200">
                                <img
                                    src={`${import.meta.env.VITE_IMAGE_URL}/${
                                        user.photo
                                    }`}
                                    alt={user.first_name}
                                />
                                <div className="p-4">
                                    <p>
                                        {" "}
                                        {`${user.first_name} ${user.last_name}`}
                                    </p>
                                    <p>Email: {user.email}</p>
                                    <p>Phone: {user.phone}</p>
                                    <p>Address: {user.address}</p>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    "No User Found"
                )}
            </div>
        </div>
    );
}

export default UserList;
