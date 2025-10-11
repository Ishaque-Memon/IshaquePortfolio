import React, { useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { useCertificates } from "../../hooks/usePortfolio";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiPlus, FiEdit2, FiTrash2, FiAward, FiExternalLink,
  FiSave, FiX, FiUpload, FiCalendar, FiLink
} from "react-icons/fi";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Certificates = () => {
  const { isDarkMode } = useTheme();
  const {
    certificates,
    loading,
    error,
    createCertificate: createCertificateAPI,
    updateCertificate: updateCertificateAPI,
    deleteCertificate: deleteCertificateAPI
  } = useCertificates();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    issuer: "",
    issueDate: "",
    expiryDate: "",
    credentialId: "",
    credentialUrl: "",
    skills: [],
    description: ""
  });
  const [skillInput, setSkillInput] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpenAddModal = () => {
    setFormData({
      title: "",
      issuer: "",
      issueDate: "",
      expiryDate: "",
      credentialId: "",
      credentialUrl: "",
      skills: [],
      description: ""
    });
    setSkillInput("");
    setImageFile(null);
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (certificate) => {
    setSelectedCertificate(certificate);
    setFormData({
      title: certificate.title,
      issuer: certificate.issuer,
      issueDate: certificate.issueDate ? new Date(certificate.issueDate).toISOString().split('T')[0] : "",
      expiryDate: certificate.expiryDate ? new Date(certificate.expiryDate).toISOString().split('T')[0] : "",
      credentialId: certificate.credentialId || "",
      credentialUrl: certificate.credentialUrl || "",
      skills: certificate.skills || [],
      description: certificate.description || ""
    });
    setSkillInput("");
    setImageFile(null);
    setIsEditModalOpen(true);
  };

  const handleOpenDeleteDialog = (certificate) => {
    setSelectedCertificate(certificate);
    setIsDeleteDialogOpen(true);
  };

  const handleAddSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, skillInput.trim()]
      });
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(skill => skill !== skillToRemove)
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleSubmitAdd = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      alert("Please select a certificate image");
      return;
    }

    setIsSubmitting(true);
    try {
      const formDataToSend = new FormData();
      
      formDataToSend.append('title', formData.title);
      formDataToSend.append('issuer', formData.issuer);
      formDataToSend.append('issueDate', formData.issueDate);
      if (formData.expiryDate) formDataToSend.append('expiryDate', formData.expiryDate);
      if (formData.credentialId) formDataToSend.append('credentialId', formData.credentialId);
      if (formData.credentialUrl) formDataToSend.append('credentialUrl', formData.credentialUrl);
      if (formData.description) formDataToSend.append('description', formData.description);
      formDataToSend.append('skills', JSON.stringify(formData.skills));
      formDataToSend.append('image', imageFile);

      await createCertificateAPI(formDataToSend);
      
      setIsAddModalOpen(false);
      setFormData({
        title: "",
        issuer: "",
        issueDate: "",
        expiryDate: "",
        credentialId: "",
        credentialUrl: "",
        skills: [],
        description: ""
      });
      setImageFile(null);
    } catch (err) {
      console.error("Error creating certificate:", err);
      alert(err.response?.data?.message || "Failed to create certificate");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formDataToSend = new FormData();
      
      formDataToSend.append('title', formData.title);
      formDataToSend.append('issuer', formData.issuer);
      formDataToSend.append('issueDate', formData.issueDate);
      if (formData.expiryDate) formDataToSend.append('expiryDate', formData.expiryDate);
      if (formData.credentialId) formDataToSend.append('credentialId', formData.credentialId);
      if (formData.credentialUrl) formDataToSend.append('credentialUrl', formData.credentialUrl);
      if (formData.description) formDataToSend.append('description', formData.description);
      formDataToSend.append('skills', JSON.stringify(formData.skills));
      
      if (imageFile) {
        formDataToSend.append('image', imageFile);
      }

      await updateCertificateAPI(selectedCertificate._id, formDataToSend);
      
      setIsEditModalOpen(false);
      setSelectedCertificate(null);
    } catch (err) {
      console.error("Error updating certificate:", err);
      alert(err.response?.data?.message || "Failed to update certificate");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setIsSubmitting(true);
    try {
      await deleteCertificateAPI(selectedCertificate._id);
      
      setIsDeleteDialogOpen(false);
      setSelectedCertificate(null);
    } catch (err) {
      console.error("Error deleting certificate:", err);
      alert(err.response?.data?.message || "Failed to delete certificate");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
            Certificates Management
          </h2>
          <p className="text-neutral-500 mt-1">Manage your professional certifications</p>
        </div>
        <Button onClick={handleOpenAddModal} className="gap-2" disabled={loading}>
          <FiPlus size={18} />
          Add Certificate
        </Button>
      </div>

      {/* Error State */}
      {error && (
        <Card className="bg-red-500/10 border-red-500/20">
          <CardContent className="p-4">
            <p className="text-red-500">{error}</p>
          </CardContent>
        </Card>
      )}

      {/* Loading State */}
      {loading && (
        <Card className={isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}>
          <CardContent className="p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
            <p className="text-neutral-500">Loading certificates...</p>
          </CardContent>
        </Card>
      )}

      {/* Stats */}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className={isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500">
                  <FiAward className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-neutral-500">Total Certificates</p>
                  <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                    {certificates.length}
                  </h3>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500">
                  <FiCalendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-neutral-500">This Year</p>
                  <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                    {certificates.filter(c => new Date(c.issueDate).getFullYear() === new Date().getFullYear()).length}
                  </h3>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-red-500">
                  <FiLink className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-neutral-500">With Credentials</p>
                  <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                    {certificates.filter(c => c.credentialUrl).length}
                  </h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Empty State */}
      {!loading && certificates.length === 0 && (
        <Card className={isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}>
          <CardContent className="p-12 text-center">
            <FiAward className="w-16 h-16 mx-auto mb-4 text-neutral-400" />
            <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
              No certificates found
            </h3>
            <p className="text-neutral-500 mb-4">Get started by adding your first certification</p>
            <Button onClick={handleOpenAddModal} className="gap-2">
              <FiPlus size={18} />
              Add Your First Certificate
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Certificates Grid */}
      {!loading && certificates.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {certificates.map((certificate, index) => (
              <motion.div
                key={certificate._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className={`${
                  isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'
                } hover:shadow-xl transition-all group h-full`}>
                  <CardContent className="p-0">
                    {/* Certificate Image */}
                    {certificate.image && (
                      <div className="relative w-full h-48 overflow-hidden rounded-t-lg bg-neutral-100 dark:bg-neutral-800">
                        <img
                          src={certificate.image.url}
                          alt={certificate.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    )}

                    <div className="p-6">
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                          {certificate.title}
                        </h3>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="outline" className="text-xs">
                          {certificate.issuer}
                        </Badge>
                      </div>

                      <p className={`text-sm mb-3 ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                        <FiCalendar className="inline mr-1" size={14} />
                        Issued: {formatDate(certificate.issueDate)}
                        {certificate.expiryDate && ` • Expires: ${formatDate(certificate.expiryDate)}`}
                      </p>

                      {certificate.description && (
                        <p className={`text-sm mb-4 line-clamp-2 ${isDarkMode ? 'text-neutral-300' : 'text-neutral-600'}`}>
                          {certificate.description}
                        </p>
                      )}

                      {/* Skills */}
                      {certificate.skills && certificate.skills.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {certificate.skills.slice(0, 3).map((skill, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {certificate.skills.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{certificate.skills.length - 3}
                            </Badge>
                          )}
                        </div>
                      )}

                      {/* Credential Link */}
                      {certificate.credentialUrl && (
                        <div className="mb-4">
                          <a
                            href={certificate.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-500 hover:text-primary-600 flex items-center gap-1 text-sm"
                          >
                            <FiExternalLink size={14} />
                            View Credential
                          </a>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex gap-2 pt-4 border-t border-neutral-200 dark:border-neutral-800">
                        <button
                          onClick={() => handleOpenEditModal(certificate)}
                          className="flex-1 p-2 rounded hover:bg-primary-500/10 text-primary-500 text-sm flex items-center justify-center gap-2"
                        >
                          <FiEdit2 size={16} />
                          Edit
                        </button>
                        <button
                          onClick={() => handleOpenDeleteDialog(certificate)}
                          className="flex-1 p-2 rounded hover:bg-red-500/10 text-red-500 text-sm flex items-center justify-center gap-2"
                        >
                          <FiTrash2 size={16} />
                          Delete
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Add Certificate Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className={`${isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white'} max-w-2xl max-h-[90vh] overflow-y-auto`}>
          <DialogHeader>
            <DialogTitle className={isDarkMode ? 'text-white' : 'text-neutral-900'}>
              Add New Certificate
            </DialogTitle>
            <DialogDescription>
              Add a new professional certification to your portfolio
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitAdd} className="space-y-4">
            <div>
              <Label htmlFor="title">Certificate Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="AWS Certified Solutions Architect"
                required
              />
            </div>

            <div>
              <Label htmlFor="issuer">Issuing Organization *</Label>
              <Input
                id="issuer"
                value={formData.issuer}
                onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                placeholder="Amazon Web Services"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="issueDate">Issue Date *</Label>
                <Input
                  id="issueDate"
                  type="date"
                  value={formData.issueDate}
                  onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="credentialId">Credential ID</Label>
              <Input
                id="credentialId"
                value={formData.credentialId}
                onChange={(e) => setFormData({ ...formData, credentialId: e.target.value })}
                placeholder="ABC123XYZ"
              />
            </div>

            <div>
              <Label htmlFor="credentialUrl">Credential URL</Label>
              <Input
                id="credentialUrl"
                type="url"
                value={formData.credentialUrl}
                onChange={(e) => setFormData({ ...formData, credentialUrl: e.target.value })}
                placeholder="https://www.credly.com/badges/..."
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description of the certification..."
                rows={3}
              />
            </div>

            {/* Skills */}
            <div>
              <Label htmlFor="skillInput">Related Skills</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  id="skillInput"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                  placeholder="AWS, Cloud Computing, etc."
                />
                <Button type="button" onClick={handleAddSkill} variant="outline">
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill, i) => (
                  <Badge key={i} className="gap-1 pr-1">
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="ml-1 hover:text-red-500"
                    >
                      <FiX size={14} />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <Label htmlFor="image">Certificate Image *</Label>
              <div className="mt-2">
                <label
                  htmlFor="image"
                  className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer ${
                    isDarkMode 
                      ? 'border-neutral-700 hover:border-neutral-600 bg-neutral-800/50' 
                      : 'border-neutral-300 hover:border-neutral-400 bg-neutral-50'
                  }`}
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <FiUpload className="w-10 h-10 mb-3 text-neutral-400" />
                    <p className="mb-2 text-sm text-neutral-500">
                      <span className="font-semibold">Click to upload</span> certificate image
                    </p>
                    <p className="text-xs text-neutral-500">PNG, JPG, GIF up to 5MB</p>
                  </div>
                  <input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    required
                  />
                </label>
                {imageFile && (
                  <p className="text-sm text-green-500 mt-2">✓ {imageFile.name}</p>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsAddModalOpen(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="gap-2">
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Adding...
                  </>
                ) : (
                  <>
                    <FiSave size={16} />
                    Add Certificate
                  </>
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Certificate Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className={`${isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white'} max-w-2xl max-h-[90vh] overflow-y-auto`}>
          <DialogHeader>
            <DialogTitle className={isDarkMode ? 'text-white' : 'text-neutral-900'}>
              Edit Certificate
            </DialogTitle>
            <DialogDescription>
              Update certificate information
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitEdit} className="space-y-4">
            <div>
              <Label htmlFor="edit-title">Certificate Title *</Label>
              <Input
                id="edit-title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="edit-issuer">Issuing Organization *</Label>
              <Input
                id="edit-issuer"
                value={formData.issuer}
                onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-issueDate">Issue Date *</Label>
                <Input
                  id="edit-issueDate"
                  type="date"
                  value={formData.issueDate}
                  onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="edit-expiryDate">Expiry Date</Label>
                <Input
                  id="edit-expiryDate"
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="edit-credentialId">Credential ID</Label>
              <Input
                id="edit-credentialId"
                value={formData.credentialId}
                onChange={(e) => setFormData({ ...formData, credentialId: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="edit-credentialUrl">Credential URL</Label>
              <Input
                id="edit-credentialUrl"
                type="url"
                value={formData.credentialUrl}
                onChange={(e) => setFormData({ ...formData, credentialUrl: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="edit-skillInput">Related Skills</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  id="edit-skillInput"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                  placeholder="Add skill"
                />
                <Button type="button" onClick={handleAddSkill} variant="outline">
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill, i) => (
                  <Badge key={i} className="gap-1 pr-1">
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="ml-1 hover:text-red-500"
                    >
                      <FiX size={14} />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="edit-image">Update Certificate Image (optional)</Label>
              <input
                id="edit-image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-2"
              />
              {imageFile && (
                <p className="text-sm text-green-500 mt-2">✓ New image selected: {imageFile.name}</p>
              )}
              {selectedCertificate?.image && !imageFile && (
                <p className="text-sm text-neutral-500 mt-1">Current image will be kept</p>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsEditModalOpen(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="gap-2">
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <FiSave size={16} />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className={isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white'}>
          <AlertDialogHeader>
            <AlertDialogTitle className={isDarkMode ? 'text-white' : 'text-neutral-900'}>
              Delete Certificate
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete <span className="font-semibold">{selectedCertificate?.title}</span>?
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isSubmitting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isSubmitting}
              className="bg-red-500 hover:bg-red-600"
            >
              {isSubmitting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Certificates;
