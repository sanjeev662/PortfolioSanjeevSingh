import React, { useState } from "react";
import "./Form.css";
import { validateEmail, validateText } from "../../utils/helpers";

function Form() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const [errorName, setErrorName] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleInputChange = (e) => {
        const { target } = e;
        const inputType = target.name;
        const inputValue = target.value;

        if (inputType === "name") {
            setName(inputValue);
            if (!validateText(inputValue)) {
                setErrorName("Please enter a name.");
                document.querySelector("#name-form").style.borderColor = "red";
            } else {
                setErrorName("");
                document.querySelector("#name-form").style.borderColor =
                    "#ced4da";
            }
        } else if (inputType === "email") {
            setEmail(inputValue);
            if (!validateEmail(inputValue)) {
                setErrorEmail("Please enter a valid email.");
                document.querySelector("#email-form").style.borderColor = "red";
            } else {
                setErrorEmail("");
                document.querySelector("#email-form").style.borderColor =
                    "#ced4da";
            }
        } else {
            setMessage(inputValue);
            if (!validateText(inputValue)) {
                setErrorMessage("Please leave a message.");
                document.querySelector("#message-form").style.borderColor =
                    "red";
            } else {
                setErrorMessage("");
                document.querySelector("#message-form").style.borderColor =
                    "#ced4da";
            }
        }
    };

    const handleFormSubmit = (e) => {
        // Preventing the default behavior of the form submit (which is to refresh the page)
        e.preventDefault();

        let error = false;
        // First we check to see if the email is not valid or if the userName is empty. If so we set an error message to be displayed on the page.
        if (!validateText(name)) {
            setErrorName(`Please enter a name.`);
            error = true;
            document.querySelector("#name-form").style.borderColor = "red";
        }

        if (!validateEmail(email)) {
            setErrorEmail("Please enter a valid email.");
            error = true;
            document.querySelector("#email-form").style.borderColor = "red";
        }
        if (!validateText(message)) {
            setErrorMessage(`Please leave a message.`);
            error = true;
            document.querySelector("#message-form").style.borderColor = "red";
        }

        if (error) {
            return;
        }

        window.open(
            `mailto:singhsksingh662@gmail.com?subject=${name}&body=${message} %0d%0a%0d%0aName: ${name} %0d%0aEmail: ${email}`
        );
        setName("");
        setEmail("");
        setMessage("");
        alert("Email generated");
    };

    return (
        <div className="ms-3 me-3">
            <form className="form">
                <label className="form-label">Name</label>
                {errorName && (
                    <span className="error-text">
                        &nbsp;&nbsp;
                        <i className="fas fa-exclamation-circle"></i>
                        &nbsp;{errorName}
                    </span>
                )}
                <input
                    id="name-form"
                    className="form-control"
                    value={name}
                    name="name"
                    onChange={handleInputChange}
                    onMouseLeave={handleInputChange}
                    type="text"
                />

                <label className="form-label mt-2">Email</label>

                {errorEmail && (
                    <span className="error-text">
                        &nbsp;&nbsp;
                        <i className="fas fa-exclamation-circle"></i>
                        &nbsp;
                        {errorEmail}
                    </span>
                )}
                <input
                    id="email-form"
                    className="form-control"
                    value={email}
                    name="email"
                    onChange={handleInputChange}
                    onMouseLeave={handleInputChange}
                    type="email"
                />
                <label className="form-label mt-2">Message</label>
                {errorMessage && (
                    <span className="error-text">
                        &nbsp;&nbsp;
                        <i className="fas fa-exclamation-circle"></i>
                        &nbsp;{errorMessage}
                    </span>
                )}

                <textarea
                    id="message-form"
                    className="form-control"
                    value={message}
                    name="message"
                    onChange={handleInputChange}
                    onMouseLeave={handleInputChange}
                    type="text"
                />
                <button
                    className="btn mt-3"
                    type="submit"
                    onClick={handleFormSubmit}
                >
                    <i className="far fa-paper-plane"></i>&nbsp;&nbsp;Create
                    Message
                </button>
            </form>
        </div>
    );
}

export default Form;
