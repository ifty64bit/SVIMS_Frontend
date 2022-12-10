import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, MenuItem } from "@mui/material";
import { Formik, Field, Form } from "formik";
import { TextField, Select } from "formik-mui";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { axios } from "../../util/http";
import Loading from "../../components/Loading";
import Modal from "../../components/Modal";
import * as Yup from "yup";
dayjs.extend(relativeTime);

const UpdateSchema = Yup.object().shape({
    first_name: Yup.string()
        .min(3, "First Name Too Short")
        .required("First Name Required"),
    last_name: Yup.string()
        .min(3, "Last Name Too Short")
        .required("Last Name Required"),
    email: Yup.string()
        .email("Email is Not Valid")
        .required("Email is Required"),
    phone: Yup.number().required("Phone is Required"),
    blood_group: Yup.mixed().required("Blood Group Required"),
    nid: Yup.number().required("NID Number is Required"),
    address: Yup.string().required("Address is Required"),
});

function UserProfile() {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const { id } = useParams();

    useEffect(() => {
        (async () => {
            const { data } = await axios.get(`/users/user/${id}`);
            setUser({ ...data });
            setIsLoading(false);
        })();
    }, []);
    if (isLoading) return <Loading />;
    return (
        <>
            <div className="mx-8 mt-8">
                <div className="flex gap-4">
                    <div className="">
                        <div className="flex flex-col items-center gap-4 shadow-lg border rounded-lg w-52 p-4">
                            <img
                                src={`${import.meta.env.VITE_IMAGE_URL}/${
                                    user?.photo
                                }`}
                                alt=""
                                className="w-40 rounded-full"
                            />
                            <div className="w-full">
                                <h4 className="font-bold text-lg">{`${user?.first_name} ${user?.last_name}`}</h4>
                                <p className="uppercase">{user.role}</p>
                                <p>{user?.address}</p>
                                <p>
                                    Joined: {dayjs(user?.created_at).fromNow()}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="shadow-lg border rounded-lg p-4 w-full flex justify-between">
                        <div>
                            <p>Email: {user?.email}</p>
                            <p>Phone: {user?.phone}</p>
                            <p>Blood Group: {user?.blood_group}</p>
                            <p>Date of Birth: {user?.dob}</p>
                            <p>NID: {user?.nid}</p>
                        </div>
                        <div>
                            <Button
                                variant="contained"
                                onClick={() => setIsModalOpen(true)}
                            >
                                Edit
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                isOpen={isModalOpen}
                title="Update User"
                onClose={() => setIsModalOpen(false)}
            >
                <div className="w-full mt-4 flex justify-center">
                    <Formik
                        initialValues={{
                            first_name: user?.first_name,
                            last_name: user?.last_name,
                            email: user?.email,
                            phone: user?.phone,
                            blood_group: user?.blood_group,
                            nid: user?.nid,
                            dob: user?.dob,
                            address: user?.address,
                        }}
                        validationSchema={UpdateSchema}
                        onSubmit={async (values) => {
                            try {
                                const { data } = await axios.put(
                                    "/users/user/" + user?.id,
                                    values
                                );
                                setIsModalOpen(false);
                                setUser(data);
                            } catch (error) {
                                console.log(error);
                            }
                        }}
                        validate={(values) => console.log(values)}
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
                                        value={values.dob}
                                        onChange={(e) =>
                                            setFieldValue("dob", e.target.value)
                                        }
                                    />
                                    <Field
                                        component={TextField}
                                        name="address"
                                        type="text"
                                        label="Address"
                                        className="col-span-2"
                                    />
                                    <div className="col-span-2">
                                        <Button
                                            type="submit"
                                            size="large"
                                            fullWidth
                                            variant="contained"
                                        >
                                            Update
                                        </Button>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                    <div className="text-xl text-red-500">{errorMsg}</div>
                </div>
            </Modal>
        </>
    );
}

export default UserProfile;
