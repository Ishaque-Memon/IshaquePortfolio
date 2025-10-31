// src/Components/Skills.jsx
import React, { useState, useMemo } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { useSkills } from "../../hooks/usePortfolio";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiX, FiSave } from "@/assets/Icons/Icons";
import { SkillIcons } from "@/assets/Icons/Icons";
import { Card, CardContent } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import IconSelector from "@/Components/ui/icon-selector";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import Loader from "../../Components/common/Loader.jsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/Components/ui/alert-dialog";

/**
 * ==========================================
 * CATEGORY CONFIGURATION
 * ==========================================
 */
const CATEGORIES = [
  { value: "frontend", label: "Frontend", icon: "SiReact", color: "blue" },
  { value: "backend", label: "Backend", icon: "SiNodedotjs", color: "green" },
  { value: "mobile", label: "Mobile", icon: "SiFlutter", color: "purple" },
  { value: "database", label: "Database", icon: "FiDatabase", color: "pink" },
  { value: "cloud", label: "Cloud & DevOps", icon: "FiCloud", color: "sky" },
  { value: "tools", label: "Tools", icon: "FiTool", color: "orange" },
  { value: "framework", label: "Framework", icon: "FiLayers", color: "indigo" },
  { value: "other", label: "Other", icon: "FiCode", color: "gray" }
];

const PROFICIENCY_LEVELS = ["Beginner", "Intermediate", "Advanced", "Expert"];

/**
 * Helper to get icon component
 * SkillIcons maps names to React Components (not JSX). We return a component
 * so callers can render <Icon ... /> safely.
 */
const getIconComponent = (iconName) => {
  return SkillIcons[iconName] || SkillIcons.FiCode || (() => null);
};

/**
 * Helper to get category colors
 */
const getCategoryColors = (color, isDarkMode) => {
  const colorMap = {
    blue: {
      text: isDarkMode ? 'text-blue-400' : 'text-blue-600',
      bg: isDarkMode ? 'bg-blue-500/10' : 'bg-blue-50',
      border: isDarkMode ? 'border-blue-500/20' : 'border-blue-200',
      hover: isDarkMode ? 'hover:bg-blue-500/20' : 'hover:bg-blue-100'
    },
    green: {
      text: isDarkMode ? 'text-green-400' : 'text-green-600',
      bg: isDarkMode ? 'bg-green-500/10' : 'bg-green-50',
      border: isDarkMode ? 'border-green-500/20' : 'border-green-200',
      hover: isDarkMode ? 'hover:bg-green-500/20' : 'hover:bg-green-100'
    },
    purple: {
      text: isDarkMode ? 'text-purple-400' : 'text-purple-600',
      bg: isDarkMode ? 'bg-purple-500/10' : 'bg-purple-50',
      border: isDarkMode ? 'border-purple-500/20' : 'border-purple-200',
      hover: isDarkMode ? 'hover:bg-purple-500/20' : 'hover:bg-purple-100'
    },
    pink: {
      text: isDarkMode ? 'text-pink-400' : 'text-pink-600',
      bg: isDarkMode ? 'bg-pink-500/10' : 'bg-pink-50',
      border: isDarkMode ? 'border-pink-500/20' : 'border-pink-200',
      hover: isDarkMode ? 'hover:bg-pink-500/20' : 'hover:bg-pink-100'
    },
    sky: {
      text: isDarkMode ? 'text-sky-400' : 'text-sky-600',
      bg: isDarkMode ? 'bg-sky-500/10' : 'bg-sky-50',
      border: isDarkMode ? 'border-sky-500/20' : 'border-sky-200',
      hover: isDarkMode ? 'hover:bg-sky-500/20' : 'hover:bg-sky-100'
    },
    orange: {
      text: isDarkMode ? 'text-orange-400' : 'text-orange-600',
      bg: isDarkMode ? 'bg-orange-500/10' : 'bg-orange-50',
      border: isDarkMode ? 'border-orange-500/20' : 'border-orange-200',
      hover: isDarkMode ? 'hover:bg-orange-500/20' : 'hover:bg-orange-100'
    },
    indigo: {
      text: isDarkMode ? 'text-indigo-400' : 'text-indigo-600',
      bg: isDarkMode ? 'bg-indigo-500/10' : 'bg-indigo-50',
      border: isDarkMode ? 'border-indigo-500/20' : 'border-indigo-200',
      hover: isDarkMode ? 'hover:bg-indigo-500/20' : 'hover:bg-indigo-100'
    },
    gray: {
      text: isDarkMode ? 'text-gray-400' : 'text-gray-600',
      bg: isDarkMode ? 'bg-gray-500/10' : 'bg-gray-50',
      border: isDarkMode ? 'border-gray-500/20' : 'border-gray-200',
      hover: isDarkMode ? 'hover:bg-gray-500/20' : 'hover:bg-gray-100'
    }
  };
  return colorMap[color] || colorMap.gray;
};

