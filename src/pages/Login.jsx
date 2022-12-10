import { useState, useContext } from "react";
import { Button } from "@mui/material";
import { Formik, Field, Form } from "formik";
import { TextField } from "formik-mui";
import { axios } from "../util/http";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { AppState } from "../App";

const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email("Email is Not Valid")
        .required("Email is Required"),
    password: Yup.string().required("Password is Required"),
});

function Login() {
    const [errMsg, setMsg] = useState("");
    const [appState, dispatch] = useContext(AppState);

    const nav = useNavigate();

    return (
        <Formik
            initialValues={{
                email: "",
                password: "",
            }}
            validationSchema={LoginSchema}
            onSubmit={async (values) => {
                try {
                    const { data } = await axios.post("/login", values);
                    localStorage.setItem("token", data.token.token);
                    localStorage.setItem("user_id", data.token.user_id);
                    dispatch({ type: "login", payload: data });
                    if (data.role === "user") {
                        nav("/dashboard");
                    } else if (data.role === "admin") {
                        nav("/admin");
                    }
                } catch (error) {
                    setMsg(error.response.data);
                }
            }}
        >
            <Form>
                <div className="w-[100vw] h-[50vh] flex flex-col gap-4 justify-center items-center">
                    <Field
                        component={TextField}
                        name="email"
                        type="text"
                        label="Email"
                    />
                    <Field
                        component={TextField}
                        name="password"
                        type="password"
                        label="Password"
                    />
                    <Button type="submit" variant="contained">
                        Login
                    </Button>
                    <div>
                        <h3 className="text-red-500 text-lg">{errMsg}</h3>
                    </div>
                </div>
            </Form>
        </Formik>
    );
}

export default Login;
