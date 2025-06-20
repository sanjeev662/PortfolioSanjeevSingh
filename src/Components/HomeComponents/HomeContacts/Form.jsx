import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaPaperPlane, FaExclamationCircle } from "react-icons/fa";
import "./Form.css";
import { validateEmail, validateText } from "../../utils/helpers";

function Form() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        message: ""
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ""
            }));
        }
    };

    const validateField = (name, value) => {
        let error = "";
        
        if (name === "name") {
            if (!validateText(value)) {
                error = "Please enter a valid name.";
            }
        } else if (name === "email") {
            if (!validateEmail(value)) {
                error = "Please enter a valid email address.";
            }
        } else if (name === "message") {
            if (!validateText(value)) {
                error = "Please enter a message.";
            }
        }
        
        return error;
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        const error = validateField(name, value);
        
        setErrors(prev => ({
            ...prev,
            [name]: error
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Validate all fields
        const newErrors = {};
        Object.keys(formData).forEach(key => {
            const error = validateField(key, formData[key]);
            if (error) {
                newErrors[key] = error;
            }
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setIsSubmitting(false);
            return;
        }

        try {
            // Open email client with pre-filled data
            const subject = `Portfolio Contact from ${formData.name}`;
            const body = `${formData.message}\n\nName: ${formData.name}\nEmail: ${formData.email}`;
            
            window.open(
                `mailto:sanjeevsinghkaushik662@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
            );

            // Reset form
            setFormData({
                name: "",
                email: "",
                message: ""
            });
            
            alert("Email client opened successfully!");
        } catch (error) {
            alert("There was an error. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="contact-form">
            <h3>Send Message</h3>
            <form onSubmit={handleFormSubmit} className="form">
                <div className="form-group">
                    <label htmlFor="name" className="form-label">
                        Name *
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        className={`form-input ${errors.name ? 'error' : ''}`}
                        value={formData.name}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        placeholder="Your full name"
                        required
                    />
                    {errors.name && (
                        <motion.div 
                            className="error-message"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <FaExclamationCircle />
                            {errors.name}
                        </motion.div>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="email" className="form-label">
                        Email *
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        className={`form-input ${errors.email ? 'error' : ''}`}
                        value={formData.email}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        placeholder="your.email@example.com"
                        required
                    />
                    {errors.email && (
                        <motion.div 
                            className="error-message"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <FaExclamationCircle />
                            {errors.email}
                        </motion.div>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="message" className="form-label">
                        Message *
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        className={`form-input ${errors.message ? 'error' : ''}`}
                        value={formData.message}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        placeholder="Tell me about your project or opportunity..."
                        rows="5"
                        required
                    />
                    {errors.message && (
                        <motion.div 
                            className="error-message"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <FaExclamationCircle />
                            {errors.message}
                        </motion.div>
                    )}
                </div>

                <motion.button
                    type="submit"
                    className="submit-btn"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    {isSubmitting ? (
                        <div className="loading-spinner"></div>
                    ) : (
                        <>
                            <FaPaperPlane />
                            Send Message
                        </>
                    )}
                </motion.button>
            </form>
        </div>
    );
}

export default Form;
