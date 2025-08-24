import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  User, 
  Mail, 
  MessageSquare, 
  Send, 
  AlertCircle,
  CheckCircle
} from "lucide-react";

import { Button } from "../../ui/button";
import { GlassCard } from "../../ui/card";
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
  const [submitStatus, setSubmitStatus] = useState(null);

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

    // Real-time validation
    if (name === "name" && value && !validateText(value)) {
      setErrors(prev => ({ ...prev, name: "Please enter a valid name." }));
    } else if (name === "email" && value && !validateEmail(value)) {
      setErrors(prev => ({ ...prev, email: "Please enter a valid email address." }));
    } else if (name === "message" && value && !validateText(value)) {
      setErrors(prev => ({ ...prev, message: "Please enter a message." }));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Validate all fields
    const newErrors = {};
    if (!validateText(formData.name)) {
      newErrors.name = "Please enter your name.";
    }
    if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!validateText(formData.message)) {
      newErrors.message = "Please enter a message.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate form submission delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      window.open(
        `mailto:singhsksingh662@gmail.com?subject=Contact from ${formData.name}&body=${formData.message}%0d%0a%0d%0aName: ${formData.name}%0d%0aEmail: ${formData.email}`
      );
      
      setFormData({ name: "", email: "", message: "" });
      setSubmitStatus("success");
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputVariants = {
    focus: { scale: 1.02, transition: { duration: 0.2 } },
    blur: { scale: 1, transition: { duration: 0.2 } }
  };

  return (
    <GlassCard className="p-8">
      <form onSubmit={handleFormSubmit} className="space-y-6">
        {/* Name Field */}
        <motion.div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center">
            <User className="w-4 h-4 mr-2 text-primary" />
            Name
          </label>
          <motion.div
            variants={inputVariants}
            whileFocus="focus"
            className="relative"
          >
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 rounded-lg border bg-background/50 backdrop-blur-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary ${
                errors.name ? 'border-red-500 focus:ring-red-500/50' : 'border-border hover:border-primary/50'
              }`}
              placeholder="Enter your full name"
            />
            {errors.name && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center mt-2 text-red-500 text-sm"
              >
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.name}
              </motion.div>
            )}
          </motion.div>
        </motion.div>

        {/* Email Field */}
        <motion.div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center">
            <Mail className="w-4 h-4 mr-2 text-primary" />
            Email
          </label>
          <motion.div
            variants={inputVariants}
            whileFocus="focus"
            className="relative"
          >
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 rounded-lg border bg-background/50 backdrop-blur-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary ${
                errors.email ? 'border-red-500 focus:ring-red-500/50' : 'border-border hover:border-primary/50'
              }`}
              placeholder="Enter your email address"
            />
            {errors.email && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center mt-2 text-red-500 text-sm"
              >
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.email}
              </motion.div>
            )}
          </motion.div>
        </motion.div>

        {/* Message Field */}
        <motion.div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center">
            <MessageSquare className="w-4 h-4 mr-2 text-primary" />
            Message
          </label>
          <motion.div
            variants={inputVariants}
            whileFocus="focus"
            className="relative"
          >
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={5}
              className={`w-full px-4 py-3 rounded-lg border bg-background/50 backdrop-blur-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary resize-none ${
                errors.message ? 'border-red-500 focus:ring-red-500/50' : 'border-border hover:border-primary/50'
              }`}
              placeholder="Tell me about your project or just say hello..."
            />
            {errors.message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center mt-2 text-red-500 text-sm"
              >
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.message}
              </motion.div>
            )}
          </motion.div>
        </motion.div>

        {/* Submit Status */}
        {submitStatus && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`flex items-center p-3 rounded-lg ${
              submitStatus === 'success' 
                ? 'bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800'
                : 'bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800'
            }`}
          >
            {submitStatus === 'success' ? (
              <>
                <CheckCircle className="w-5 h-5 mr-2" />
                Message sent successfully! I'll get back to you soon.
              </>
            ) : (
              <>
                <AlertCircle className="w-5 h-5 mr-2" />
                Something went wrong. Please try again.
              </>
            )}
          </motion.div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          variant="gradient"
          size="lg"
          className="w-full group"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
            />
          ) : (
            <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
          )}
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </GlassCard>
  );
}

export default Form;