/**
 * Helper to get level colors
 */
const getLevelColor = (level) => {
  const colors = {
    "Beginner": "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    "Intermediate": "bg-blue-500/10 text-blue-500 border-blue-500/20",
    "Advanced": "bg-purple-500/10 text-purple-500 border-purple-500/20",
    "Expert": "bg-green-500/10 text-green-500 border-green-500/20"
  };
  return colors[level] || "bg-gray-500/10 text-gray-500 border-gray-500/20";
};

/**
 * SKILL CARD
 */
const SkillCard = ({ skill, onEdit, onDelete, isDarkMode, index }) => {
  const category = CATEGORIES.find(c => c.value === skill.category);
  const Icon = getIconComponent(skill.icon || category?.icon || 'FiCode');
  const colors = getCategoryColors(category?.color || 'gray', isDarkMode);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className={`${isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'} hover:shadow-lg transition-all group`}>
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-lg ${colors.bg} ${colors.border} border`}>
                <Icon className={`w-5 h-5 ${colors.text}`} />
              </div>
              <div>
                <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>{skill.name}</h3>
                <p className={`text-xs capitalize ${colors.text}`}>{category?.label || skill.category}</p>
              </div>
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
              <button onClick={() => onEdit(skill)} className={`p-1.5 rounded transition-colors ${isDarkMode ? 'hover:bg-primary-500/10 text-primary-400' : 'hover:bg-primary-500/10 text-primary-600'}`}>
                <FiEdit2 size={16} />
              </button>
              <button onClick={() => onDelete(skill)} className={`p-1.5 rounded transition-colors ${isDarkMode ? 'hover:bg-red-500/10 text-red-400' : 'hover:bg-red-500/10 text-red-600'}`}>
                <FiTrash2 size={16} />
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <Badge variant="outline" className={getLevelColor(skill.level)}>
              {skill.level}
            </Badge>
            {skill.proficiency && (
              <span className={`text-xs font-medium ${colors.text}`}>
                {skill.proficiency}%
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

/**
 * CATEGORY STAT CARD
 * - Renders icons of skills in that category (first N shown, +M badge for remainder)
 */
const CategoryStatCard = ({ category, skills = [], count, isActive, onClick, isDarkMode }) => {
  const colors = getCategoryColors(category.color, isDarkMode);
  const maxShown = 4;
  const shown = skills.slice(0, maxShown);
  const remaining = skills.length - shown.length;

  return (
    <Card
      className={`cursor-pointer transition-all ${isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'} ${isActive ? `${colors.border} border-2` : 'hover:shadow-lg'}`}
      onClick={onClick}
    >
      <CardContent className="p-4 text-center">
        {/* icons row */}
        <div className="flex items-center justify-center mb-3 gap-2">
          {shown.length === 0 ? (
            (() => {
              const CatIcon = getIconComponent(category.icon);
              return (
                <div className={`w-10 h-10 rounded-lg ${colors.bg} ${colors.border} border flex items-center justify-center`}>
                  <CatIcon className={`w-5 h-5 ${colors.text}`} />
                </div>
              );
            })()
          ) : (
            <div className="flex -space-x-1 items-center">
              {shown.map((skill, idx) => {
                const IconCmp = getIconComponent(skill.icon || category.icon);
                return (
                  <div
                    key={skill._id || `${skill.name}-${idx}`}
                    title={skill.name}
                    className={`w-8 h-8 rounded-full border ${colors.border} ${colors.bg} flex items-center justify-center text-xs`}
                  >
                    {IconCmp ? <IconCmp className={`w-4 h-4 ${colors.text}`} /> : null}
                  </div>
                );
              })}
              {remaining > 0 && (
                <div className={`w-8 h-8 rounded-full border ${colors.border} ${colors.bg} flex items-center justify-center text-xs font-semibold`}>
                  +{remaining}
                </div>
              )}
            </div>
          )}
        </div>

        <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>{count}</p>
        <p className={`text-xs mt-1 ${colors.text}`}>{category.label}</p>
      </CardContent>
    </Card>
  );
};

