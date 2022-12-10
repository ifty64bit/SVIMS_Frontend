import { Button, Avatar, MenuItem } from "@mui/material";
import { Formik, Field, Form } from "formik";
import { TextField, Select } from "formik-mui";
import * as Yup from "yup";

const RegistrationSchema = Yup.object().shape({
    first_name: Yup.string()
        .min(3, "First Name Too Short")
        .required("First Name Required"),
    last_name: Yup.string()
        .min(3, "Last Name Too Short")
        .required("Last Name Required"),
    email: Yup.string()
        .email("Email is Not Valid")
        .required("Email is Required"),
    photo: Yup.mixed().required("Photo is Required"),
    phone: Yup.number().required("Phone is Required"),
    blood_group: Yup.mixed().required("Blood Group Required"),
    nid: Yup.number().required("NID Number is Required"),
    dob: Yup.date().required("Date Of Birth Required"),
    address: Yup.string().required("Address is Required"),
});

function RegisterUser() {
    return (
        <div className="w-full mt-16 flex justify-center">
            <Formik
                initialValues={{
                    first_name: "",
                    last_name: "",
                    email: "",
                    photo: "",
                    phone: "",
                    blood_group: "",
                    nid: "",
                    dob: "",
                    address: "",
                }}
                validationSchema={RegistrationSchema}
                onSubmit={(values) => console.log(values)}
            >
                {({ values, setFieldValue }) => (
                    <Form>
                        <div className="grid grid-cols-2 gap-4">
                            <Field
                                component={TextField}
                                name="first_name"
                                type="text"
                                label="First Name"
                            />
                            <Field
                                component={TextField}
                                name="last_name"
                                type="text"
                                label="Last Name"
                            />
                            <Field
                                component={TextField}
                                name="email"
                                type="email"
                                label="Email"
                                className="col-span-2"
                            />
                            <div className="relative">
                                <Button
                                    variant="contained"
                                    className=""
                                    component="label"
                                >
                                    Upload Photos
                                    <input
                                        hidden
                                        name="photo"
                                        accept="image/*"
                                        type="file"
                                        onChange={(event) => {
                                            setFieldValue(
                                                "photo",
                                                event.currentTarget.files[0]
                                            );
                                        }}
                                    />
                                </Button>
                            </div>
                            <Avatar
                                src={
                                    values.photo
                                        ? URL.createObjectURL(values.photo)
                                        : ""
                                }
                            />
                            <Field
                                component={TextField}
                                name="phone"
                                type="number"
                                label="Phone"
                            />
                            <Field
                                component={Select}
                                name="blood_group"
                                label="Blood Group"
                            >
                                <MenuItem value="">None</MenuItem>
                                <MenuItem value="A+">A+</MenuItem>
                                <MenuItem value="A-">A-</MenuItem>
                                <MenuItem value="B+">B+</MenuItem>
                                <MenuItem value="B-">B-</MenuItem>
                                <MenuItem value="AB+">AB+</MenuItem>
                                <MenuItem value="AB-">AB-</MenuItem>
                                <MenuItem value="O+">O+</MenuItem>
                                <MenuItem value="O-">O-</MenuItem>
                            </Field>
                            <Field
                                component={TextField}
                                name="nid"
                                type="number"
                                label="NID Number"
                            />

                            <input
                                className="border rounded h-14 px-3"
                                type="date"
                                name="dob"
                                placeholder="Date of Birth"
                            />
                            <div className="col-span-2">
                                <Button
                                    type="submit"
                                    size="large"
                                    fullWidth
                                    variant="contained"
                                >
                                    Register
                                </Button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default RegisterUser;
