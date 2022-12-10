import { useReducer, createContext } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import UserList from "./pages/admin/UserList";
import AdminIndex from "./pages/AdminIndex";
import Home from "./pages/Home";
import Login from "./pages/Login";
import RegisterUser from "./pages/admin/RegisterUser";
import AuthLayout from "./util/AuthLayout";
import reducer from "./reducer";
import Dashboard from "./pages/Dashboard";
import Verify from "./pages/Verify";
import UserProfile from "./pages/admin/UserProfile";

export const AppState = createContext(null);

function App() {
    const [appState, dispatch] = useReducer(reducer, {
        isLoggedin: localStorage.getItem("token") ? true : false,
    });
    return (
        <>
            <AppState.Provider value={[appState, dispatch]}>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route element={<AuthLayout />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="admin">
                            <Route index element={<AdminIndex />} />
                            <Route path="register" element={<RegisterUser />} />
                            <Route path="users" element={<UserList />} />
                            <Route
                                path="user/:id"
                                element={<UserProfile />}
                            />
                        </Route>
                    </Route>
                    <Route path="/verify/:token/:email" element={<Verify />} />
                </Routes>
            </AppState.Provider>
        </>
    );
}

export default App;
