export default function reducer(state, action) {
    switch (action.type) {
        case "login":
            return { ...state, isLoggedin: true, user: action.payload };
        case "logout":
            localStorage.removeItem("token");
            localStorage.removeItem("user_id");
            return { ...state, isLoggedin: false };
        default:
            console.log("Default");
            return { ...state };
    }
}
