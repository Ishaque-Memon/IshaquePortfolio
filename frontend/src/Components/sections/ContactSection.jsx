import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { contactInfo, personalInfo } from "@/data/portfolioData";
import portfolioApi from "@/api/portfolioApi";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiSend,
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiInstagram
} from "react-icons/fi";
import { toast } from "@/components/ui/sonner";

const ContactSection = () => {
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // API call to backend
      await portfolioApi.submitContactForm(formData);

      toast.success("Message sent successfully! I'll get back to you soon.");
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error(error.message || "Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialIcons = {
    github: FiGithub,
    linkedin: FiLinkedin,
    twitter: FiTwitter,
    instagram: FiInstagram
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section
      id="contact"
      className={`min-h-screen py-20 ${
        isDarkMode ? 'bg-neutral-950' : 'bg-neutral-50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Get In Touch</span>
          </h2>
          <p className={`text-lg ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
            Have a question or want to work together?
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Contact Info Cards */}
          <motion.div variants={itemVariants} className="lg:col-span-1 space-y-6">
            {/* Contact Details */}
            <Card className={`${
              isDarkMode 
                ? 'bg-neutral-900 border-neutral-800' 
                : 'bg-white border-neutral-200'
            }`}>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Feel free to reach out through any of these channels</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactInfo.email && (
                  <a 
                    href={`mailto:${contactInfo.email}`}
                    className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${
                      isDarkMode 
                        ? 'hover:bg-neutral-800' 
                        : 'hover:bg-neutral-50'
                    }`}
                  >
                    <div className="p-2 rounded-full bg-primary-500/10">
                      <FiMail className="w-5 h-5 text-primary-500" />
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${
                        isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
                      }`}>
                        Email
                      </p>
                      <p className={`${
                        isDarkMode ? 'text-white' : 'text-neutral-900'
                      } break-all`}>
                        {contactInfo.email}
                      </p>
                    </div>
                  </a>
                )}

                {contactInfo.phone && (
                  <a 
                    href={`tel:${contactInfo.phone}`}
                    className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${
                      isDarkMode 
                        ? 'hover:bg-neutral-800' 
                        : 'hover:bg-neutral-50'
                    }`}
                  >
                    <div className="p-2 rounded-full bg-primary-500/10">
                      <FiPhone className="w-5 h-5 text-primary-500" />
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${
                        isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
                      }`}>
                        Phone
                      </p>
                      <p className={isDarkMode ? 'text-white' : 'text-neutral-900'}>
                        {contactInfo.phone}
                      </p>
                    </div>
                  </a>
                )}

                {contactInfo.address && (
                  <div className={`flex items-start gap-3 p-3 rounded-lg`}>
                    <div className="p-2 rounded-full bg-primary-500/10">
                      <FiMapPin className="w-5 h-5 text-primary-500" />
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${
                        isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
                      }`}>
                        Location
                      </p>
                      <p className={isDarkMode ? 'text-white' : 'text-neutral-900'}>
                        {contactInfo.address}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className={`${
              isDarkMode 
                ? 'bg-neutral-900 border-neutral-800' 
                : 'bg-white border-neutral-200'
            }`}>
              <CardHeader>
                <CardTitle>Connect with Me</CardTitle>
                <CardDescription>Follow me on social media</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {personalInfo.social && Object.entries(personalInfo.social).map(([platform, url]) => {
                    const Icon = socialIcons[platform] || FiMail;
                    return (
                      <Button
                        key={platform}
                        asChild
                        variant="outline"
                        className="h-auto py-3"
                      >
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex flex-col items-center gap-2"
                        >
                          <Icon className="w-5 h-5" />
                          <span className="text-xs capitalize">{platform}</span>
                        </a>
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Availability Badge */}
            <div className="text-center">
              <Badge variant="outline" className="text-sm px-4 py-2">
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Available for freelance work
              </Badge>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Card className={`${
              isDarkMode 
                ? 'bg-neutral-900 border-neutral-800' 
                : 'bg-white border-neutral-200'
            }`}>
              <CardHeader>
                <CardTitle className="text-2xl">Send me a message</CardTitle>
                <CardDescription>
                  Fill out the form below and I'll get back to you as soon as possible
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className={isDarkMode 
                          ? 'bg-neutral-800 border-neutral-700' 
                          : 'bg-white border-neutral-300'
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={isDarkMode 
                          ? 'bg-neutral-800 border-neutral-700' 
                          : 'bg-white border-neutral-300'
                        }
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder="What's this about?"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className={isDarkMode 
                        ? 'bg-neutral-800 border-neutral-700' 
                        : 'bg-white border-neutral-300'
                      }
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell me about your project or inquiry..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className={isDarkMode 
                        ? 'bg-neutral-800 border-neutral-700 resize-none' 
                        : 'bg-white border-neutral-300 resize-none'
                      }
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-auto px-8"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin mr-2">⏳</span>
                        Sending...
                      </>
                    ) : (
                      <>
                        <FiSend className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>

                  <p className={`text-xs ${
                    isDarkMode ? 'text-neutral-500' : 'text-neutral-500'
                  }`}>
                    * Required fields
                  </p>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
