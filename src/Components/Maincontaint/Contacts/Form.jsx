import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  User, 
  Mail, 
  MessageSquare, 
  Send, 
  AlertCircle,
  CheckCircle,
  Phone,
  MapPin
} from "lucide-react";

import { Button } from "../../ui/button";
import { GlassCard, Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
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
    focus: { scale: 1.01, transition: { duration: 0.2 } },
    blur: { scale: 1, transition: { duration: 0.2 } }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "sanjeevsinghkaushik662@gmail.com",
      href: "mailto:sanjeevsinghkaushik662@gmail.com"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 XXXXX XXXXX",
      href: "tel:+91XXXXXXXXX"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "New Delhi, India",
      href: null
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
      {/* Contact Information */}
      <GlassCard className="p-6 lg:p-8 order-2 lg:order-1">
        <CardHeader className="px-0 pt-0 pb-4 lg:pb-6">
          <CardTitle className="text-xl lg:text-2xl font-bold flex items-center">
            <Mail className="w-5 h-5 lg:w-6 lg:h-6 mr-2 text-primary" />
            Get In Touch
          </CardTitle>
          <p className="text-muted-foreground text-sm lg:text-base">
            I'd love to hear from you. Send me a message and I'll respond as soon as possible.
          </p>
        </CardHeader>
        
        <CardContent className="px-0 pb-0">
          <div className="space-y-3 lg:space-y-4">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-3 lg:space-x-4 p-3 lg:p-4 rounded-lg bg-background/50 border border-border/50 hover:border-primary/50 transition-colors"
              >
                <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
                  <info.icon className="w-4 h-4 lg:w-5 lg:h-5 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs lg:text-sm text-muted-foreground">{info.label}</p>
                  {info.href ? (
                    <a 
                      href={info.href}
                      className="font-medium hover:text-primary transition-colors text-sm lg:text-base break-all"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p className="font-medium text-sm lg:text-base">{info.value}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </GlassCard>

      {/* Contact Form */}
      <GlassCard className="p-6 lg:p-8 order-1 lg:order-2">
        <CardHeader className="px-0 pt-0 pb-4 lg:pb-6">
          <CardTitle className="text-xl lg:text-2xl font-bold flex items-center">
            <MessageSquare className="w-5 h-5 lg:w-6 lg:h-6 mr-2 text-primary" />
            Send Message
          </CardTitle>
        </CardHeader>
        
        <CardContent className="px-0 pb-0">
          <form onSubmit={handleFormSubmit} className="space-y-4 lg:space-y-6">
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
                  className={`w-full px-3 lg:px-4 py-2.5 lg:py-3 rounded-lg border bg-background/50 backdrop-blur-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-sm lg:text-base ${
                    errors.name ? 'border-red-500 focus:ring-red-500/50' : 'border-border hover:border-primary/50'
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center mt-2 text-red-500 text-xs lg:text-sm"
                  >
                    <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" />
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
                  className={`w-full px-3 lg:px-4 py-2.5 lg:py-3 rounded-lg border bg-background/50 backdrop-blur-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-sm lg:text-base ${
                    errors.email ? 'border-red-500 focus:ring-red-500/50' : 'border-border hover:border-primary/50'
                  }`}
                  placeholder="Enter your email address"
                />
                {errors.email && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center mt-2 text-red-500 text-xs lg:text-sm"
                  >
                    <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" />
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
                  className={`w-full px-3 lg:px-4 py-2.5 lg:py-3 rounded-lg border bg-background/50 backdrop-blur-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary resize-none text-sm lg:text-base ${
                    errors.message ? 'border-red-500 focus:ring-red-500/50' : 'border-border hover:border-primary/50'
                  }`}
                  placeholder="Tell me about your project, ask a question, or just say hello..."
                />
                {errors.message && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center mt-2 text-red-500 text-xs lg:text-sm"
                  >
                    <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" />
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
                className={`flex items-center p-3 lg:p-4 rounded-lg text-sm lg:text-base ${
                  submitStatus === 'success' 
                    ? 'bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800'
                    : 'bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800'
                }`}
              >
                {submitStatus === 'success' ? (
                  <>
                    <CheckCircle className="w-4 h-4 lg:w-5 lg:h-5 mr-2 flex-shrink-0" />
                    Message sent successfully! I'll get back to you soon.
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4 lg:w-5 lg:h-5 mr-2 flex-shrink-0" />
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
                  className="w-4 h-4 lg:w-5 lg:h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                />
              ) : (
                <Send className="w-4 h-4 lg:w-5 lg:h-5 mr-2 group-hover:translate-x-1 transition-transform" />
              )}
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </CardContent>
      </GlassCard>
    </div>
  );
}

export default Form;
