import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const registrationApiUrl = `${backendUrl}/api/auth/register`;

export default function FormHandler(props) {

    //data for the form
    const [data, setdata] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });

    //errors messages for the form
    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        checkbox: ""
    });

    //loading state for the form submission
    const [isLoading, setIsLoading] = useState(false);

    //checkbox state for the form
    const [isChecked, setIsChecked] = useState(false);

    //function to handle checkbox toggle
    function handleToogle(e) {
        console.log("Checkbox toggled:", e.target.checked);
        setIsChecked(e.target.checked);
    }

    const navigate = useNavigate();

    function handleChange(e) {
        const inputFilled = e.currentTarget;
        if (inputFilled.id == "firstName-user") {
            setdata(prevData => (
                {
                    ...prevData,
                    firstName: inputFilled.value
                }));
            setErrors(prevErrors => (
                {
                    ...prevErrors,
                    firstName: ""
                }));

        }
        else if (inputFilled.id == "lastName-user") {
            setdata(prevData => (
                {
                    ...prevData,
                    lastName: inputFilled.value
                }));
            setErrors(prevErrors => (
                {
                    ...prevErrors,
                    lastName: ""
                }));
        }
        else if (inputFilled.id == "email-user") {
            setdata(prevData => (
                {
                    ...prevData,
                    email: inputFilled.value
                }));
            setErrors(prevErrors => (
                {
                    ...prevErrors,
                    email: ""
                }));
        }
        else if (inputFilled.id == "pass-user") {
            setdata(prevData => (
                {
                    ...prevData,
                    password: inputFilled.value
                }));
            setErrors(prevErrors => (
                {
                    ...prevErrors,
                    password: ""
                }));
        }
    }

    async function handleSubmit(e) {

        e.preventDefault();

        let isValide = true;

        if (data.firstName == "") {
            setErrors(prevErrors => (
                {
                    ...prevErrors,
                    firstName: "*First name is required"
                }));
            isValide = false;
        }

        if (data.lastName == "") {
            setErrors(prevErrors => (
                {
                    ...prevErrors,
                    lastName: "*Last name is required"
                }));
            isValide = false;
        }

        if (data.email == "") {
            setErrors(prevErrors => (
                {
                    ...prevErrors,
                    email: "*Email is required"
                }));
            isValide = false;


        } else {
            const patternEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

            if (!patternEmail.test(data.email)) {
                setErrors(prevErrors => (
                    {
                        ...prevErrors,
                        email: "*Invalid email address"
                    }));

                isValide = false;
            }
        }

        if (data.password == "") {
            setErrors(prevErrors => (
                {
                    ...prevErrors,
                    password: "*Password is required"
                }));
            isValide = false;

        } else {
            //const patternPass = '/^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/';
            if (data.password.length < 8) {
                setErrors(prevErrors => (
                    {
                        ...prevErrors,
                        password: "*Password must be at least 8 characters"
                    }));
                isValide = false;
            }
        }

        if (!isChecked) {
            setErrors(prevErrors => (
                {
                    ...prevErrors,
                    checkbox: "*You must agree to the Terms & Conditions"
                }));
            isValide = false;
        }

        if (isValide) {
            setIsLoading(true);
            try {

                const submittedData = {
                    first_name : data.firstName,
                    last_name : data.lastName,
                    email : data.email,
                    password : data.password
                }

                console.log("Submitting data:", JSON.stringify(submittedData));

                const response = await fetch(registrationApiUrl, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(submittedData),
                });

                const result = await response.json();

                console.log("Response from server :", result);
                
                if (response.ok) {
                    console.log("Registration successful!");

                    //clear form
                    setdata({
                        firstName: "",
                        lastName: "",
                        email: "",
                        password: ""
                    })

                    //redirect to the login in
                    navigate("/login");

                }
                else {
                    // Check for duplicate email error (customize as needed)
                    if (result.error && result.error.toLowerCase().includes("email")) {
                        toast.error("Email already exists. Please use a different email.");
                    } else {
                        toast.error(result.error || "Registration failed.");
                    }

                    //log the error for debigging
                    console.error("Registration failed: " + (result.error));

                    //clear email
                    setdata(prevData => (
                        {
                            ...prevData,
                            email: ""
                        }));
                }


            } catch (error) {
                toast.error(error.message || "An error occurred. Please try again.");
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }

    }

    return (
        <>
            <ToastContainer position="top-center" autoClose={3000} />
            <form action="" className="access-form" onSubmit={handleSubmit}>
                {!props.register &&
                    (
                        <>
                            <label className="input-container">
                                First Name
                                <input
                                    type="text"
                                    name="firstName-user"
                                    id="firstName-user"
                                    className={"input-filled " + (errors.firstName != "" && "error-input")}
                                    value={data.firstName}
                                    onChange={handleChange}
                                />

                                <span className="error-message">{errors.firstName}</span>
                            </label>
                            <label className="input-container">
                                Last Name
                                <input
                                    type="text"
                                    name="lastName-user"
                                    id="lastName-user"
                                    className={"input-filled " + (errors.lastName != "" && "error-input")}
                                    value={data.lastName}
                                    onChange={handleChange}
                                />

                                <span className="error-message">{errors.lastName}</span>

                            </label>
                        </>
                    )
                }
                <label className="input-container">
                    Email
                    <input
                        type="text"
                        name="email-user"
                        id="email-user"
                        className={"input-filled " + (errors.email != "" && "error-input")}
                        value={data.email}
                        onChange={handleChange}
                        placeholder="e.g. john.doe@gmail.com"
                    />
                    <span className="error-message">{errors.email}</span>
                </label>
                <label className="input-container">
                    Password
                    <input
                        type="password"
                        name="pass-user"
                        id="pass-user"
                        className={"input-filled " + (errors.password != "" && "error-input")}
                        value={data.password}
                        onChange={handleChange}
                    />
                    <span className="error-message">{errors.password}</span>

                </label>
                <label className="custom-checkbox">
                    <div>
                        <input
                            type="checkbox"
                            name="chbx"
                            id="chbx"
                            checked={isChecked}
                            onChange={handleToogle}
                        />

                        <span className="checkmark" />
                        {props.register ? `Remember me` : <>I agree the<a href="#">Terms & Conditions</a></>}
                    </div>
                    <span className="error-message">{errors.checkbox}</span>
                </label>
                <button type="submit" className="form-btn" disabled={isLoading}>
                    {isLoading ? (
                        <div className="button-loading">
                            <div className="spinner"></div>
                            <span>Loading...</span>
                        </div>
                    ) : (
                        props.register ? `Log in` : `Sign up`
                    )}
                </button>
            </form>
        </>
    )
}