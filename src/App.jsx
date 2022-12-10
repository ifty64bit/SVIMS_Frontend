import { useReducer, createContext } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import UserList from "./pages/admin/UserList";
import AdminIndex from "./pages/AdminIndex";
import Home from "./pages/Home";
import Login from "./pages/Login";
import RegisterUser from "./pages/RegisterUser";
import AuthLayout from "./util/AuthLayout";
import reducer from "./reducer";

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
                        <Route path="admin">
                            <Route index element={<AdminIndex />} />
                            <Route path="register" element={<RegisterUser />} />
                            <Route path="users" element={<UserList />} />
                        </Route>
                    </Route>
                </Routes>
            </AppState.Provider>
        </>
    );
}

export default App;
