import React, { useState, useEffect } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { usePersonalInfo } from "../../hooks/usePortfolio";
import { motion } from "framer-motion";
import {
  FiUser, FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin,
  FiTwitter, FiFacebook, FiInstagram, FiGlobe, FiSave, FiAlertCircle
} from "react-icons/fi";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

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
          certificatesEarned: personalInfo.statistics?.certificatesEarned || 0
        }
      });
    }
  }, [personalInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage("");
    
    try {
      await updatePersonalInfo(formData);
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

  // Show form even if no data exists (for first-time setup)
  const isFirstTimeSetup = !personalInfo && !loading;

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

      {/* Error Message - Only show if it's NOT a 404 */}
      {error && !error.includes('not found') && (
        <Card className="border-red-500/20 bg-red-500/5">
          <CardContent className="p-4">
            <p className="text-red-500 text-sm">{error}</p>
          </CardContent>
        </Card>
      )}

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
                    placeholder="https://github.com/username"
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="linkedin">LinkedIn</Label>
                <div className="relative">
                  <FiLinkedin className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                  <Input
                    id="linkedin"
                    value={formData.socialLinks.linkedin}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      socialLinks: { ...formData.socialLinks, linkedin: e.target.value }
                    })}
                    placeholder="https://linkedin.com/in/username"
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="twitter">Twitter</Label>
                <div className="relative">
                  <FiTwitter className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                  <Input
                    id="twitter"
                    value={formData.socialLinks.twitter}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      socialLinks: { ...formData.socialLinks, twitter: e.target.value }
                    })}
                    placeholder="https://twitter.com/username"
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="facebook">Facebook</Label>
                <div className="relative">
                  <FiFacebook className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                  <Input
                    id="facebook"
                    value={formData.socialLinks.facebook}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      socialLinks: { ...formData.socialLinks, facebook: e.target.value }
                    })}
                    placeholder="https://facebook.com/username"
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="instagram">Instagram</Label>
                <div className="relative">
                  <FiInstagram className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                  <Input
                    id="instagram"
                    value={formData.socialLinks.instagram}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      socialLinks: { ...formData.socialLinks, instagram: e.target.value }
                    })}
                    placeholder="https://instagram.com/username"
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="website">Website</Label>
                <div className="relative">
                  <FiGlobe className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                  <Input
                    id="website"
                    value={formData.socialLinks.website}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      socialLinks: { ...formData.socialLinks, website: e.target.value }
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
    </div>
  );
};

export default PersonalInfo;
