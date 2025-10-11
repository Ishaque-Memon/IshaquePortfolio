import React, { useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { useSkills } from "../../hooks/usePortfolio";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiPlus, FiEdit2, FiTrash2, FiSearch, FiX, FiSave,
  FiCode, FiDatabase, FiLayers, FiTool, FiCloud, FiGlobe
} from "react-icons/fi";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

const Skills = () => {
  const { isDarkMode } = useTheme();
  const { skills, loading, error, createSkill, updateSkill, deleteSkill } = useSkills();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    level: "",
    icon: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { value: "frontend", label: "Frontend", icon: FiCode, color: "text-blue-500" },
    { value: "backend", label: "Backend", icon: FiDatabase, color: "text-green-500" },
    { value: "framework", label: "Framework", icon: FiLayers, color: "text-purple-500" },
    { value: "tools", label: "Tools", icon: FiTool, color: "text-orange-500" },
    { value: "cloud", label: "Cloud", icon: FiCloud, color: "text-cyan-500" },
    { value: "other", label: "Other", icon: FiGlobe, color: "text-pink-500" }
  ];

  const levels = ["Beginner", "Intermediate", "Advanced", "Expert"];

  // Filter skills
  const filteredSkills = skills.filter(skill => {
    const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || skill.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Get category stats
  const categoryStats = categories.map(cat => ({
    ...cat,
    count: skills.filter(s => s.category === cat.value).length
  }));

  const handleOpenAddModal = () => {
    setFormData({ name: "", category: "", level: "", icon: "" });
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (skill) => {
    setSelectedSkill(skill);
    setFormData({
      name: skill.name,
      category: skill.category,
      level: skill.level,
      icon: skill.icon || ""
    });
    setIsEditModalOpen(true);
  };

  const handleOpenDeleteDialog = (skill) => {
    setSelectedSkill(skill);
    setIsDeleteDialogOpen(true);
  };

  const handleSubmitAdd = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await createSkill(formData);
      setIsAddModalOpen(false);
      setFormData({ name: "", category: "", level: "", icon: "" });
    } catch (err) {
      console.error("Error creating skill:", err);
      alert(err.response?.data?.message || "Failed to create skill");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await updateSkill(selectedSkill._id, formData);
      setIsEditModalOpen(false);
      setSelectedSkill(null);
      setFormData({ name: "", category: "", level: "", icon: "" });
    } catch (err) {
      console.error("Error updating skill:", err);
      alert(err.response?.data?.message || "Failed to update skill");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setIsSubmitting(true);
    try {
      await deleteSkill(selectedSkill._id);
      setIsDeleteDialogOpen(false);
      setSelectedSkill(null);
    } catch (err) {
      console.error("Error deleting skill:", err);
      alert(err.response?.data?.message || "Failed to delete skill");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCategoryIcon = (category) => {
    const cat = categories.find(c => c.value === category);
    return cat ? cat.icon : FiCode;
  };

  const getCategoryColor = (category) => {
    const cat = categories.find(c => c.value === category);
    return cat ? cat.color : "text-gray-500";
  };

  const getLevelColor = (level) => {
    const colors = {
      "Beginner": "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
      "Intermediate": "bg-blue-500/10 text-blue-500 border-blue-500/20",
      "Advanced": "bg-purple-500/10 text-purple-500 border-purple-500/20",
      "Expert": "bg-green-500/10 text-green-500 border-green-500/20"
    };
    return colors[level] || "bg-gray-500/10 text-gray-500 border-gray-500/20";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className={isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}>Loading skills...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
            Skills Management
          </h2>
          <p className="text-neutral-500 mt-1">Manage your technical skills and expertise</p>
        </div>
        <Button onClick={handleOpenAddModal} className="gap-2">
          <FiPlus size={18} />
          Add New Skill
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className={`${isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}`}>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-primary-500">{skills.length}</p>
            <p className="text-xs text-neutral-500 mt-1">Total Skills</p>
          </CardContent>
        </Card>
        {categoryStats.map((cat) => {
          const Icon = cat.icon;
          return (
            <Card 
              key={cat.value}
              className={`${isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'} cursor-pointer hover:shadow-lg transition-shadow`}
              onClick={() => setFilterCategory(cat.value)}
            >
              <CardContent className="p-4 text-center">
                <Icon className={`w-5 h-5 mx-auto mb-2 ${cat.color}`} />
                <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                  {cat.count}
                </p>
                <p className="text-xs text-neutral-500 mt-1">{cat.label}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Filters */}
      <Card className={isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
              <Input
                placeholder="Search skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(cat => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {(searchTerm || filterCategory !== "all") && (
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setFilterCategory("all");
                }}
                className="gap-2"
              >
                <FiX size={16} />
                Clear
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Skills Table/Grid */}
      {error && (
        <Card className="border-red-500/20 bg-red-500/5">
          <CardContent className="p-4">
            <p className="text-red-500 text-sm">{error}</p>
          </CardContent>
        </Card>
      )}

      {filteredSkills.length === 0 ? (
        <Card className={isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}>
          <CardContent className="p-12 text-center">
            <FiCode className="w-16 h-16 mx-auto mb-4 text-neutral-400" />
            <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
              No skills found
            </h3>
            <p className="text-neutral-500 mb-4">
              {searchTerm || filterCategory !== "all" 
                ? "Try adjusting your filters" 
                : "Get started by adding your first skill"}
            </p>
            {!searchTerm && filterCategory === "all" && (
              <Button onClick={handleOpenAddModal} className="gap-2">
                <FiPlus size={18} />
                Add Your First Skill
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {filteredSkills.map((skill, index) => {
              const Icon = getCategoryIcon(skill.category);
              return (
                <motion.div
                  key={skill._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className={`${
                    isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'
                  } hover:shadow-lg transition-all group`}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg bg-gradient-to-br from-primary-500/10 to-accent-500/10`}>
                            <Icon className={`w-5 h-5 ${getCategoryColor(skill.category)}`} />
                          </div>
                          <div>
                            <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                              {skill.name}
                            </h3>
                            <p className="text-xs text-neutral-500 capitalize">{skill.category}</p>
                          </div>
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                          <button
                            onClick={() => handleOpenEditModal(skill)}
                            className="p-1.5 rounded hover:bg-primary-500/10 text-primary-500"
                          >
                            <FiEdit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleOpenDeleteDialog(skill)}
                            className="p-1.5 rounded hover:bg-red-500/10 text-red-500"
                          >
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                      </div>
                      <Badge variant="outline" className={getLevelColor(skill.level)}>
                        {skill.level}
                      </Badge>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {/* Add Skill Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className={isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white'}>
          <DialogHeader>
            <DialogTitle className={isDarkMode ? 'text-white' : 'text-neutral-900'}>
              Add New Skill
            </DialogTitle>
            <DialogDescription>
              Add a new skill to your portfolio
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitAdd} className="space-y-4">
            <div>
              <Label htmlFor="name">Skill Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., React, Node.js, Python"
                required
              />
            </div>

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
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="level">Proficiency Level *</Label>
              <Select 
                value={formData.level} 
                onValueChange={(value) => setFormData({ ...formData, level: value })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  {levels.map(level => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="icon">Icon (Optional)</Label>
              <Input
                id="icon"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                placeholder="e.g., FaReact, FaNode"
              />
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
                    Add Skill
                  </>
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Skill Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className={isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white'}>
          <DialogHeader>
            <DialogTitle className={isDarkMode ? 'text-white' : 'text-neutral-900'}>
              Edit Skill
            </DialogTitle>
            <DialogDescription>
              Update skill information
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitEdit} className="space-y-4">
            <div>
              <Label htmlFor="edit-name">Skill Name *</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="edit-category">Category *</Label>
              <Select 
                value={formData.category} 
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="edit-level">Proficiency Level *</Label>
              <Select 
                value={formData.level} 
                onValueChange={(value) => setFormData({ ...formData, level: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {levels.map(level => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="edit-icon">Icon (Optional)</Label>
              <Input
                id="edit-icon"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              />
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
              Delete Skill
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete <span className="font-semibold">{selectedSkill?.name}</span>? 
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

export default Skills;
