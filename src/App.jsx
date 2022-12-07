import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import UserList from "./pages/admin/UserList";
import AdminIndex from "./pages/AdminIndex";
import Home from "./pages/Home";
import RegisterUser from "./pages/RegisterUser";
import AuthLayout from "./util/AuthLayout";

function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route element={<AuthLayout />}>
                    <Route path="admin">
                        <Route index element={<AdminIndex />} />
                        <Route path="register" element={<RegisterUser />} />
                        <Route path="users" element={<UserList />} />
                    </Route>
                </Route>
            </Routes>
        </>
    );
}

export default App;
