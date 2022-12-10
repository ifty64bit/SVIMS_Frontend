import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { axios } from "../../util/http";

function UserList() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        (async () => {
            const { data } = await axios.get("/users");
            setUsers([...data]);
            console.log(data);
        })();
    }, []);
    return (
        //todo Seaarch bar
        <div className="mx-8 mt-8">
            <div>
                <h3 className="font-bold text-xl">User List: {users.length}</h3>
            </div>
            <div className="mt-4 flex flex-col gap-4">
                {users.map((user) => (
                    <Link to={`user/${user.id}`} key={user.id}>
                        <div className="w-full h-36 flex gap-4 border rounded overflow-hidden shadow-lg hover:border-green-500 transition-colors duration-200">
                            <img
                                src={`${import.meta.env.VITE_IMAGE_URL}/${
                                    user.photo
                                }`}
                                alt={user.first_name}
                            />
                            <div className="p-4">
                                <p> {`${user.first_name} ${user.last_name}`}</p>
                                <p>Email: {user.email}</p>
                                <p>Phone: {user.phone}</p>
                                <p>Address: {user.address}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default UserList;
