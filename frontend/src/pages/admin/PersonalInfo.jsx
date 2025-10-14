import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../contexts/ThemeContext";
import { usePersonalInfo } from "../../hooks/usePortfolio";
import {
  FiUser, FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin,
  FiTwitter, FiFacebook, FiInstagram, FiGlobe, FiSave, FiEye, FiEdit, FiFileText, FiAlertCircle
} from "react-icons/fi";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const PersonalInfo = () => {
  const { isDarkMode } = useTheme();
  const { personalInfo, loading, error, updatePersonalInfo } = usePersonalInfo();

  const [viewMode, setViewMode] = useState("preview"); // "preview" | "edit"

  const initialForm = {
    name: "",
    title: "",
    bio: "",
    email: "",
    phone: "",
    location: { city: "", country: "" },
    socialLinks: { github: "", linkedin: "", twitter: "", facebook: "", instagram: "", website: "" },
    statistics: {
      yearsOfExperience: 0,
      projectsCompleted: 0,
      happyClients: 0,
      certificatesEarned: 0,
      linkedinFollowers: 0,
      githubFollowers: 0,
      twitterFollowers: 0,
      facebookFollowers: 0,
      instagramFollowers: 0
    },
    // file inputs (File objects; not persisted across reload)
    profileImage: null,
    resumeFile: null
  };

  const [formData, setFormData] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (personalInfo) {
      setFormData((prev) => ({
        ...prev,
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
        },
        // Do not set profileImage/resumeFile to URL — keep them as File or null
        profileImage: null,
        resumeFile: null
      }));
    }
  }, [personalInfo]);

  const handleFileChange = (e, key) => {
    const file = e.target.files && e.target.files[0];
    setFormData((prev) => ({ ...prev, [key]: file || null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage("");

    try {
      const payload = new FormData();

      // Primitive fields
      payload.append("name", formData.name || "");
      payload.append("title", formData.title || "");
      payload.append("bio", formData.bio || "");
      payload.append("email", formData.email || "");
      payload.append("phone", formData.phone || "");

      // Complex objects as JSON strings
      payload.append("location", JSON.stringify(formData.location || {}));
      payload.append("socialLinks", JSON.stringify(formData.socialLinks || {}));
      payload.append("statistics", JSON.stringify(formData.statistics || {}));

      // Files (only append if user selected new files)
      if (formData.profileImage instanceof File) {
        payload.append("profileImage", formData.profileImage);
      }
      if (formData.resumeFile instanceof File) {
        payload.append("resumeFile", formData.resumeFile);
      }

      // call API (your hook handles refresh)
      await updatePersonalInfo(payload);

      setSuccessMessage("Personal information saved successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
      // Optionally switch back to preview
      setViewMode("preview");
    } catch (err) {
      console.error("Error updating personal info:", err);
      alert(err?.response?.data?.message || "Failed to save personal information");
    } finally {
      setIsSubmitting(false);
    }
  };

  // small helper to safely read nested values in preview
  const safe = (getter, fallback = "") => {
    try {
      const v = getter();
      return v === undefined || v === null ? fallback : v;
    } catch {
      return fallback;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className={isDarkMode ? "text-neutral-400" : "text-neutral-600"}>Loading personal information...</p>
        </div>
      </div>
    );
  }

  const isFirstTimeSetup = !personalInfo && !loading;

  // -------------------------
  // PREVIEW MODE
  // -------------------------
  if (viewMode === "preview" && personalInfo) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-neutral-900"}`}>Personal Information</h2>
            <p className="text-neutral-500 mt-1">Preview your personal profile details</p>
          </div>

          <div className="flex items-center gap-2">
            <Button onClick={() => setViewMode("edit")} className="gap-2">
              <FiEdit /> Edit Info
            </Button>
          </div>
        </div>

        {/* Profile Card */}
        <Card className={isDarkMode ? "bg-neutral-900 border-neutral-800" : "bg-white border-neutral-200"}>
          <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
            {personalInfo.profileImage?.url ? (
              <img
                src={personalInfo.profileImage.url}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-2 border-primary-500"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-neutral-700 flex items-center justify-center text-neutral-300 text-2xl">
                <FiUser />
              </div>
            )}

            <div>
              <h3 className="text-xl font-bold">{safe(() => personalInfo.name)}</h3>
              <p className="text-neutral-400">{safe(() => personalInfo.title)}</p>
              <p className="mt-2 text-neutral-500 max-w-lg">{safe(() => personalInfo.bio)}</p>

              {personalInfo.resumeFile?.url && (
                <a
                  href={personalInfo.resumeFile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-3 text-primary-500 hover:underline"
                >
                  <FiFileText /> View Resume
                </a>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card className={isDarkMode ? "bg-neutral-900 border-neutral-800" : "bg-white border-neutral-200"}>
          <CardHeader>
            <CardTitle>Contact</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p><FiMail className="inline mr-2" /> {safe(() => personalInfo.email, "-")}</p>
            <p><FiPhone className="inline mr-2" /> {safe(() => personalInfo.phone, "-")}</p>
            <p><FiMapPin className="inline mr-2" /> {`${safe(() => personalInfo.location?.city, "-")}, ${safe(() => personalInfo.location?.country, "-")}`}</p>
          </CardContent>
        </Card>

        {/* Social Links */}
        <Card className={isDarkMode ? "bg-neutral-900 border-neutral-800" : "bg-white border-neutral-200"}>
          <CardHeader><CardTitle>Social Profiles</CardTitle></CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-2">
            {Object.entries(personalInfo.socialLinks || {}).map(([key, value]) =>
              value ? (
                <a key={key} href={value} target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:underline flex items-center gap-2">
                  {key === "github" && <FiGithub />}
                  {key === "linkedin" && <FiLinkedin />}
                  {key === "twitter" && <FiTwitter />}
                  {key === "facebook" && <FiFacebook />}
                  {key === "instagram" && <FiInstagram />}
                  {key === "website" && <FiGlobe />}
                  {value}
                </a>
              ) : null
            )}
          </CardContent>
        </Card>

        {/* Stats */}
        <Card className={isDarkMode ? "bg-neutral-900 border-neutral-800" : "bg-white border-neutral-200"}>
          <CardHeader><CardTitle>Portfolio Statistics</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {Object.entries(personalInfo.statistics || {}).map(([key, value]) => (
              <div key={key}>
                <p className="text-2xl font-bold">{value}</p>
                <p className="text-neutral-500 text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  // -------------------------
  // EDIT MODE (form)
  // -------------------------
  return (
    <motion.div key="edit-mode" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-neutral-900"}`}>Edit Personal Information</h2>
          <p className="text-neutral-500 mt-1">{isFirstTimeSetup ? "Set up your personal details for the first time" : "Update your personal details and social links"}</p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setViewMode("preview")} className="gap-2">
            <FiEye /> Preview
          </Button>
        </div>
      </div>

      {/* Success & Error */}
      {successMessage && (
        <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center gap-3">
          <FiAlertCircle className="text-green-500" size={20} />
          <p className="text-green-500 font-medium">{successMessage}</p>
        </div>
      )}
      {error && !error.includes("not found") && (
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
          <p className="text-red-500 text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card className={isDarkMode ? "bg-neutral-900 border-neutral-800" : "bg-white border-neutral-200"}>
          <CardHeader>
            <CardTitle className={isDarkMode ? "text-white" : "text-neutral-900"}>Basic Information</CardTitle>
            <CardDescription>Your name, title, and bio</CardDescription>
          </CardHeader>
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
              <Textarea id="bio" value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} placeholder="Tell us about yourself..." rows={5} required />
            </div>
          </CardContent>
        </Card>

        {/* Uploads */}
        <Card className={isDarkMode ? "bg-neutral-900 border-neutral-800" : "bg-white border-neutral-200"}>
          <CardHeader>
            <CardTitle>Profile Image & Resume</CardTitle>
            <CardDescription>Upload your profile picture and resume (PDF)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="profileImage">Profile Image</Label>
              <Input id="profileImage" type="file" accept="image/*" onChange={(e) => handleFileChange(e, "profileImage")} />
              {/* preview if user selected a file */}
              {formData.profileImage && <p className="text-sm mt-1">{formData.profileImage.name}</p>}
              {/* show existing URL if present */}
              {personalInfo?.profileImage?.url && !formData.profileImage && <p className="text-sm mt-1 text-neutral-500">Current: {personalInfo.profileImage.url}</p>}
            </div>

            <div>
              <Label htmlFor="resumeFile">Resume (PDF)</Label>
              <Input id="resumeFile" type="file" accept="application/pdf" onChange={(e) => handleFileChange(e, "resumeFile")} />
              {formData.resumeFile && <p className="text-sm mt-1">{formData.resumeFile.name}</p>}
              {personalInfo?.resumeFile?.url && !formData.resumeFile && <p className="text-sm mt-1 text-neutral-500">Current: <a href={personalInfo.resumeFile.url} target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:underline">View</a></p>}
            </div>
          </CardContent>
        </Card>

        {/* Social Stats (followers) */}
        <Card className={isDarkMode ? "bg-neutral-900 border-neutral-800" : "bg-white border-neutral-200"}>
          <CardHeader>
            <CardTitle>Social Media Stats</CardTitle>
            <CardDescription>Connections / followers counts</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { key: "linkedinFollowers", label: "LinkedIn Followers" },
              { key: "githubFollowers", label: "GitHub Followers" },
              { key: "twitterFollowers", label: "Twitter Followers" },
              { key: "facebookFollowers", label: "Facebook Followers" },
              { key: "instagramFollowers", label: "Instagram Followers" }
            ].map(({ key, label }) => (
              <div key={key}>
                <Label>{label}</Label>
                <Input
                  type="number"
                  min="0"
                  value={formData.statistics[key] ?? ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      statistics: { ...formData.statistics, [key]: parseInt(e.target.value || "0", 10) || 0 }
                    })
                  }
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Contact */}
        <Card className={isDarkMode ? "bg-neutral-900 border-neutral-800" : "bg-white border-neutral-200"}>
          <CardHeader>
            <CardTitle className={isDarkMode ? "text-white" : "text-neutral-900"}>Contact Information</CardTitle>
            <CardDescription>How people can reach you</CardDescription>
          </CardHeader>
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
        <Card className={isDarkMode ? "bg-neutral-900 border-neutral-800" : "bg-white border-neutral-200"}>
          <CardHeader>
            <CardTitle className={isDarkMode ? "text-white" : "text-neutral-900"}>Social Media Links</CardTitle>
            <CardDescription>Your social media profiles</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { id: "github", icon: <FiGithub />, placeholder: "https://github.com/username" },
                { id: "linkedin", icon: <FiLinkedin />, placeholder: "https://linkedin.com/in/username" },
                { id: "twitter", icon: <FiTwitter />, placeholder: "https://twitter.com/username" },
                { id: "facebook", icon: <FiFacebook />, placeholder: "https://facebook.com/username" },
                { id: "instagram", icon: <FiInstagram />, placeholder: "https://instagram.com/username" },
                { id: "website", icon: <FiGlobe />, placeholder: "https://yourwebsite.com" }
              ].map(({ id, icon, placeholder }) => (
                <div key={id}>
                  <Label htmlFor={id}>{id.charAt(0).toUpperCase() + id.slice(1)}</Label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">{icon}</div>
                    <Input id={id} value={formData.socialLinks[id]} onChange={(e) => setFormData({ ...formData, socialLinks: { ...formData.socialLinks, [id]: e.target.value } })} placeholder={placeholder} className="pl-10" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex justify-end gap-4">
          <Button type="submit" disabled={isSubmitting} className="gap-2 min-w-[150px]">
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
    </motion.div>
  );
};

export default PersonalInfo;
