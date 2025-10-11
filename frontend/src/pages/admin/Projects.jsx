import React, { useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { useProjects } from "../../hooks/usePortfolio";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiPlus, FiEdit2, FiTrash2, FiFolder, FiExternalLink, FiGithub,
  FiSave, FiX, FiUpload, FiImage, FiStar
} from "react-icons/fi";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

const Projects = () => {
  const { isDarkMode } = useTheme();
  const {
    projects,
    loading,
    error,
    createProject: createProjectAPI,
    updateProject: updateProjectAPI,
    deleteProject: deleteProjectAPI
  } = useProjects();

  // Project categories
  const categories = [
    { value: "web", label: "Web Application" },
    { value: "mobile", label: "Mobile App" },
    { value: "desktop", label: "Desktop Application" },
    { value: "fullstack", label: "Full Stack" },
    { value: "frontend", label: "Frontend" },
    { value: "backend", label: "Backend" },
    { value: "ai-ml", label: "AI/ML" },
    { value: "other", label: "Other" }
  ];

  // Project status options
  const statusOptions = [
    { value: "completed", label: "Completed" },
    { value: "in-progress", label: "In Progress" },
    { value: "archived", label: "Archived" }
  ];

  // Popular technologies for suggestions
  const techSuggestions = [
    "React", "Next.js", "Vue.js", "Angular", "Node.js", "Express",
    "MongoDB", "PostgreSQL", "MySQL", "Firebase", "Tailwind CSS",
    "TypeScript", "JavaScript", "Python", "Django", "Flask",
    "React Native", "Flutter", "Electron", "GraphQL", "REST API",
    "AWS", "Azure", "Docker", "Kubernetes", "Git"
  ];

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    shortDescription: "",
    technologies: [],
    category: "web",
    liveUrl: "",
    githubUrl: "",
    featured: false,
    status: "completed"
  });
  const [techInput, setTechInput] = useState("");
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpenAddModal = () => {
    setFormData({
      title: "",
      description: "",
      shortDescription: "",
      technologies: [],
      category: "web",
      liveUrl: "",
      githubUrl: "",
      featured: false,
      status: "completed"
    });
    setTechInput("");
    setImages([]);
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (project) => {
    setSelectedProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      shortDescription: project.shortDescription || "",
      technologies: project.technologies || [],
      category: project.category,
      liveUrl: project.liveUrl || "",
      githubUrl: project.githubUrl || "",
      featured: project.featured || false,
      status: project.status || "completed"
    });
    setTechInput("");
    setImages([]);
    setIsEditModalOpen(true);
  };

  const handleOpenDeleteDialog = (project) => {
    setSelectedProject(project);
    setIsDeleteDialogOpen(true);
  };

  // Handle adding technology
  const handleAddTech = () => {
    if (techInput.trim() && !formData.technologies.includes(techInput.trim())) {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, techInput.trim()]
      });
      setTechInput("");
    }
  };

  const handleRemoveTech = (techToRemove) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter(tech => tech !== techToRemove)
    });
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handleSubmitAdd = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formDataToSend = new FormData();
      
      // Append text fields
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      if (formData.shortDescription) formDataToSend.append('shortDescription', formData.shortDescription);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('status', formData.status);
      formDataToSend.append('featured', formData.featured);
      if (formData.liveUrl) formDataToSend.append('liveUrl', formData.liveUrl);
      if (formData.githubUrl) formDataToSend.append('githubUrl', formData.githubUrl);
      
      // Append technologies as JSON string
      formDataToSend.append('technologies', JSON.stringify(formData.technologies));
      
      // Append images
      images.forEach((image) => {
        formDataToSend.append('images', image);
      });

      await createProjectAPI(formDataToSend);
      
      setIsAddModalOpen(false);
      setFormData({
        title: "",
        description: "",
        shortDescription: "",
        technologies: [],
        category: "web",
        liveUrl: "",
        githubUrl: "",
        featured: false,
        status: "completed"
      });
      setImages([]);
    } catch (err) {
      console.error("Error creating project:", err);
      alert(err.response?.data?.message || "Failed to create project");
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
      formDataToSend.append('description', formData.description);
      if (formData.shortDescription) formDataToSend.append('shortDescription', formData.shortDescription);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('status', formData.status);
      formDataToSend.append('featured', formData.featured);
      if (formData.liveUrl) formDataToSend.append('liveUrl', formData.liveUrl);
      if (formData.githubUrl) formDataToSend.append('githubUrl', formData.githubUrl);
      formDataToSend.append('technologies', JSON.stringify(formData.technologies));
      
      images.forEach((image) => {
        formDataToSend.append('images', image);
      });

      await updateProjectAPI(selectedProject._id, formDataToSend);
      
      setIsEditModalOpen(false);
      setSelectedProject(null);
    } catch (err) {
      console.error("Error updating project:", err);
      alert(err.response?.data?.message || "Failed to update project");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setIsSubmitting(true);
    try {
      await deleteProjectAPI(selectedProject._id);
      
      setIsDeleteDialogOpen(false);
      setSelectedProject(null);
    } catch (err) {
      console.error("Error deleting project:", err);
      alert(err.response?.data?.message || "Failed to delete project");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
            Projects Management
          </h2>
          <p className="text-neutral-500 mt-1">Manage your portfolio projects</p>
        </div>
        <Button onClick={handleOpenAddModal} className="gap-2" disabled={loading}>
          <FiPlus size={18} />
          Add Project
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
            <p className="text-neutral-500">Loading projects...</p>
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
                  <FiFolder className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-neutral-500">Total Projects</p>
                  <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                    {projects.length}
                  </h3>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500">
                  <FiStar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-neutral-500">Featured Projects</p>
                  <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                    {projects.filter(p => p.featured).length}
                  </h3>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}>
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-red-500">
                  <FiImage className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-neutral-500">With Images</p>
                  <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                    {projects.filter(p => p.images && p.images.length > 0).length}
                  </h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Projects Grid */}
      {!loading && projects.length === 0 && (
        <Card className={isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}>
          <CardContent className="p-12 text-center">
            <FiFolder className="w-16 h-16 mx-auto mb-4 text-neutral-400" />
            <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
              No projects found
            </h3>
            <p className="text-neutral-500 mb-4">Get started by adding your first project</p>
            <Button onClick={handleOpenAddModal} className="gap-2">
              <FiPlus size={18} />
              Add Your First Project
            </Button>
          </CardContent>
        </Card>
      )}

      {!loading && projects.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {projects.map((project, index) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className={`${
                  isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'
                } hover:shadow-xl transition-all group h-full`}>
                  <CardContent className="p-0">
                    {/* Project Image */}
                    {project.images && project.images[0] && (
                      <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
                        <img
                          src={project.images[0].url}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        {project.featured && (
                          <div className="absolute top-2 right-2">
                            <Badge className="bg-yellow-500 text-white">
                              <FiStar size={12} className="mr-1" />
                              Featured
                            </Badge>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="p-6">
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                          {project.title}
                        </h3>
                        <Badge className="text-xs">
                          {categories.find(c => c.value === project.category)?.label}
                        </Badge>
                      </div>

                      <p className={`text-sm mb-4 line-clamp-3 ${isDarkMode ? 'text-neutral-300' : 'text-neutral-600'}`}>
                        {project.shortDescription || project.description}
                      </p>

                      {/* Technologies */}
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.slice(0, 3).map((tech, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                          {project.technologies.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{project.technologies.length - 3}
                            </Badge>
                          )}
                        </div>
                      )}

                      {/* Links */}
                      <div className="flex items-center gap-3 mb-4">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-500 hover:text-primary-600 flex items-center gap-1 text-sm"
                          >
                            <FiExternalLink size={14} />
                            Live Demo
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-neutral-500 hover:text-neutral-600 flex items-center gap-1 text-sm"
                          >
                            <FiGithub size={14} />
                            GitHub
                          </a>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 pt-4 border-t border-neutral-200 dark:border-neutral-800">
                        <button
                          onClick={() => handleOpenEditModal(project)}
                          className="flex-1 p-2 rounded hover:bg-primary-500/10 text-primary-500 text-sm flex items-center justify-center gap-2"
                        >
                          <FiEdit2 size={16} />
                          Edit
                        </button>
                        <button
                          onClick={() => handleOpenDeleteDialog(project)}
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

      {/* Add Project Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className={`${isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white'} max-w-3xl max-h-[90vh] overflow-y-auto`}>
          <DialogHeader>
            <DialogTitle className={isDarkMode ? 'text-white' : 'text-neutral-900'}>
              Add New Project
            </DialogTitle>
            <DialogDescription>
              Add a new project to your portfolio
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitAdd} className="space-y-4">
            <div>
              <Label htmlFor="title">Project Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="My Awesome Project"
                required
              />
            </div>

            <div>
              <Label htmlFor="shortDescription">Short Description</Label>
              <Input
                id="shortDescription"
                value={formData.shortDescription}
                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                placeholder="Brief one-line description (max 200 chars)"
                maxLength={200}
              />
            </div>

            <div>
              <Label htmlFor="description">Full Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Detailed description of your project, features, challenges overcome..."
                rows={6}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category *</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className={isDarkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-white border-neutral-200'}>
                    {categories.map(cat => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="status">Status *</Label>
                <Select 
                  value={formData.status} 
                  onValueChange={(value) => setFormData({ ...formData, status: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className={isDarkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-white border-neutral-200'}>
                    {statusOptions.map(status => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Technologies */}
            <div>
              <Label htmlFor="techInput">Technologies & Tools</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  id="techInput"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTech())}
                  placeholder="Type technology name and press Enter"
                />
                <Button type="button" onClick={handleAddTech} variant="outline">
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.technologies.map((tech, i) => (
                  <Badge key={i} className="gap-1 pr-1">
                    {tech}
                    <button
                      type="button"
                      onClick={() => handleRemoveTech(tech)}
                      className="ml-1 hover:text-red-500"
                    >
                      <FiX size={14} />
                    </button>
                  </Badge>
                ))}
              </div>
              <p className="text-xs text-neutral-500">Suggestions: {techSuggestions.slice(0, 5).join(', ')}...</p>
            </div>

            {/* Image Upload */}
            <div>
              <Label htmlFor="images">Project Images</Label>
              <div className="mt-2">
                <label
                  htmlFor="images"
                  className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer ${
                    isDarkMode 
                      ? 'border-neutral-700 hover:border-neutral-600 bg-neutral-800/50' 
                      : 'border-neutral-300 hover:border-neutral-400 bg-neutral-50'
                  }`}
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <FiUpload className="w-10 h-10 mb-3 text-neutral-400" />
                    <p className="mb-2 text-sm text-neutral-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-neutral-500">PNG, JPG, GIF up to 5MB</p>
                  </div>
                  <input
                    id="images"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
                {images.length > 0 && (
                  <p className="text-sm text-green-500 mt-2">{images.length} image(s) selected</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="liveUrl">Live Demo URL</Label>
                <Input
                  id="liveUrl"
                  type="url"
                  value={formData.liveUrl}
                  onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                  placeholder="https://project-demo.com"
                />
              </div>

              <div>
                <Label htmlFor="githubUrl">GitHub URL</Label>
                <Input
                  id="githubUrl"
                  type="url"
                  value={formData.githubUrl}
                  onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                  placeholder="https://github.com/username/repo"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="rounded"
              />
              <Label htmlFor="featured" className="cursor-pointer flex items-center gap-2">
                <FiStar size={16} />
                Mark as Featured Project
              </Label>
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
                    Add Project
                  </>
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Project Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className={`${isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white'} max-w-3xl max-h-[90vh] overflow-y-auto`}>
          <DialogHeader>
            <DialogTitle className={isDarkMode ? 'text-white' : 'text-neutral-900'}>
              Edit Project
            </DialogTitle>
            <DialogDescription>
              Update project information
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitEdit} className="space-y-4">
            <div>
              <Label htmlFor="edit-title">Project Title *</Label>
              <Input
                id="edit-title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="edit-shortDescription">Short Description</Label>
              <Input
                id="edit-shortDescription"
                value={formData.shortDescription}
                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                maxLength={200}
              />
            </div>

            <div>
              <Label htmlFor="edit-description">Full Description *</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={6}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-category">Category *</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className={isDarkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-white border-neutral-200'}>
                    {categories.map(cat => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="edit-status">Status *</Label>
                <Select 
                  value={formData.status} 
                  onValueChange={(value) => setFormData({ ...formData, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className={isDarkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-white border-neutral-200'}>
                    {statusOptions.map(status => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="edit-techInput">Technologies & Tools</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  id="edit-techInput"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTech())}
                  placeholder="Type technology name"
                />
                <Button type="button" onClick={handleAddTech} variant="outline">
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.technologies.map((tech, i) => (
                  <Badge key={i} className="gap-1 pr-1">
                    {tech}
                    <button
                      type="button"
                      onClick={() => handleRemoveTech(tech)}
                      className="ml-1 hover:text-red-500"
                    >
                      <FiX size={14} />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="edit-images">Update Project Images (optional)</Label>
              <input
                id="edit-images"
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="mt-2"
              />
              {images.length > 0 && (
                <p className="text-sm text-green-500 mt-2">{images.length} new image(s) selected</p>
              )}
              {selectedProject?.images && selectedProject.images.length > 0 && (
                <p className="text-sm text-neutral-500 mt-1">Current: {selectedProject.images.length} image(s)</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-liveUrl">Live Demo URL</Label>
                <Input
                  id="edit-liveUrl"
                  type="url"
                  value={formData.liveUrl}
                  onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="edit-githubUrl">GitHub URL</Label>
                <Input
                  id="edit-githubUrl"
                  type="url"
                  value={formData.githubUrl}
                  onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="edit-featured"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="rounded"
              />
              <Label htmlFor="edit-featured" className="cursor-pointer flex items-center gap-2">
                <FiStar size={16} />
                Mark as Featured Project
              </Label>
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
              Delete Project
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete <span className="font-semibold">{selectedProject?.title}</span>?
              This will also delete all associated images. This action cannot be undone.
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

      {/* Edit & Delete Modals will be similar - Add them next */}
    </div>
  );
};

export default Projects;