/**
 * SKILL FORM
 */
const SkillForm = ({ formData, setFormData, onSubmit, isSubmitting, isDarkMode, submitLabel }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Skill Name *</Label>
        <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="e.g., React, Node.js, Python" required />
      </div>

      <div>
        <Label htmlFor="category">Category *</Label>
        <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })} required>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent className={isDarkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-white border-neutral-200'}>
            {CATEGORIES.map(cat => (
              <SelectItem key={cat.value} value={cat.value} className={isDarkMode ? 'text-white' : 'text-neutral-900'}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="level">Proficiency Level *</Label>
        <Select value={formData.level} onValueChange={(value) => setFormData({ ...formData, level: value })} required>
          <SelectTrigger>
            <SelectValue placeholder="Select level" />
          </SelectTrigger>
          <SelectContent className={isDarkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-white border-neutral-200'}>
            {PROFICIENCY_LEVELS.map(level => (
              <SelectItem key={level} value={level} className={isDarkMode ? 'text-white' : 'text-neutral-900'}>
                {level}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="proficiency">Proficiency Percentage *</Label>
        <Input id="proficiency" type="number" min="0" max="100" value={formData.proficiency} onChange={(e) => setFormData({ ...formData, proficiency: parseInt(e.target.value) || 0 })} placeholder="e.g., 75" required />
        <p className="text-xs text-neutral-500 mt-1">Enter a value between 0-100</p>
      </div>

      <div>
        <Label htmlFor="icon">Icon *</Label>
        <IconSelector value={formData.icon} onChange={(value) => setFormData({ ...formData, icon: value })} isDarkMode={isDarkMode} placeholder="Select an icon" />
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button type="submit" disabled={isSubmitting} className="gap-2">
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              {isSubmitting ? 'Saving...' : submitLabel}
            </>
          ) : (
            <>
              <FiSave size={16} />
              {submitLabel}
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

/**
 * MAIN SKILLS
 */
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
    proficiency: 50,
    icon: "FiCode"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filtered skills for grid
  const filteredSkills = useMemo(() => {
    return skills.filter(skill => {
      const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === "all" || skill.category === filterCategory;
      return matchesSearch && matchesCategory;
    });
  }, [skills, searchTerm, filterCategory]);

  // Category stats include the skills list for each category
  const categoryStats = useMemo(() => {
    return CATEGORIES.map(cat => {
      const list = skills.filter(s => s.category === cat.value);
      return {
        ...cat,
        count: list.length,
        skills: list
      };
    });
  }, [skills]);

  // Modal handlers
  const handleOpenAddModal = () => {
    setFormData({ name: "", category: "", level: "", proficiency: 50, icon: "FiCode" });
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (skill) => {
    setSelectedSkill(skill);
    setFormData({
      name: skill.name,
      category: skill.category,
      level: skill.level,
      proficiency: skill.proficiency || 50,
      icon: skill.icon || "FiCode"
    });
    setIsEditModalOpen(true);
  };

  const handleOpenDeleteDialog = (skill) => {
    setSelectedSkill(skill);
    setIsDeleteDialogOpen(true);
  };

  // CRUD operations
  const handleSubmitAdd = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await createSkill(formData);
      setIsAddModalOpen(false);
      setFormData({ name: "", category: "", level: "", proficiency: 50, icon: "FiCode" });
    } catch (err) {
  // ...removed console.error("Error creating skill:", err);
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
      setFormData({ name: "", category: "", level: "", proficiency: 50, icon: "FiCode" });
    } catch (err) {
  // ...removed console.error("Error updating skill:", err);
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
  // ...removed console.error("Error deleting skill:", err);
      alert(err.response?.data?.message || "Failed to delete skill");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader variant="spinner" size="default" text="Loading skills..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>Skills Management</h2>
          <p className="text-neutral-500 mt-1">Manage your technical skills and expertise</p>
        </div>
        <Button onClick={handleOpenAddModal} className="gap-2">
          <FiPlus size={18} />
          Add New Skill
        </Button>
      </div>

      {/* Stats Cards — ONLY render when there are skills */}
      {skills.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {/* Category Stat Cards — render only categories with count > 0 */}
          {categoryStats.filter(cat => cat.count > 0).map((cat) => (
            <CategoryStatCard
              key={cat.value}
              category={cat}
              count={cat.count}
              skills={cat.skills}
              isActive={filterCategory === cat.value}
              onClick={() => setFilterCategory(filterCategory === cat.value ? "all" : cat.value)}
              isDarkMode={isDarkMode}
            />
          ))}
        </div>
      )}

      {/* Filters */}
      <Card className={isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
              <Input placeholder="Search skills..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
            </div>

            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent className={isDarkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-white border-neutral-200'}>
                <SelectItem value="all" className={isDarkMode ? 'text-white' : 'text-neutral-900'}>All Categories</SelectItem>
                {CATEGORIES.map(cat => <SelectItem key={cat.value} value={cat.value} className={isDarkMode ? 'text-white' : 'text-neutral-900'}>{cat.label}</SelectItem>)}
              </SelectContent>
            </Select>

            {(searchTerm || filterCategory !== "all") && (
              <Button variant="outline" onClick={() => { setSearchTerm(""); setFilterCategory("all"); }} className="gap-2">
                <FiX size={16} />
                Clear
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Error */}
      {error && (
        <Card className="border-red-500/20 bg-red-500/5">
          <CardContent className="p-4">
            <p className="text-red-500 text-sm">{error}</p>
          </CardContent>
        </Card>
      )}

      {/* Skills Grid or Empty */}
      {filteredSkills.length === 0 ? (
        <Card className={isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}>
          <CardContent className="p-12 text-center">
            {(() => {
              const EmptyIcon = getIconComponent('FiCode');
              return <EmptyIcon className="w-16 h-16 mx-auto mb-4 text-neutral-400" />;
            })()}
            <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>No skills found</h3>
            <p className="text-neutral-500 mb-4">
              {searchTerm || filterCategory !== "all" ? "Try adjusting your filters" : "Get started by adding your first skill"}
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
            {filteredSkills.map((skill, index) => (
              <SkillCard key={skill._id} skill={skill} onEdit={handleOpenEditModal} onDelete={handleOpenDeleteDialog} isDarkMode={isDarkMode} index={index} />
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Add Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className={isDarkMode ? 'bg-neutral-900 border border-neutral-800 text-white max-w-2xl max-h-[90vh] overflow-y-auto' : 'bg-white border border-neutral-200 text-neutral-900 max-w-2xl max-h-[90vh] overflow-y-auto'}>
          <DialogHeader>
            <DialogTitle className={isDarkMode ? 'text-white' : 'text-neutral-900'}>Add New Skill</DialogTitle>
            <DialogDescription>Add a new skill to your portfolio</DialogDescription>
          </DialogHeader>
          <SkillForm formData={formData} setFormData={setFormData} onSubmit={handleSubmitAdd} isSubmitting={isSubmitting} isDarkMode={isDarkMode} submitLabel="Add Skill" />
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className={isDarkMode ? 'bg-neutral-900 border border-neutral-800 text-white max-w-2xl max-h-[90vh] overflow-y-auto' : 'bg-white border border-neutral-200 text-neutral-900 max-w-2xl max-h-[90vh] overflow-y-auto'}>
          <DialogHeader>
            <DialogTitle className={isDarkMode ? 'text-white' : 'text-neutral-900'}>Edit Skill</DialogTitle>
            <DialogDescription>Update skill information</DialogDescription>
          </DialogHeader>
          <SkillForm formData={formData} setFormData={setFormData} onSubmit={handleSubmitEdit} isSubmitting={isSubmitting} isDarkMode={isDarkMode} submitLabel="Save Changes" />
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className={isDarkMode ? 'bg-neutral-900 border border-neutral-800 text-white' : 'bg-white border border-neutral-200 text-neutral-900'}>
          <AlertDialogHeader>
            <AlertDialogTitle className={isDarkMode ? 'text-white' : 'text-neutral-900'}>Delete Skill</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete <span className="font-semibold">{selectedSkill?.name}</span>? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isSubmitting}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={isSubmitting} className="bg-red-500 hover:bg-red-600">
              {isSubmitting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Skills;
