import React, { useState, useEffect } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { usePersonalInfo } from "../../hooks/usePortfolio";
import { motion } from "framer-motion";
import {
  FiUser, FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin,
  FiTwitter, FiFacebook, FiInstagram, FiGlobe, FiSave, FiAlertCircle,
  FiEye, FiEdit, FiBriefcase, FiAward, FiUsers, FiTrendingUp
} from "react-icons/fi";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const PersonalInfo = () => {
  const { isDarkMode } = useTheme();
  const { personalInfo, loading, error, updatePersonalInfo } = usePersonalInfo();
  
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    bio: "",
    email: "",
    phone: "",
    location: {
      city: "",
      country: ""
    },
    socialLinks: {
      github: "",
      linkedin: "",
      twitter: "",
      facebook: "",
      instagram: "",
      website: ""
    },
    statistics: {
      yearsOfExperience: 0,
      projectsCompleted: 0,
      happyClients: 0,
      certificatesEarned: 0
    }
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (personalInfo) {
      setFormData({
        name: personalInfo.name || "",
        title: personalInfo.title || "",
        bio: personalInfo.bio || "",
        email: personalInfo.email || "",
        phone: personalInfo.phone || "",
        location: {
          city: personalInfo.location?.city || "",
          country: personalInfo.location?.country || ""
        },
        socialLinks: {
          github: personalInfo.socialLinks?.github || "",
          linkedin: personalInfo.socialLinks?.linkedin || "",
          twitter: personalInfo.socialLinks?.twitter || "",
          facebook: personalInfo.socialLinks?.facebook || "",
          instagram: personalInfo.socialLinks?.instagram || "",
          website: personalInfo.socialLinks?.website || ""
        },
        statistics: {
          yearsOfExperience: personalInfo.statistics?.yearsOfExperience || 0,
          projectsCompleted: personalInfo.statistics?.projectsCompleted || 0,
          happyClients: personalInfo.statistics?.happyClients || 0,
          certificatesEarned: personalInfo.statistics?.certificatesEarned || 0,
          linkedinFollowers: personalInfo.statistics?.linkedinFollowers || 0,
          githubFollowers: personalInfo.statistics?.githubFollowers || 0,
          twitterFollowers: personalInfo.statistics?.twitterFollowers || 0,
          facebookFollowers: personalInfo.statistics?.facebookFollowers || 0,
          instagramFollowers: personalInfo.statistics?.instagramFollowers || 0
        }
      });
    }
  }, [personalInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage("");

    try {
      const formPayload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (typeof value === "object" && !(value instanceof File)) {
          formPayload.append(key, JSON.stringify(value));
        } else if (value instanceof File) {
          formPayload.append(key, value);
        } else {
          formPayload.append(key, value);
        }
      });

      await updatePersonalInfo(formPayload);
      setSuccessMessage("Personal information saved successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error("Error updating personal info:", err);
      alert(err.response?.data?.message || "Failed to save personal information");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className={isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}>Loading personal information...</p>
        </div>
      </div>
    );
  }

  const isFirstTimeSetup = !personalInfo && !loading;

  // Preview Component
  const PreviewSection = () => (
    <div className="space-y-6">
      {/* Profile Card Preview */}
      <Card className={isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FiEye size={20} />
            Profile Preview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            {/* Avatar */}
            <div className="flex justify-center">
              <Avatar className="h-32 w-32">
                <AvatarImage src={personalInfo?.profileImage} />
                <AvatarFallback className="text-4xl bg-gradient-to-br from-primary-500 to-accent-500 text-white">
                  {formData.name ? formData.name.split(' ').map(n => n[0]).join('').slice(0, 2) : 'NA'}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Name & Title */}
            <div>
              <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                {formData.name || 'Your Name'}
              </h3>
              <p className="text-primary-500 font-medium mt-1">
                {formData.title || 'Your Title'}
              </p>
            </div>

            {/* Bio */}
            <p className={`text-sm max-w-2xl mx-auto ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
              {formData.bio || 'Your bio will appear here...'}
            </p>

            {/* Contact Info */}
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              {formData.email && (
                <div className="flex items-center gap-2">
                  <FiMail className="text-primary-500" size={16} />
                  <span className={isDarkMode ? 'text-neutral-300' : 'text-neutral-700'}>
                    {formData.email}
                  </span>
                </div>
              )}
              {formData.phone && (
                <div className="flex items-center gap-2">
                  <FiPhone className="text-primary-500" size={16} />
                  <span className={isDarkMode ? 'text-neutral-300' : 'text-neutral-700'}>
                    {formData.phone}
                  </span>
                </div>
              )}
              {(formData.location.city || formData.location.country) && (
                <div className="flex items-center gap-2">
                  <FiMapPin className="text-primary-500" size={16} />
                  <span className={isDarkMode ? 'text-neutral-300' : 'text-neutral-700'}>
                    {[formData.location.city, formData.location.country].filter(Boolean).join(', ')}
                  </span>
                </div>
              )}
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-3 pt-4">
              {formData.socialLinks.github && (
                <a href={formData.socialLinks.github} target="_blank" rel="noopener noreferrer"
                   className={`p-3 rounded-full transition-colors ${isDarkMode ? 'bg-neutral-800 hover:bg-neutral-700' : 'bg-neutral-100 hover:bg-neutral-200'}`}>
                  <FiGithub size={20} />
                </a>
              )}
              {formData.socialLinks.linkedin && (
                <a href={formData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer"
                   className={`p-3 rounded-full transition-colors ${isDarkMode ? 'bg-neutral-800 hover:bg-neutral-700' : 'bg-neutral-100 hover:bg-neutral-200'}`}>
                  <FiLinkedin size={20} />
                </a>
              )}
              {formData.socialLinks.twitter && (
                <a href={formData.socialLinks.twitter} target="_blank" rel="noopener noreferrer"
                   className={`p-3 rounded-full transition-colors ${isDarkMode ? 'bg-neutral-800 hover:bg-neutral-700' : 'bg-neutral-100 hover:bg-neutral-200'}`}>
                  <FiTwitter size={20} />
                </a>
              )}
              {formData.socialLinks.facebook && (
                <a href={formData.socialLinks.facebook} target="_blank" rel="noopener noreferrer"
                   className={`p-3 rounded-full transition-colors ${isDarkMode ? 'bg-neutral-800 hover:bg-neutral-700' : 'bg-neutral-100 hover:bg-neutral-200'}`}>
                  <FiFacebook size={20} />
                </a>
              )}
              {formData.socialLinks.instagram && (
                <a href={formData.socialLinks.instagram} target="_blank" rel="noopener noreferrer"
                   className={`p-3 rounded-full transition-colors ${isDarkMode ? 'bg-neutral-800 hover:bg-neutral-700' : 'bg-neutral-100 hover:bg-neutral-200'}`}>
                  <FiInstagram size={20} />
                </a>
              )}
              {formData.socialLinks.website && (
                <a href={formData.socialLinks.website} target="_blank" rel="noopener noreferrer"
                   className={`p-3 rounded-full transition-colors ${isDarkMode ? 'bg-neutral-800 hover:bg-neutral-700' : 'bg-neutral-100 hover:bg-neutral-200'}`}>
                  <FiGlobe size={20} />
                </a>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics Preview */}
      <Card className={isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}>
        <CardHeader>
          <CardTitle>Statistics Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className={`p-4 rounded-lg text-center ${isDarkMode ? 'bg-neutral-800' : 'bg-neutral-50'}`}>
              <FiTrendingUp className="mx-auto mb-2 text-primary-500" size={24} />
              <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                {formData.statistics.yearsOfExperience || 0}+
              </div>
              <div className="text-sm text-neutral-500 mt-1">Years Experience</div>
            </div>
            <div className={`p-4 rounded-lg text-center ${isDarkMode ? 'bg-neutral-800' : 'bg-neutral-50'}`}>
              <FiBriefcase className="mx-auto mb-2 text-primary-500" size={24} />
              <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                {formData.statistics.projectsCompleted || 0}+
              </div>
              <div className="text-sm text-neutral-500 mt-1">Projects Completed</div>
            </div>
            <div className={`p-4 rounded-lg text-center ${isDarkMode ? 'bg-neutral-800' : 'bg-neutral-50'}`}>
              <FiUsers className="mx-auto mb-2 text-primary-500" size={24} />
              <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                {formData.statistics.happyClients || 0}+
              </div>
              <div className="text-sm text-neutral-500 mt-1">Happy Clients</div>
            </div>
            <div className={`p-4 rounded-lg text-center ${isDarkMode ? 'bg-neutral-800' : 'bg-neutral-50'}`}>
              <FiAward className="mx-auto mb-2 text-primary-500" size={24} />
              <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                {formData.statistics.certificatesEarned || 0}+
              </div>
              <div className="text-sm text-neutral-500 mt-1">Certificates</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Social Media Stats Preview */}
      {(formData.statistics.linkedinFollowers || formData.statistics.githubFollowers || 
        formData.statistics.twitterFollowers || formData.statistics.facebookFollowers || 
        formData.statistics.instagramFollowers) && (
        <Card className={isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}>
          <CardHeader>
            <CardTitle>Social Media Reach</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {formData.statistics.linkedinFollowers > 0 && (
                <div className="text-center">
                  <FiLinkedin className="mx-auto mb-2 text-blue-500" size={24} />
                  <div className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                    {formData.statistics.linkedinFollowers}
                  </div>
                  <div className="text-xs text-neutral-500">LinkedIn</div>
                </div>
              )}
              {formData.statistics.githubFollowers > 0 && (
                <div className="text-center">
                  <FiGithub className="mx-auto mb-2 text-neutral-500" size={24} />
                  <div className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                    {formData.statistics.githubFollowers}
                  </div>
                  <div className="text-xs text-neutral-500">GitHub</div>
                </div>
              )}
              {formData.statistics.twitterFollowers > 0 && (
                <div className="text-center">
                  <FiTwitter className="mx-auto mb-2 text-sky-500" size={24} />
                  <div className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                    {formData.statistics.twitterFollowers}
                  </div>
                  <div className="text-xs text-neutral-500">Twitter</div>
                </div>
              )}
              {formData.statistics.facebookFollowers > 0 && (
                <div className="text-center">
                  <FiFacebook className="mx-auto mb-2 text-blue-600" size={24} />
                  <div className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                    {formData.statistics.facebookFollowers}
                  </div>
                  <div className="text-xs text-neutral-500">Facebook</div>
                </div>
              )}
              {formData.statistics.instagramFollowers > 0 && (
                <div className="text-center">
                  <FiInstagram className="mx-auto mb-2 text-pink-500" size={24} />
                  <div className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                    {formData.statistics.instagramFollowers}
                  </div>
                  <div className="text-xs text-neutral-500">Instagram</div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
            Personal Information
          </h2>
          <p className="text-neutral-500 mt-1">
            {isFirstTimeSetup 
              ? "Set up your personal details for the first time" 
              : "Update your personal details and social links"}
          </p>
        </div>
      </div>

      {/* First Time Setup Notice */}
      {isFirstTimeSetup && (
        <Card className="border-blue-500/20 bg-blue-500/5">
          <CardContent className="p-4">
            <p className="text-blue-500 text-sm">
              ℹ️ No personal information found. Fill in the form below to create your profile.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Success Message */}
      {successMessage && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center gap-3"
        >
          <FiAlertCircle className="text-green-500" size={20} />
          <p className="text-green-500 font-medium">{successMessage}</p>
        </motion.div>
      )}

      {/* Error Message */}
      {error && !error.includes('not found') && (
        <Card className="border-red-500/20 bg-red-500/5">
          <CardContent className="p-4">
            <p className="text-red-500 text-sm">{error}</p>
          </CardContent>
        </Card>
      )}

      {/* Tabs for Edit/Preview */}
      <Tabs defaultValue="edit" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="edit" className="gap-2">
            <FiEdit size={16} />
            Edit Information
          </TabsTrigger>
          <TabsTrigger value="preview" className="gap-2">
            <FiEye size={16} />
            Preview
          </TabsTrigger>
        </TabsList>

        <TabsContent value="edit" className="mt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <Card className={isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}>
              <CardHeader>
                <CardTitle className={isDarkMode ? 'text-white' : 'text-neutral-900'}>
                  Basic Information
                </CardTitle>
                <CardDescription>Your name, title, and bio</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <div className="relative">
                      <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="title">Professional Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Full Stack Developer"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio">Bio / About *</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    placeholder="Tell us about yourself..."
                    rows={5}
                    required
                  />
                </div>
              </CardContent>
            </Card>
            
            {/* Uploads Section */}
            <Card className={isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}>
              <CardHeader>
                <CardTitle>Profile Image & Resume</CardTitle>
                <CardDescription>Upload your profile picture and resume</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="profileImage">Profile Image</Label>
                  <Input
                    id="profileImage"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFormData({ ...formData, profileImage: e.target.files[0] })}
                  />
                </div>

                <div>
                  <Label htmlFor="resumeFile">Resume (PDF)</Label>
                  <Input
                    id="resumeFile"
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => setFormData({ ...formData, resumeFile: e.target.files[0] })}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className={isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}>
              <CardHeader>
                <CardTitle className={isDarkMode ? 'text-white' : 'text-neutral-900'}>
                  Contact Information
                </CardTitle>
                <CardDescription>How people can reach you</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <div className="relative">
                      <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 234 567 8900"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="city">City</Label>
                    <div className="relative">
                      <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                      <Input
                        id="city"
                        value={formData.location.city}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          location: { ...formData.location, city: e.target.value }
                        })}
                        placeholder="New York"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      value={formData.location.country}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        location: { ...formData.location, country: e.target.value }
                      })}
                      placeholder="United States"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className={isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}>
              <CardHeader>
                <CardTitle className={isDarkMode ? 'text-white' : 'text-neutral-900'}>
                  Social Media Links
                </CardTitle>
                <CardDescription>Your social media profiles</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="github">GitHub</Label>
                    <div className="relative">
                      <FiGithub className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                      <Input
                        id="github"
                        value={formData.socialLinks.github}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          socialLinks: { ...formData.socialLinks, github: e.target.value }
                        })}
                        placeholder="https://yourwebsite.com"
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Statistics */}
            <Card className={isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}>
              <CardHeader>
                <CardTitle className={isDarkMode ? 'text-white' : 'text-neutral-900'}>
                  Portfolio Statistics
                </CardTitle>
                <CardDescription>Numbers that showcase your achievements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor="experience">Years of Experience</Label>
                    <Input
                      id="experience"
                      type="number"
                      min="0"
                      value={formData.statistics.yearsOfExperience}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        statistics: { ...formData.statistics, yearsOfExperience: parseInt(e.target.value) || 0 }
                      })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="projects">Projects Completed</Label>
                    <Input
                      id="projects"
                      type="number"
                      min="0"
                      value={formData.statistics.projectsCompleted}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        statistics: { ...formData.statistics, projectsCompleted: parseInt(e.target.value) || 0 }
                      })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="clients">Happy Clients</Label>
                    <Input
                      id="clients"
                      type="number"
                      min="0"
                      value={formData.statistics.happyClients}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        statistics: { ...formData.statistics, happyClients: parseInt(e.target.value) || 0 }
                      })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="certificates">Certificates Earned</Label>
                    <Input
                      id="certificates"
                      type="number"
                      min="0"
                      value={formData.statistics.certificatesEarned}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        statistics: { ...formData.statistics, certificatesEarned: parseInt(e.target.value) || 0 }
                      })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Statistics Section */}
            <Card className={isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}>
              <CardHeader>
                <CardTitle>Social Media Stats</CardTitle>
                <CardDescription>Track your connections or followers</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { key: "linkedinFollowers", label: "LinkedIn Followers" },
                  { key: "githubFollowers", label: "GitHub Followers" },
                  { key: "twitterFollowers", label: "Twitter Followers" },
                  { key: "facebookFollowers", label: "Facebook Followers" },
                  { key: "instagramFollowers", label: "Instagram Followers" },
                ].map(({ key, label }) => (
                  <div key={key}>
                    <Label>{label}</Label>
                    <Input
                      type="number"
                      value={formData.statistics[key] || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          statistics: { ...formData.statistics, [key]: parseInt(e.target.value) || 0 },
                        })
                      }
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-end gap-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="gap-2 min-w-[150px]"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <FiSave size={18} />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </form>
        </TabsContent>

        <TabsContent value="preview" className="mt-6">
          <PreviewSection />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PersonalInfo;