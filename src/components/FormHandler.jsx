import { useState } from "react"

export default function FormHandler(props) {

    const [data, setdata] = useState({
        fname: "",
        lname: "",
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({
        fname: "",
        lname: "",
        email: "",
        password: ""
    });

    function handleChange(e) {
        const inputFilled = e.currentTarget;
        if (inputFilled.id == "fname-user") {
            setdata(prevData => (
                {
                    ...prevData,
                    fname: inputFilled.value
                }));
            setErrors(prevErrors => (
                {
                    ...prevErrors,
                    fname: ""
                }));

        }
        else if (inputFilled.id == "lname-user") {
            setdata(prevData => (
                {
                    ...prevData,
                    lname: inputFilled.value
                }));
            setErrors(prevErrors => (
                {
                    ...prevErrors,
                    lname: ""
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

    function handleSubmit(e) {
        
        e.preventDefault();

        let isValide = true;

        if (data.fname == "") {
            setErrors(prevErrors => (
                {
                    ...prevErrors,
                    fname: "*Fist name is required"
                }));
            isValide = false;
        }

        if (data.lname == "") {
            setErrors(prevErrors => (
                {
                    ...prevErrors,
                    lname: "*Last name is required"
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
    
            if(!patternEmail.test(data.email)){
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
            const patternPass = '/^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/';
            if(data.password.length < 8){
                setErrors(prevErrors => (
                {
                    ...prevErrors,
                    password: "*Password must be at least 8 characters"
                }));
                isValide = false;
            }  
        }

        //when the form is valide we can send
    }

    return (
        <form action="" className="access-form" onSubmit={handleSubmit}>
            {!props.register &&
                (
                    <>
                        <label className="input-container">
                            First Name
                            <input
                                type="text"
                                name="fname-user"
                                id="fname-user"
                                className={"input-filled " + (errors.fname != "" && "error-input") }
                                value={data.fname}
                                onChange={handleChange}
                            />

                            <span className="error-message">{errors.fname}</span>  
                        </label>
                        <label className="input-container">
                            Last Name
                            <input
                                type="text"
                                name="lname-user"
                                id="lname-user"
                                className={"input-filled " + (errors.lname != "" && "error-input") }
                                value={data.lname}
                                onChange={handleChange}
                            />
                            
                            <span className="error-message">{errors.lname}</span>
                    
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
                    className={"input-filled " + (errors.email != "" && "error-input") }
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
                    className={"input-filled " + (errors.password != "" && "error-input") }
                    value={data.password}
                    onChange={handleChange}
                />
                <span className="error-message">{errors.password}</span>
            
            </label>
            <label className="custom-checkbox">
                <input type="checkbox" name="chbx" id="chbx" />
                <span className="checkmark" />
                {props.register ? `Remember me` : <>I agree the<a href="#">Terms & Conditions</a></>}
            </label>
            <button type="submit" className="form-btn">
                {props.register ? `Log in` : `Sign up`}
            </button>
        </form>
    )
}