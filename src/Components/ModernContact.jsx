import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiSend, 
  FiUser, 
  FiMessageCircle,
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiInstagram,
  FiCheckCircle,
  FiClock,
  FiX
} from "react-icons/fi";
import { useTheme } from "../contexts/ThemeContext.jsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emailjs from "emailjs-com";
import SectionLoader from "./SectionLoader.jsx";

gsap.registerPlugin(ScrollTrigger);

const ModernContact = () => {
  const { isDarkMode } = useTheme();
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState('idle'); // idle, sending, success, error

  useEffect(() => {
    const formElements = formRef.current?.querySelectorAll('.form-element');
    
    if (formElements) {
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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');
    
    // Send form data using EmailJS with your credentials
    emailjs
      .sendForm(
        "service_2jtsv4n",          // Your service ID
        "template_l8liz6k",         // Your template ID
        e.target,                   // Form element
        "nGbeCCRi3CG9sW0M3"        // Your public key
      )
      .then(
        (result) => {
          console.log("Email sent successfully: ", result.text);
          setFormStatus('success');
          setFormData({ name: '', email: '', phone: '', message: '' });
          
          // Reset status after 5 seconds
          setTimeout(() => {
            setFormStatus('idle');
          }, 5000);
        },
        (error) => {
          console.error("Error sending email: ", error.text);
          setFormStatus('error');
          
          // Reset status after 5 seconds
          setTimeout(() => {
            setFormStatus('idle');
          }, 5000);
        }
      );
  };

  const contactInfo = [
    {
      icon: FiMail,
      label: "Email",
      value: "m.ishaq031530@gmail.com",
      href: "mailto:m.ishaq031530@gmail.com",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: FiPhone,
      label: "Phone",
      value: "+92 315 3057848",
      href: "tel:+923153057848",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: FiMapPin,
      label: "Location",
      value: "Qasimabad, Hyderabad",
      href: "https://maps.google.com/",
      color: "from-red-500 to-pink-500"
    }
  ];

  const socialLinks = [
    {
      icon: FiGithub,
      label: "GitHub",
      href: "https://github.com/Ishaque-Memon",
      color: "hover:text-gray-600"
    },
    {
      icon: FiLinkedin,
      label: "LinkedIn", 
      href: "https://www.linkedin.com/in/muhammad-ishaque-574492249/",
      color: "hover:text-blue-600"
    },
    // {
    //   icon: FiTwitter,
    //   label: "Twitter",
    //   href: "https://twitter.com/ishaque",
    //   color: "hover:text-sky-500"
    // },
    // {
    //   icon: FiInstagram,
    //   label: "Instagram",
    //   href: "https://instagram.com/ishaque",
    //   color: "hover:text-pink-600"
    // }
  ];

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
    <SectionLoader 
      loadingTime={1500}
      loaderVariant="orbit"
      loadingText="Loading Contact..."
      sectionName="Contact"
    >
      <section
        id="contact"
        ref={sectionRef}
        className={`py-20 lg:py-32 ${
          isDarkMode ? 'bg-neutral-900' : 'bg-white'
        } transition-colors duration-300 relative overflow-hidden`}
      >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-primary-500/5 to-accent-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-accent-500/5 to-primary-500/5 rounded-full blur-3xl"></div>
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
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
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
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${info.color}/20`}>
                          <IconComponent className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-neutral-700'}`} />
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
                  );
                })}
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants}>
              <h4 className={`text-lg font-semibold mb-4 ${
                isDarkMode ? 'text-white' : 'text-neutral-900'
              }`}>
                Follow Me
              </h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 rounded-xl border transition-all duration-300 ${
                        isDarkMode 
                          ? 'bg-neutral-800 border-neutral-700 text-neutral-400 hover:text-white hover:border-neutral-600' 
                          : 'bg-white border-neutral-200 text-neutral-600 hover:text-neutral-900 hover:border-neutral-300'
                      } ${social.color}`}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <IconComponent className="w-5 h-5" />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>

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
            <div className={`p-8 rounded-3xl border ${
              isDarkMode 
                ? 'bg-neutral-800 border-neutral-700' 
                : 'bg-neutral-50 border-neutral-200'
            }`}>
              <h3 className={`text-2xl font-bold mb-8 ${
                isDarkMode ? 'text-white' : 'text-neutral-900'
              }`}>
                Send Me a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div className="form-element">
                  <label className={`block text-sm font-semibold mb-2 ${
                    isDarkMode ? 'text-neutral-300' : 'text-neutral-700'
                  }`}>
                    Your Name
                  </label>
                  <div className="relative">
                    <FiUser className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 z-10 ${
                      isDarkMode ? 'text-neutral-500' : 'text-neutral-400'
                    }`} />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className={`w-full pl-12 pr-4 py-4 rounded-xl border transition-all duration-300 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 ${
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
                  <label className={`block text-sm font-semibold mb-2 ${
                    isDarkMode ? 'text-neutral-300' : 'text-neutral-700'
                  }`}>
                    Email Address
                  </label>
                  <div className="relative">
                    <FiMail className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 z-10 ${
                      isDarkMode ? 'text-neutral-500' : 'text-neutral-400'
                    }`} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={`w-full pl-12 pr-4 py-4 rounded-xl border transition-all duration-300 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 ${
                        isDarkMode 
                          ? 'bg-neutral-700 border-neutral-600 text-white placeholder-neutral-400' 
                          : 'bg-white border-neutral-300 text-neutral-900 placeholder-neutral-500'
                      }`}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                {/* Phone Field */}
                <div className="form-element">
                  <label className={`block text-sm font-semibold mb-2 ${
                    isDarkMode ? 'text-neutral-300' : 'text-neutral-700'
                  }`}>
                    Phone Number
                  </label>
                  <div className="relative">
                    <FiPhone className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 z-10 ${
                      isDarkMode ? 'text-neutral-500' : 'text-neutral-400'
                    }`} />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className={`w-full pl-12 pr-4 py-4 rounded-xl border transition-all duration-300 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 ${
                        isDarkMode 
                          ? 'bg-neutral-700 border-neutral-600 text-white placeholder-neutral-400' 
                          : 'bg-white border-neutral-300 text-neutral-900 placeholder-neutral-500'
                      }`}
                      placeholder="+92 123 4567890"
                      pattern="[0-9]{10}"
                    />
                  </div>
                </div>

                {/* Message Field */}
                <div className="form-element">
                  <label className={`block text-sm font-semibold mb-2 ${
                    isDarkMode ? 'text-neutral-300' : 'text-neutral-700'
                  }`}>
                    Message
                  </label>
                  <div className="relative">
                    <FiMessageCircle className={`absolute left-4 top-4 w-5 h-5 z-10 ${
                      isDarkMode ? 'text-neutral-500' : 'text-neutral-400'
                    }`} />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className={`w-full pl-12 pr-4 py-4 rounded-xl border transition-all duration-300 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 resize-none ${
                        isDarkMode 
                          ? 'bg-neutral-700 border-neutral-600 text-white placeholder-neutral-400' 
                          : 'bg-white border-neutral-300 text-neutral-900 placeholder-neutral-500'
                      }`}
                      placeholder="Tell me about your project or just say hello!"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={formStatus === 'sending'}
                  className={`w-full py-4 px-8 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                    formStatus === 'sending'
                      ? 'bg-neutral-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 shadow-lg hover:shadow-xl'
                  } text-white`}
                  whileHover={formStatus !== 'sending' ? { scale: 1.02 } : {}}
                  whileTap={formStatus !== 'sending' ? { scale: 0.98 } : {}}
                >
                  <AnimatePresence mode="wait">
                    {formStatus === 'sending' ? (
                      <motion.div
                        key="sending"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center space-x-2"
                      >
                        <FiClock className="w-5 h-5 animate-spin" />
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
                        <FiCheckCircle className="w-5 h-5" />
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
                        <FiX className="w-5 h-5" />
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
                        <FiSend className="w-5 h-5" />
                        <span>Send Message</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>

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
            </div>
          </motion.div>
        </div>
      </div>
    </section>
    </SectionLoader>
  );
};

export default ModernContact;
