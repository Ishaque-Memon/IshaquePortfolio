import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import portfolioApi from "@/api/portfolioApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { outlineIcon, SidebarIcons } from "@/assets/Icons/Icons";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Enhanced ContactSection with API integration
 * Fetches email, phone, and location from the About API
 */
const ContactSection = () => {
  const { isDarkMode } = useTheme();
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  
  // State for personal info from API
  const [personalInfo, setPersonalInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [formStatus, setFormStatus] = useState('idle');

  // Fetch personal info on component mount
  useEffect(() => {
    const fetchPersonalInfo = async () => {
      try {
        setLoading(true);
        const response = await portfolioApi.getPersonalInfo();
        console.log('Personal Info Response:', response);
        
        // Handle both response.data and direct response
        const data = response?.data || response;
        setPersonalInfo(data);
      } catch (error) {
        console.error('Error fetching personal info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPersonalInfo();
  }, []);

  useEffect(() => {
    const formElements = formRef.current?.querySelectorAll('.form-element');
    if (formElements && formElements.length > 0) {
      gsap.fromTo(
        formElements,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');
    try {
      await portfolioApi.submitContactForm(formData);
      setFormStatus('success');
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
      setTimeout(() => {
        setFormStatus('idle');
      }, 5000);
    } catch (error) {
      console.error("Error sending message:", error);
      setFormStatus('error');
      setTimeout(() => {
        setFormStatus('idle');
      }, 5000);
    }
  };

  // Build contact info items from API data
  const contactInfoItems = [
    {
      icon: outlineIcon.Mail,
      label: "Email",
      value: personalInfo?.email || "Loading...",
      href: personalInfo?.email ? `mailto:${personalInfo.email}` : "#",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: outlineIcon.Phone,
      label: "Phone",
      value: personalInfo?.phone || "Loading...",
      href: personalInfo?.phone ? `tel:${personalInfo.phone}` : "#",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: outlineIcon.globe,
      label: "Location",
      value: personalInfo?.location 
        ? `${personalInfo.location.city || ''}${personalInfo.location.city && personalInfo.location.country ? ', ' : ''}${personalInfo.location.country || ''}`.trim() || "Loading..."
        : "Loading...",
      href: "https://maps.google.com/",
      color: "from-red-500 to-pink-500"
    }
  ];

  // Build social links from API data
  const socialLinks = personalInfo?.socialLinks ? [
    { 
      platform: 'github', 
      icon: outlineIcon.github, 
      url: personalInfo.socialLinks.github 
    },
    { 
      platform: 'linkedin', 
      icon: outlineIcon.linkedin, 
      url: personalInfo.socialLinks.linkedin 
    },
    { 
      platform: 'twitter', 
      icon: outlineIcon.mail, 
      url: personalInfo.socialLinks.twitter 
    },
    { 
      platform: 'website', 
      icon: outlineIcon.envelope, 
      url: personalInfo.socialLinks.website 
    }
  ].filter(link => link.url) : [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`py-20 lg:py-32 ${
        isDarkMode ? 'bg-neutral-900' : 'bg-white'
      } transition-colors duration-300 relative overflow-hidden`}
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-primary-500/5 to-accent-500/5 rounded-full blur-3xl animate-gentle-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-accent-500/5 to-primary-500/5 rounded-full blur-3xl animate-gentle-glow"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className={`text-4xl lg:text-5xl font-bold mb-6 ${
            isDarkMode ? 'text-white' : 'text-neutral-900'
          }`}>
            Let's Start a <span className="gradient-text">Conversation</span>
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${
            isDarkMode ? 'text-neutral-300' : 'text-neutral-700'
          }`}>
            Have a project in mind? I'd love to hear from you. Send me a message
            and I'll respond as soon as possible.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full mt-8"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants}>
              <h3 className={`text-2xl lg:text-3xl font-bold mb-8 ${
                isDarkMode ? 'text-white' : 'text-neutral-900'
              }`}>
                Get in Touch
              </h3>

              {/* Contact Info Cards */}
              <div className="space-y-6">
                {loading ? (
                  // Loading skeleton
                  Array(3).fill(0).map((_, index) => (
                    <div
                      key={index}
                      className={`p-6 rounded-2xl border animate-pulse ${
                        isDarkMode
                          ? 'bg-neutral-800 border-neutral-700'
                          : 'bg-neutral-50 border-neutral-200'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-xl bg-neutral-600"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-neutral-600 rounded w-20"></div>
                          <div className="h-3 bg-neutral-600 rounded w-32"></div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  contactInfoItems.map((info, index) => (
                    <motion.a
                      key={index}
                      href={info.href}
                      target={info.label === "Location" ? "_blank" : undefined}
                      rel={info.label === "Location" ? "noopener noreferrer" : undefined}
                      className={`block p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg ${
                        isDarkMode
                          ? 'bg-neutral-800 border-neutral-700 hover:border-neutral-600'
                          : 'bg-neutral-50 border-neutral-200 hover:border-neutral-300'
                      }`}
                      whileHover={{ y: -2, scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${info.color}/20 text-2xl`}>
                          {info.icon}
                        </div>
                        <div>
                          <h4 className={`font-semibold ${
                            isDarkMode ? 'text-white' : 'text-neutral-900'
                          }`}>
                            {info.label}
                          </h4>
                          <p className={`${
                            isDarkMode ? 'text-neutral-300' : 'text-neutral-700'
                          }`}>
                            {info.value}
                          </p>
                        </div>
                      </div>
                    </motion.a>
                  ))
                )}
              </div>
            </motion.div>

            {/* Social Links */}
            {socialLinks.length > 0 && (
              <motion.div variants={itemVariants}>
                <h4 className={`text-lg font-semibold mb-4 ${
                  isDarkMode ? 'text-white' : 'text-neutral-900'
                }`}>
                  Follow Me
                </h4>
                <div className="flex space-x-4">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 rounded-xl border transition-all duration-300 text-xl ${
                        isDarkMode
                          ? 'bg-neutral-800 border-neutral-700 text-neutral-400 hover:text-white hover:border-neutral-600'
                          : 'bg-white border-neutral-200 text-neutral-600 hover:text-neutral-900 hover:border-neutral-300'
                      }`}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Availability Status */}
            <motion.div
              variants={itemVariants}
              className={`p-6 rounded-2xl border ${
                isDarkMode
                  ? 'bg-green-900/20 border-green-700/50'
                  : 'bg-green-50 border-green-200'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className={`font-semibold ${
                  isDarkMode ? 'text-green-400' : 'text-green-700'
                }`}>
                  Available for new projects
                </span>
              </div>
              <p className={`mt-2 text-sm ${
                isDarkMode ? 'text-green-300' : 'text-green-600'
              }`}>
                I'm currently accepting new freelance projects and collaboration opportunities.
              </p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className={`p-8 rounded-3xl border ${
              isDarkMode
                ? 'bg-neutral-800 border-neutral-700'
                : 'bg-neutral-50 border-neutral-200'
            }`}>
              <CardHeader className="p-0 mb-8">
                <CardTitle className={`text-2xl ${
                  isDarkMode ? 'text-white' : 'text-neutral-900'
                }`}>
                  Send Me a Message
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <div className="form-element">
                    <Label className={`block text-sm font-semibold mb-2 ${
                      isDarkMode ? 'text-neutral-300' : 'text-neutral-700'
                    }`}>
                      Your Name
                    </Label>
                    <div className="relative">
                      <div className={`absolute left-4 top-1/2 transform -translate-y-1/2 text-xl z-10 ${
                        isDarkMode ? 'text-neutral-500' : 'text-neutral-400'
                      }`}>
                        {outlineIcon.User}
                      </div>
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className={`pl-12 pr-4 py-6 rounded-xl border transition-all duration-300 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 ${
                          isDarkMode
                            ? 'bg-neutral-700 border-neutral-600 text-white placeholder-neutral-400'
                            : 'bg-white border-neutral-300 text-neutral-900 placeholder-neutral-500'
                        }`}
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="form-element">
                    <Label className={`block text-sm font-semibold mb-2 ${
                      isDarkMode ? 'text-neutral-300' : 'text-neutral-700'
                    }`}>
                      Email Address
                    </Label>
                    <div className="relative">
                      <div className={`absolute left-4 top-1/2 transform -translate-y-1/2 text-xl z-10 ${
                        isDarkMode ? 'text-neutral-500' : 'text-neutral-400'
                      }`}>
                        {outlineIcon.Mail}
                      </div>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={`pl-12 pr-4 py-6 rounded-xl border transition-all duration-300 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 ${
                          isDarkMode
                            ? 'bg-neutral-700 border-neutral-600 text-white placeholder-neutral-400'
                            : 'bg-white border-neutral-300 text-neutral-900 placeholder-neutral-500'
                        }`}
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  {/* Subject Field */}
                  <div className="form-element">
                    <Label className={`block text-sm font-semibold mb-2 ${
                      isDarkMode ? 'text-neutral-300' : 'text-neutral-700'
                    }`}>
                      Subject
                    </Label>
                    <div className="relative">
                      <div className={`absolute left-4 top-1/2 transform -translate-y-1/2 text-xl z-10 ${
                        isDarkMode ? 'text-neutral-500' : 'text-neutral-400'
                      }`}>
                        {SidebarIcons.FiMessageSquare && <SidebarIcons.FiMessageSquare />}
                      </div>
                      <Input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className={`pl-12 pr-4 py-6 rounded-xl border transition-all duration-300 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 ${
                          isDarkMode
                            ? 'bg-neutral-700 border-neutral-600 text-white placeholder-neutral-400'
                            : 'bg-white border-neutral-300 text-neutral-900 placeholder-neutral-500'
                        }`}
                        placeholder="What's this about?"
                      />
                    </div>
                  </div>

                  {/* Message Field */}
                  <div className="form-element">
                    <Label className={`block text-sm font-semibold mb-2 ${
                      isDarkMode ? 'text-neutral-300' : 'text-neutral-700'
                    }`}>
                      Message
                    </Label>
                    <div className="relative">
                      <div className={`absolute left-4 top-4 text-xl z-10 ${
                        isDarkMode ? 'text-neutral-500' : 'text-neutral-400'
                      }`}>
                        {SidebarIcons.FiMessageSquare && <SidebarIcons.FiMessageSquare />}
                      </div>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className={`pl-12 pr-4 py-4 rounded-xl border transition-all duration-300 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 resize-none ${
                          isDarkMode
                            ? 'bg-neutral-700 border-neutral-600 text-white placeholder-neutral-400'
                            : 'bg-white border-neutral-300 text-neutral-900 placeholder-neutral-500'
                        }`}
                        placeholder="Tell me about your project or just say hello!"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <motion.div
                    whileHover={formStatus !== 'sending' ? { scale: 1.02 } : {}}
                    whileTap={formStatus !== 'sending' ? { scale: 0.98 } : {}}
                  >
                    <Button
                      type="submit"
                      disabled={formStatus === 'sending'}
                      className={`w-full py-6 px-8 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                        formStatus === 'sending'
                          ? 'bg-neutral-400 cursor-not-allowed'
                          : 'btn-primary'
                      } text-white`}
                    >
                      <AnimatePresence mode="wait">
                        {formStatus === 'sending' ? (
                          <motion.div
                            key="sending"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center space-x-2 text-xl"
                          >
                            <span className="animate-spin">⏳</span>
                            <span>Sending...</span>
                          </motion.div>
                        ) : formStatus === 'success' ? (
                          <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center space-x-2"
                          >
                            <span className="text-xl">{outlineIcon.CheckMark}</span>
                            <span>Message Sent!</span>
                          </motion.div>
                        ) : formStatus === 'error' ? (
                          <motion.div
                            key="error"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center space-x-2"
                          >
                            <span className="text-xl">{outlineIcon.CancelIcon}</span>
                            <span>Failed to Send</span>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="idle"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center space-x-2"
                          >
                            <span className="text-xl">{outlineIcon.ArrowRight}</span>
                            <span>Send Message</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Button>
                  </motion.div>

                  {/* Success/Error Messages */}
                  <AnimatePresence>
                    {formStatus === 'success' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-center p-4 bg-green-500/10 border border-green-500/20 rounded-xl"
                      >
                        <p className="text-green-500 font-medium">
                          Thank you for your message! I'll get back to you soon.
                        </p>
                      </motion.div>
                    )}
                    {formStatus === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-center p-4 bg-red-500/10 border border-red-500/20 rounded-xl"
                      >
                        <p className="text-red-500 font-medium">
                          Failed to send message. Please try again or contact me directly.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;