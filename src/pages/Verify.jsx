import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import { TextField } from "formik-mui";
import { Button } from "@mui/material";
import * as Yup from "yup";
import { axios } from "../util/http";

const PasswordSchema = Yup.object().shape({
    password: Yup.string().min(4).required("Password is Required"),
    passwordAgain: Yup.string().min(3).required("Password is Required").oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

function Verify() {
    const [disabled, setDisabled] = useState(true);
    const [errMsg, setErrMsg] = useState("");

    const nav = useNavigate();
    const { token, email } = useParams();

    let id = "";

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.post("/verify", { email, token });
                if (data.id) {
                    setDisabled(false);
                    id = data.id;
                }
            } catch (error) {
                setErrMsg(error.response.data);
            }
        })();
    });

    return (
        <div>
            <Formik
                initialValues={{
                    password: "",
                    passwordAgain: "",
                }}
                validationSchema={PasswordSchema}
                onSubmit={async (values) => {
                    try {
                        const { data } = await axios.post(
                            `/users/user/${id}/setPassword`,
                            values
                        );
                        nav("/login");
                    } catch (error) {
                        setErrMsg(error.response.data);
                    }
                }}
            >
                <Form>
                    <div className="w-[100vw] h-[50vh] flex flex-col gap-4 justify-center items-center">
                        <Field
                            component={TextField}
                            name="password"
                            type="password"
                            label="Password"
                            disabled={disabled}
                        />
                        <Field
                            component={TextField}
                            name="passwordAgain"
                            type="password"
                            label="Confirm Password"
                            disabled={disabled}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={disabled}
                        >
                            Set Password
                        </Button>
                        <div>
                            <h3 className="text-red-500 text-lg">{errMsg}</h3>
                        </div>
                    </div>
                </Form>
            </Formik>
        </div>
    );
}

export default Verify;
