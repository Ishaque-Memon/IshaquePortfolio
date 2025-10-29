// src/pages/admin/PersonalInfo.jsx
import React, { useState, useEffect } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { usePersonalInfo } from "../../hooks/usePortfolio";
import { motion } from "framer-motion";
import {
  FiUser, FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin, FiTwitter,
  FiFacebook, FiInstagram, FiGlobe, FiSave, FiAlertCircle, FiEye, FiEdit,
  FiBriefcase, FiAward, FiUsers, FiTrendingUp
} from "react-icons/fi";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Loader from "@/Components/common/Loader";

// Radix Select wrapper you provided
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
} from "@/components/ui/select";

const ICON_OPTIONS = [
  { value: "FiCode", label: "Code" },
  { value: "FiAward", label: "Award" },
  { value: "FiCpu", label: "CPU" },
  { value: "FiCheckCircle", label: "Check" },
  { value: "FiLayout", label: "Layout" },
  { value: "FiDatabase", label: "Database" },
  { value: "FiServer", label: "Server" },
  { value: "FiGitBranch", label: "Git" },
  { value: "FiSmartphone", label: "Mobile" },
];

const PersonalInfo = () => {
  const { isDarkMode } = useTheme();
  const { personalInfo, loading, error, updatePersonalInfo } = usePersonalInfo();

  const [formData, setFormData] = useState({
    name: "",
    title: "",
    bio: "",
    email: "",
    phone: "",
    location: { city: "", country: "" },
    socialLinks: { github: "", linkedin: "", twitter: "", facebook: "", instagram: "", website: "" },
    statistics: { yearsOfExperience: 0, projectsCompleted: 0, happyClients: 0, certificatesEarned: 0, linkedinFollowers: 0, githubFollowers: 0, twitterFollowers: 0, facebookFollowers: 0, instagramFollowers: 0 },
    expertiseAreas: [], // { icon, title, description }
    aboutImage: null,   // file input for AboutSection image
    profileImage: null,
    resumeFile: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (personalInfo) {
      const data = personalInfo?.data || personalInfo;
      setFormData(prev => ({
        ...prev,
        name: data.name || "",
        title: data.title || "",
        bio: data.bio || "",
        email: data.email || "",
        phone: data.phone || "",
        location: {
          city: data.location?.city || (typeof data.location === "string" ? data.location : ""),
          country: data.location?.country || ""
        },
        socialLinks: {
          github: data.socialLinks?.github || "",
          linkedin: data.socialLinks?.linkedin || "",
          twitter: data.socialLinks?.twitter || "",
          facebook: data.socialLinks?.facebook || "",
          instagram: data.socialLinks?.instagram || "",
          website: data.socialLinks?.website || ""
        },
        statistics: {
          yearsOfExperience: data.statistics?.yearsOfExperience || 0,
          projectsCompleted: data.statistics?.projectsCompleted || 0,
          happyClients: data.statistics?.happyClients || 0,
          certificatesEarned: data.statistics?.certificatesEarned || 0,
          linkedinFollowers: data.statistics?.linkedinFollowers || 0,
          githubFollowers: data.statistics?.githubFollowers || 0,
          twitterFollowers: data.statistics?.twitterFollowers || 0,
          facebookFollowers: data.statistics?.facebookFollowers || 0,
          instagramFollowers: data.statistics?.instagramFollowers || 0,
        },
        expertiseAreas: Array.isArray(data.expertiseAreas) ? data.expertiseAreas.map(e => ({
          icon: e.icon || "FiCode",
          title: e.title || "",
          description: e.description || ""
        })) : [],
        aboutImage: null,
        profileImage: null,
        resumeFile: null,
      }));
    }
  }, [personalInfo]);

  // expertise helpers
  const addExpertise = () => {
    setFormData(prev => ({ ...prev, expertiseAreas: [...(prev.expertiseAreas || []), { icon: "FiCode", title: "", description: "" }] }));
  };
  const removeExpertise = (idx) => {
    setFormData(prev => ({ ...prev, expertiseAreas: prev.expertiseAreas.filter((_, i) => i !== idx) }));
  };
  const updateExpertise = (idx, field, value) => {
    setFormData(prev => ({ ...prev, expertiseAreas: prev.expertiseAreas.map((e, i) => i === idx ? { ...e, [field]: value } : e) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage("");

    try {
      const payload = new FormData();
      payload.append("name", formData.name ?? "");
      payload.append("title", formData.title ?? "");
      payload.append("bio", formData.bio ?? "");
      payload.append("email", formData.email ?? "");
      payload.append("phone", formData.phone ?? "");
      payload.append("location", JSON.stringify(formData.location || {}));
      payload.append("socialLinks", JSON.stringify(formData.socialLinks || {}));
      payload.append("statistics", JSON.stringify(formData.statistics || {}));
      payload.append("expertiseAreas", JSON.stringify(formData.expertiseAreas || []));

      if (formData.profileImage instanceof File) payload.append("profileImage", formData.profileImage);
      if (formData.resumeFile instanceof File) payload.append("resumeFile", formData.resumeFile);
      if (formData.aboutImage instanceof File) payload.append("aboutImage", formData.aboutImage);

      await updatePersonalInfo(payload);
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
        <Loader variant="spinner" size="default" text="Loading personal information..." />
      </div>
    );
  }

  const isFirstTimeSetup = !personalInfo && !loading;

  // Preview subcomponent (keeps same preview logic)
  const PreviewSection = () => {
    const savedData = personalInfo ? (personalInfo.data || personalInfo) : null;
    const previewAboutUrl = formData.aboutImage ? URL.createObjectURL(formData.aboutImage) : (savedData?.aboutImage?.url || savedData?.aboutImage || null);
    const previewProfileUrl = formData.profileImage ? URL.createObjectURL(formData.profileImage) : (savedData?.profileImage?.url || savedData?.profileImage || null);

    return (
      <div className="space-y-6">
        {/* Profile preview card */}
        <Card className={isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><FiEye size={20} /> Profile Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <Avatar className="w-32 h-32 ring-4 ring-primary-500/20">
                  {previewProfileUrl ? <AvatarImage src={previewProfileUrl} /> : <AvatarFallback className="text-4xl bg-gradient-to-br from-primary-500 to-accent-500 text-white">{formData.name ? formData.name.split(' ').map(n => n[0]).join('').slice(0,2) : 'NA'}</AvatarFallback>}
                </Avatar>
              </div>

              <div>
                <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>{formData.name || 'Your Name'}</h3>
                <p className="text-primary-500 font-medium mt-1">{formData.title || 'Your Title'}</p>
              </div>

              <p className={`text-sm max-w-2xl mx-auto ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>{formData.bio || 'Your bio will appear here...'}</p>

              <div className="flex flex-wrap justify-center gap-4 text-sm">
                {formData.email && (<div className="flex items-center gap-2"><FiMail className="text-primary-500" size={16} /><span className={isDarkMode ? 'text-neutral-300' : 'text-neutral-700'}>{formData.email}</span></div>)}
                {formData.phone && (<div className="flex items-center gap-2"><FiPhone className="text-primary-500" size={16} /><span className={isDarkMode ? 'text-neutral-300' : 'text-neutral-700'}>{formData.phone}</span></div>)}
                {(formData.location.city || formData.location.country) && (<div className="flex items-center gap-2"><FiMapPin className="text-primary-500" size={16} /><span className={isDarkMode ? 'text-neutral-300' : 'text-neutral-700'}>{[formData.location.city, formData.location.country].filter(Boolean).join(', ')}</span></div>)}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* statistics preview */}
        <Card className={isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}>
          <CardHeader><CardTitle>Statistics Preview</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className={`p-4 rounded-lg text-center ${isDarkMode ? 'bg-neutral-800' : 'bg-neutral-50'}`}>
                <FiTrendingUp className="mx-auto mb-2 text-primary-500" size={24} />
                <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>{formData.statistics.yearsOfExperience || 0}+</div>
                <div className="text-sm text-neutral-500 mt-1">Years Experience</div>
              </div>
              <div className={`p-4 rounded-lg text-center ${isDarkMode ? 'bg-neutral-800' : 'bg-neutral-50'}`}>
                <FiBriefcase className="mx-auto mb-2 text-primary-500" size={24} />
                <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>{formData.statistics.projectsCompleted || 0}+</div>
                <div className="text-sm text-neutral-500 mt-1">Projects Completed</div>
              </div>
              <div className={`p-4 rounded-lg text-center ${isDarkMode ? 'bg-neutral-800' : 'bg-neutral-50'}`}>
                <FiUsers className="mx-auto mb-2 text-primary-500" size={24} />
                <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>{formData.statistics.happyClients || 0}+</div>
                <div className="text-sm text-neutral-500 mt-1">Happy Clients</div>
              </div>
              <div className={`p-4 rounded-lg text-center ${isDarkMode ? 'bg-neutral-800' : 'bg-neutral-50'}`}>
                <FiAward className="mx-auto mb-2 text-primary-500" size={24} />
                <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>{formData.statistics.certificatesEarned || 0}+</div>
                <div className="text-sm text-neutral-500 mt-1">Certificates</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>Personal Information</h2>
          <p className="text-neutral-500 mt-1">{isFirstTimeSetup ? "Set up your personal details for the first time" : "Update your personal details and social links"}</p>
        </div>
      </div>

      {isFirstTimeSetup && (
        <Card className="border-blue-500/20 bg-blue-500/5">
          <CardContent className="p-4">
            <p className="text-blue-500 text-sm">ℹ️ No personal information found. Fill in the form below to create your profile.</p>
          </CardContent>
        </Card>
      )}

      {successMessage && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center gap-3">
          <FiAlertCircle className="text-green-500" size={20} />
          <p className="text-green-500 font-medium">{successMessage}</p>
        </motion.div>
      )}

      {error && !error.includes('not found') && (
        <Card className="border-red-500/20 bg-red-500/5">
          <CardContent className="p-4"><p className="text-red-500 text-sm">{error}</p></CardContent>
        </Card>
      )}

      <Tabs defaultValue="edit" className="w-full">
        <TabsList className="flex w-full max-w-md gap-4 mx-auto mb-2 bg-transparent shadow-none p-0">
          <TabsTrigger value="edit" asChild><Button variant="default" className="w-full gap-2"><FiEdit size={16} /> Edit Information</Button></TabsTrigger>
          <TabsTrigger value="preview" asChild><Button variant="default" className="w-full gap-2"><FiEye size={16} /> Preview</Button></TabsTrigger>
        </TabsList>

        <TabsContent value="edit" className="mt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <Card className={isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}>
              <CardHeader><CardTitle className={isDarkMode ? 'text-white' : 'text-neutral-900'}>Basic Information</CardTitle><CardDescription>Your name, title, and bio</CardDescription></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <div className="relative">
                      <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                      <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="John Doe" className="pl-10" required />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="title">Professional Title *</Label>
                    <Input id="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Full Stack Developer" required />
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio">Bio / About *</Label>
                  <Textarea id="bio" value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} placeholder="Full-stack developer specializing in modern web technologies." rows={5} required />
                  <p className="text-xs text-neutral-500 mt-1">This will appear on your footer and about sections</p>
                </div>
              </CardContent>
            </Card>

            {/* Uploads */}
            <Card className={isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}>
              <CardHeader><CardTitle>Profile Image & Resume</CardTitle><CardDescription>Upload your profile picture and resume</CardDescription></CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="profileImage">Profile Image</Label>
                  <Input id="profileImage" type="file" accept="image/*" onChange={(e) => setFormData({ ...formData, profileImage: e.target.files[0] })} />
                </div>
                <div>
                  <Label htmlFor="resumeFile">Resume (PDF)</Label>
                  <Input id="resumeFile" type="file" accept="application/pdf" onChange={(e) => setFormData({ ...formData, resumeFile: e.target.files[0] })} />
                </div>

                {/* aboutImage */}
                <div>
                  <Label htmlFor="aboutImage">About Section Image (separate)</Label>
                  <Input id="aboutImage" type="file" accept="image/*" onChange={(e) => setFormData({ ...formData, aboutImage: e.target.files[0] })} />
                  <p className="text-xs text-neutral-500 mt-1">This image will be used in AboutSection.jsx (keeps ModernAbout/profile image separate).</p>
                  {personalInfo && (personalInfo.data || personalInfo).aboutImage && (
                    <div className="mt-2">
                      <img src={(personalInfo.data || personalInfo).aboutImage.url || (personalInfo.data || personalInfo).aboutImage} alt="about-preview" className="w-48 h-32 object-cover rounded-md" />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card className={isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}>
              <CardHeader><CardTitle className={isDarkMode ? 'text-white' : 'text-neutral-900'}>Contact Information</CardTitle><CardDescription>How people can reach you</CardDescription></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <div className="relative">
                      <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                      <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="john@example.com" className="pl-10" required />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                      <Input id="phone" type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="+1 234 567 8900" className="pl-10" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="city">City</Label>
                    <div className="relative">
                      <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                      <Input id="city" value={formData.location.city} onChange={(e) => setFormData({ ...formData, location: { ...formData.location, city: e.target.value } })} placeholder="New York" className="pl-10" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Input id="country" value={formData.location.country} onChange={(e) => setFormData({ ...formData, location: { ...formData.location, country: e.target.value } })} placeholder="United States" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className={isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}>
              <CardHeader><CardTitle className={isDarkMode ? 'text-white' : 'text-neutral-900'}>Social Media Links</CardTitle><CardDescription>Your social media profiles (enter full URLs)</CardDescription></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* GitHub */}
                  <div>
                    <Label htmlFor="github">GitHub</Label>
                    <div className="relative">
                      <FiGithub className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                      <Input id="github" value={formData.socialLinks.github} onChange={(e) => setFormData({ ...formData, socialLinks: { ...formData.socialLinks, github: e.target.value } })} placeholder="https://github.com/yourusername" className="pl-10" />
                    </div>
                  </div>

                  {/* LinkedIn */}
                  <div>
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <div className="relative">
                      <FiLinkedin className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                      <Input id="linkedin" value={formData.socialLinks.linkedin} onChange={(e) => setFormData({ ...formData, socialLinks: { ...formData.socialLinks, linkedin: e.target.value } })} placeholder="https://linkedin.com/in/yourusername" className="pl-10" />
                    </div>
                  </div>

                  {/* Twitter */}
                  <div>
                    <Label htmlFor="twitter">Twitter</Label>
                    <div className="relative">
                      <FiTwitter className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                      <Input id="twitter" value={formData.socialLinks.twitter} onChange={(e) => setFormData({ ...formData, socialLinks: { ...formData.socialLinks, twitter: e.target.value } })} placeholder="https://twitter.com/yourusername" className="pl-10" />
                    </div>
                  </div>

                  {/* Facebook */}
                  <div>
                    <Label htmlFor="facebook">Facebook</Label>
                    <div className="relative">
                      <FiFacebook className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                      <Input id="facebook" value={formData.socialLinks.facebook} onChange={(e) => setFormData({ ...formData, socialLinks: { ...formData.socialLinks, facebook: e.target.value } })} placeholder="https://facebook.com/yourusername" className="pl-10" />
                    </div>
                  </div>

                  {/* Instagram */}
                  <div>
                    <Label htmlFor="instagram">Instagram</Label>
                    <div className="relative">
                      <FiInstagram className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                      <Input id="instagram" value={formData.socialLinks.instagram} onChange={(e) => setFormData({ ...formData, socialLinks: { ...formData.socialLinks, instagram: e.target.value } })} placeholder="https://instagram.com/yourusername" className="pl-10" />
                    </div>
                  </div>

                  {/* Website */}
                  <div>
                    <Label htmlFor="website">Personal Website</Label>
                    <div className="relative">
                      <FiGlobe className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                      <Input id="website" value={formData.socialLinks.website} onChange={(e) => setFormData({ ...formData, socialLinks: { ...formData.socialLinks, website: e.target.value } })} placeholder="https://yourwebsite.com" className="pl-10" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Expertise management - uses Select component */}
            <Card className={isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}>
              <CardHeader><CardTitle className={isDarkMode ? 'text-white' : 'text-neutral-900'}>Expertise Areas</CardTitle><CardDescription>Manage the tiles shown in AboutSection (icon, title, description)</CardDescription></CardHeader>
              <CardContent className="space-y-4">
                {(formData.expertiseAreas || []).map((exp, idx) => (
                  <div key={idx} className="grid grid-cols-1 md:grid-cols-6 gap-2 items-end">
                    <div className="md:col-span-1">
                      <Label>Icon</Label>
                      <Select onValueChange={(v) => updateExpertise(idx, "icon", v)} value={exp.icon || "FiCode"}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Icons</SelectLabel>
                            {ICON_OPTIONS.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="md:col-span-2">
                      <Label>Title</Label>
                      <Input value={exp.title} onChange={(e) => updateExpertise(idx, "title", e.target.value)} placeholder="Frontend Development" />
                    </div>

                    <div className="md:col-span-2">
                      <Label>Description</Label>
                      <Input value={exp.description} onChange={(e) => updateExpertise(idx, "description", e.target.value)} placeholder="React, Tailwind, animations..." />
                    </div>

                    <div className="md:col-span-1">
                      <Button type="button" variant="destructive" onClick={() => removeExpertise(idx)} className="w-full">Remove</Button>
                    </div>
                  </div>
                ))}

                <div>
                  <Button type="button" onClick={addExpertise} className="mt-2">+ Add Expertise</Button>
                </div>
              </CardContent>
            </Card>

            {/* Statistics */}
            <Card className={isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}>
              <CardHeader><CardTitle className={isDarkMode ? 'text-white' : 'text-neutral-900'}>Portfolio Statistics</CardTitle><CardDescription>Numbers that showcase your achievements</CardDescription></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor="experience">Years of Experience</Label>
                    <Input id="experience" type="number" min="0" value={formData.statistics.yearsOfExperience} onChange={(e) => setFormData({ ...formData, statistics: { ...formData.statistics, yearsOfExperience: parseInt(e.target.value) || 0 } })} />
                  </div>

                  <div>
                    <Label htmlFor="projects">Major Projects (projectsCompleted)</Label>
                    <Input id="projects" type="number" min="0" value={formData.statistics.projectsCompleted} onChange={(e) => setFormData({ ...formData, statistics: { ...formData.statistics, projectsCompleted: parseInt(e.target.value) || 0 } })} />
                  </div>

                  <div>
                    <Label htmlFor="clients">Happy Clients</Label>
                    <Input id="clients" type="number" min="0" value={formData.statistics.happyClients} onChange={(e) => setFormData({ ...formData, statistics: { ...formData.statistics, happyClients: parseInt(e.target.value) || 0 } })} />
                  </div>

                  <div>
                    <Label htmlFor="certificates">Certificates Earned</Label>
                    <Input id="certificates" type="number" min="0" value={formData.statistics.certificatesEarned} onChange={(e) => setFormData({ ...formData, statistics: { ...formData.statistics, certificatesEarned: parseInt(e.target.value) || 0 } })} />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social stats */}
            <Card className={isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}>
              <CardHeader><CardTitle>Social Media Stats</CardTitle><CardDescription>Track followers/connections (optional)</CardDescription></CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { key: "linkedinFollowers", label: "LinkedIn Followers", icon: FiLinkedin },
                  { key: "githubFollowers", label: "GitHub Followers", icon: FiGithub },
                  { key: "twitterFollowers", label: "Twitter Followers", icon: FiTwitter },
                  { key: "facebookFollowers", label: "Facebook Followers", icon: FiFacebook },
                  { key: "instagramFollowers", label: "Instagram Followers", icon: FiInstagram },
                ].map(({ key, label, icon: Icon }) => (
                  <div key={key}>
                    <Label className="flex items-center gap-2"><Icon size={16} className="text-neutral-500" />{label}</Label>
                    <Input type="number" min="0" value={formData.statistics[key] || ""} onChange={(e) => setFormData({ ...formData, statistics: { ...formData.statistics, [key]: parseInt(e.target.value) || 0 } })} placeholder="0" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Submit */}
            <div className="flex justify-end gap-4">
              <Button type="submit" disabled={isSubmitting} className="gap-2 min-w-[150px]">
                {isSubmitting ? (<><div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>Saving...</>) : (<><FiSave size={18} /> Save Changes</>)}
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
