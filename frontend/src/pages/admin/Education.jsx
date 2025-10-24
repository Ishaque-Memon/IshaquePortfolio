import { useState, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useEducation } from '../../hooks/usePortfolio';
import { getEducationOptions } from '../../api/portfolioApi';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Checkbox } from "../../components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import Loader from "../../Components/common/Loader.jsx";
import { FiPlus, FiEdit2, FiTrash2, FiSave, FiX, FiBookOpen, FiCalendar, FiMapPin, FiAward } from 'react-icons/fi';

const Education = () => {
  const { isDarkMode } = useTheme();
  const {
    education,
    loading, 
    error, 
    createEducation: createEducationAPI,
    updateEducation: updateEducationAPI,
    deleteEducation: deleteEducationAPI
  } = useEducation();

  // Education options from backend
  const [educationOptions, setEducationOptions] = useState({
    levels: [],
    boardsUniversities: [],
    degreeOptions: {},
    specializationOptions: {}
  });
  const [optionsLoading, setOptionsLoading] = useState(true);

  // Fetch education options from backend
 useEffect(() => {
  const fetchOptions = async () => {
    try {
      const data = await getEducationOptions();
      // normalize response so component always has expected shape
      setEducationOptions({
        levels: data?.levels ?? [],
        boardsUniversities: data?.boardsUniversities ?? [],
        degreeOptions: data?.degreeOptions ?? {},
        specializationOptions: data?.specializationOptions ?? {}
      });
    } catch (err) {
      console.error('Failed to load education options:', err);
    } finally {
      setOptionsLoading(false);
    }
  };
  fetchOptions();
}, []);


  // Helper functions from backend
  const getDegreeOptions = (level) => educationOptions.degreeOptions[level] || [];
  const getSpecializationOptions = (level) => educationOptions.specializationOptions[level] || [];
  
  const shouldShowSpecialization = (level) => {
    return ['bachelor', 'master', 'mphil', 'phd'].includes(level);
  };

  const getFieldLabel = (level) => {
    if (level === 'ssc' || level === 'hsc') return 'Group/Field';
    if (level === 'olevel' || level === 'alevel') return 'Subject Group';
    return 'Degree Name';
  };

  const getSpecializationLabel = (level) => {
    if (level === 'bachelor' || level === 'master') return 'Major/Specialization';
    if (level === 'mphil' || level === 'phd') return 'Research Area';
    return 'Specialization';
  };

  const getInstitutionFieldType = (level) => {
    if (level === 'ssc' || level === 'olevel') return 'school';
    if (level === 'hsc' || level === 'alevel') return 'college';
    if (level === 'diploma' || level === 'certification') return 'institute';
    if (['bachelor', 'master', 'mphil', 'phd', 'associate'].includes(level)) return 'university';
    return 'board';
  };

  const getFilteredBoards = (level) => {
    const boards = educationOptions.boardsUniversities;
    
    if (level === 'ssc' || level === 'hsc') {
      return boards.filter(b => b.type === 'board' && !['cambridge', 'edexcel'].includes(b.value));
    }
    if (level === 'olevel' || level === 'alevel') {
      return boards.filter(b => ['cambridge', 'edexcel', 'custom'].includes(b.value));
    }
    if (['bachelor', 'master', 'mphil', 'phd', 'associate'].includes(level)) {
      return boards.filter(b => b.type === 'university' || b.value === 'custom');
    }
    return boards;
  };

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedEducation, setSelectedEducation] = useState(null);
  const [formData, setFormData] = useState({
    level: "",
    degree: "",
    specialization: "",
    institution: "",
    boardUniversity: "",
    customInstitution: "",
    location: "",
    startDate: "",
    endDate: "",
    description: "",
    grade: "",
    isPresent: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Rest of the component code remains the same...
  // (handleOpenAddModal, handleOpenEditModal, handleSubmitAdd, etc.)

  const handleOpenAddModal = () => {
    setFormData({
      level: "",
      degree: "",
      specialization: "",
      institution: "",
      boardUniversity: "",
      customInstitution: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
      grade: "",
      isPresent: false
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (education) => {
    setSelectedEducation(education);
    setFormData({
      level: education.level,
      degree: education.degree,
      specialization: education.specialization || "",
      institution: "",
      boardUniversity: education.board || education.university || "",
      customInstitution: education.customInstitution || "",
      location: education.location || "",
      startDate: education.startDate,
      endDate: education.endDate || "",
      description: education.description || "",
      grade: education.grade || "",
      isPresent: education.isPresent
    });
    setIsEditModalOpen(true);
  };

  const handleOpenDeleteDialog = (education) => {
    setSelectedEducation(education);
    setIsDeleteDialogOpen(true);
  };

  const handleSubmitAdd = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const dataToSubmit = {
        level: formData.level,
        degree: formData.degree,
        specialization: formData.specialization,
        location: formData.location,
        startDate: formData.startDate,
        endDate: formData.isPresent ? null : formData.endDate,
        isPresent: formData.isPresent,
        grade: formData.grade,
        description: formData.description
      };

      // Add institution fields based on level
      const institutionType = getInstitutionFieldType(formData.level);
      if (formData.boardUniversity === 'custom') {
        dataToSubmit.customInstitution = formData.customInstitution;
      } else {
        if (institutionType === 'school') {
          const schoolOption = educationOptions.boardsUniversities.find(b => b.value === formData.boardUniversity);
          dataToSubmit.school = schoolOption?.label || formData.boardUniversity;
        } else if (institutionType === 'college') {
          const collegeOption = educationOptions.boardsUniversities.find(b => b.value === formData.boardUniversity);
          dataToSubmit.college = collegeOption?.label || formData.boardUniversity;
        } else if (institutionType === 'institute') {
          const instituteOption = educationOptions.boardsUniversities.find(b => b.value === formData.boardUniversity);
          dataToSubmit.institute = instituteOption?.label || formData.boardUniversity;
        } else if (institutionType === 'university') {
          const universityOption = educationOptions.boardsUniversities.find(b => b.value === formData.boardUniversity);
          dataToSubmit.university = universityOption?.label || formData.boardUniversity;
        }
      }

      // Add board for SSC/HSC
      if (formData.level === 'ssc' || formData.level === 'hsc') {
        const boardOption = educationOptions.boardsUniversities.find(b => b.value === formData.boardUniversity);
        dataToSubmit.board = boardOption?.label || formData.boardUniversity;
      }

      await createEducationAPI(dataToSubmit);
      setIsAddModalOpen(false);
      setFormData({
        level: "",
        degree: "",
        specialization: "",
        institution: "",
        boardUniversity: "",
        customInstitution: "",
        location: "",
        startDate: "",
        endDate: "",
        description: "",
        grade: "",
        isPresent: false
      });
    } catch (err) {
      console.error("Error creating education:", err);
      alert(err.response?.data?.message || "Failed to create education entry");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const dataToSubmit = {
        level: formData.level,
        degree: formData.degree,
        specialization: formData.specialization,
        location: formData.location,
        startDate: formData.startDate,
        endDate: formData.isPresent ? null : formData.endDate,
        isPresent: formData.isPresent,
        grade: formData.grade,
        description: formData.description
      };

      // Add institution fields based on level
      const institutionType = getInstitutionFieldType(formData.level);
      if (formData.boardUniversity === 'custom') {
        dataToSubmit.customInstitution = formData.customInstitution;
      } else {
        if (institutionType === 'school') {
          const schoolOption = educationOptions.boardsUniversities.find(b => b.value === formData.boardUniversity);
          dataToSubmit.school = schoolOption?.label || formData.boardUniversity;
        } else if (institutionType === 'college') {
          const collegeOption = educationOptions.boardsUniversities.find(b => b.value === formData.boardUniversity);
          dataToSubmit.college = collegeOption?.label || formData.boardUniversity;
        } else if (institutionType === 'institute') {
          const instituteOption = educationOptions.boardsUniversities.find(b => b.value === formData.boardUniversity);
          dataToSubmit.institute = instituteOption?.label || formData.boardUniversity;
        } else if (institutionType === 'university') {
          const universityOption = educationOptions.boardsUniversities.find(b => b.value === formData.boardUniversity);
          dataToSubmit.university = universityOption?.label || formData.boardUniversity;
        }
      }

      // Add board for SSC/HSC
      if (formData.level === 'ssc' || formData.level === 'hsc') {
        const boardOption = educationOptions.boardsUniversities.find(b => b.value === formData.boardUniversity);
        dataToSubmit.board = boardOption?.label || formData.boardUniversity;
      }

      await updateEducationAPI(selectedEducation._id, dataToSubmit);
      setIsEditModalOpen(false);
    } catch (err) {
      console.error("Error updating education:", err);
      alert(err.response?.data?.message || "Failed to update education entry");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteEducationAPI(selectedEducation._id);
      setIsDeleteDialogOpen(false);
      setSelectedEducation(null);
    } catch (err) {
      console.error("Error deleting education:", err);
      alert(err.response?.data?.message || "Failed to delete education entry");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const [year, month] = dateString.split('-');
    return `${month}/${year}`;
  };

  const getLevelBadgeColor = (level) => {
    const colors = {
      ssc: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      hsc: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      bachelor: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      master: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
      phd: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      default: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
    };
    return colors[level] || colors.default;
  };

  if (loading || optionsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader variant="spinner" size="default" text="Loading education data..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-red-900/20 text-red-200' : 'bg-red-100 text-red-800'}`}>
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-6 `}>
      {/* Header */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Education Management</h1>
          <p className={`mt-2 ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
            Manage your educational background
          </p>
        </div>
        <Button 
          onClick={handleOpenAddModal}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <FiPlus className="mr-2" size={20} />
          Add Education
        </Button>
      </div>

      {/* Education List */}
      <div className="grid gap-6">
        {education.length === 0 ? (
          <div className={`text-center py-12 ${isDarkMode ? 'bg-neutral-800' : 'bg-white'} rounded-lg shadow`}>
            <FiBookOpen className="mx-auto h-12 w-12 text-neutral-400" />
            <h3 className="mt-2 text-sm font-medium">No education entries</h3>
            <p className="mt-1 text-sm text-neutral-500">Get started by adding your first education entry.</p>
          </div>
        ) : (
          education.map((edu) => (
            <div
              key={edu._id}
              className={`p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-neutral-800' : 'bg-white'}`}
            >
              {/* Education card content - keep existing JSX */}
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelBadgeColor(edu.level)}`}>
                      {educationOptions.levels.find(l => l.value === edu.level)?.label || edu.level}
                    </span>
                    {edu.grade && (
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${isDarkMode ? 'bg-yellow-900 text-yellow-200' : 'bg-yellow-100 text-yellow-800'}`}>
                        <FiAward className="inline mr-1" size={12} />
                        Grade: {edu.grade}
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-1">{edu.degree}</h3>
                  {edu.specialization && (
                    <p className={`text-sm ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'} mb-2`}>
                      {edu.specialization}
                    </p>
                  )}
                  
                  <p className={`text-sm ${isDarkMode ? 'text-neutral-300' : 'text-neutral-700'} font-medium`}>
                    {edu.school || edu.college || edu.institute || edu.university || edu.customInstitution}
                  </p>
                  
                  {(edu.board || edu.location) && (
                    <div className="flex gap-4 mt-2">
                      {edu.board && (
                        <p className={`text-sm ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                          Board: {edu.board}
                        </p>
                      )}
                      {edu.location && (
                        <p className={`text-sm flex items-center ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                          <FiMapPin className="mr-1" size={14} />
                          {edu.location}
                        </p>
                      )}
                    </div>
                  )}
                  
                  <p className={`text-sm flex items-center mt-2 ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                    <FiCalendar className="mr-2" size={14} />
                    {formatDate(edu.startDate)} - {edu.isPresent ? 'Present' : formatDate(edu.endDate)}
                  </p>
                  
                  {edu.description && (
                    <p className={`text-sm mt-3 ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                      {edu.description}
                    </p>
                  )}
                </div>
                
                <div className="flex gap-2 ml-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleOpenEditModal(edu)}
                    className={isDarkMode ? 'hover:bg-neutral-400' : 'hover:bg-gray-500'}
                  >
                    <FiEdit2 size={18} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleOpenDeleteDialog(edu)}
                    className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <FiTrash2 size={18} />
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Education Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className={`max-w-3xl max-h-[90vh] overflow-y-auto ${
          isDarkMode
            ? 'bg-neutral-900 border border-neutral-800 text-white'
            : 'bg-white border border-neutral-200 text-neutral-900'
        }`}>
          <DialogHeader>
            <DialogTitle className={isDarkMode ? 'text-white' : 'text-neutral-900'}>
              Add Education
            </DialogTitle>
            <DialogDescription>
              Add a new education entry to your profile
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitAdd} className="space-y-4">
            {/* Education Level */}
            <div>
              <Label htmlFor="level">Education Level *</Label>
              <Select value={formData.level} onValueChange={(value) => setFormData({ ...formData, level: value, degree: "", specialization: "" })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select education level" />
                </SelectTrigger>
                <SelectContent className={`max-h-[300px] overflow-y-auto ${isDarkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-white'}`}>
                  {educationOptions.levels.map((level) => (
                    <SelectItem key={level.value} value={level.value} className={isDarkMode ? 'text-white' : 'text-neutral-900'}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Degree/Group */}
            {formData.level && (
              <div>
                <Label htmlFor="degree">{getFieldLabel(formData.level)} *</Label>
                <Select value={formData.degree} onValueChange={(value) => setFormData({ ...formData, degree: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder={`Select ${getFieldLabel(formData.level).toLowerCase()}`} />
                  </SelectTrigger>
                  <SelectContent className={`max-h-[300px] overflow-y-auto ${isDarkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-white'}`}>
                    {getDegreeOptions(formData.level).map((degree) => (
                      <SelectItem key={degree} value={degree} className={isDarkMode ? 'text-white' : 'text-neutral-900'}>
                        {degree}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Specialization */}
            {shouldShowSpecialization(formData.level) && (
              <div>
                <Label htmlFor="specialization">{getSpecializationLabel(formData.level)}</Label>
                <Select value={formData.specialization} onValueChange={(value) => setFormData({ ...formData, specialization: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder={`Select ${getSpecializationLabel(formData.level).toLowerCase()}`} />
                  </SelectTrigger>
                  <SelectContent className={`max-h-[300px] overflow-y-auto ${isDarkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-white'}`}>
                    {getSpecializationOptions(formData.level).map((spec) => (
                      <SelectItem key={spec} value={spec} className={isDarkMode ? 'text-white' : 'text-neutral-900'}>
                        {spec}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Board/University */}
            {formData.level && (
              <div>
                <Label htmlFor="boardUniversity">
                  {getInstitutionFieldType(formData.level) === 'school' ? 'School' : 
                   getInstitutionFieldType(formData.level) === 'college' ? 'College' :
                   getInstitutionFieldType(formData.level) === 'institute' ? 'Institute' : 'University'}
                </Label>
                <Select value={formData.boardUniversity} onValueChange={(value) => setFormData({ ...formData, boardUniversity: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select institution" />
                  </SelectTrigger>
                  <SelectContent className={`max-h-[300px] overflow-y-auto ${isDarkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-white'}`}>
                    {getFilteredBoards(formData.level).map((board) => (
                      <SelectItem key={board.value} value={board.value} className={isDarkMode ? 'text-white' : 'text-neutral-900'}>
                        {board.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Custom Institution */}
            {formData.boardUniversity === 'custom' && (
              <div>
                <Label htmlFor="customInstitution">Institution Name *</Label>
                <Input
                  id="customInstitution"
                  value={formData.customInstitution}
                  onChange={(e) => setFormData({ ...formData, customInstitution: e.target.value })}
                  required
                />
              </div>
            )}

            {/* Location */}
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="City, Country"
              />
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate">Start Date *</Label>
                <Input
                  id="startDate"
                  type="month"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="month"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  disabled={formData.isPresent}
                />
              </div>
            </div>

            {/* Currently Studying */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isPresent"
                checked={formData.isPresent}
                onCheckedChange={(checked) => setFormData({ ...formData, isPresent: checked, endDate: checked ? "" : formData.endDate })}
              />
              <Label htmlFor="isPresent" className="cursor-pointer">
                Currently studying here
              </Label>
            </div>

            {/* Grade */}
            <div>
              <Label htmlFor="grade">Grade/CGPA</Label>
              <Input
                id="grade"
                value={formData.grade}
                onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                placeholder="e.g., A+, 3.8/4.0"
              />
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Additional details, achievements, etc."
                rows={3}
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="destructive"
                onClick={() => setIsAddModalOpen(false)}
                disabled={isSubmitting}
              >
                <FiX className="mr-2" size={16} />
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Adding...
                  </>
                ) : (
                  <>
                    <FiSave size={16} className="mr-2" />
                    Add Education
                  </>
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Education Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className={`max-w-3xl max-h-[90vh] overflow-y-auto ${
          isDarkMode
            ? 'bg-neutral-900 border border-neutral-800 text-white'
            : 'bg-white border border-neutral-200 text-neutral-900'
        }`}>
          <DialogHeader>
            <DialogTitle className={isDarkMode ? 'text-white' : 'text-neutral-900'}>
              Edit Education
            </DialogTitle>
            <DialogDescription>
              Update education entry details
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitEdit} className="space-y-4">
            {/* Same fields as Add Modal */}
            <div>
              <Label htmlFor="edit-level">Education Level *</Label>
              <Select value={formData.level} onValueChange={(value) => setFormData({ ...formData, level: value, degree: "", specialization: "" })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select education level" />
                </SelectTrigger>
                <SelectContent className={`max-h-[300px] overflow-y-auto ${isDarkMode ? 'bg-neutral-800 border border-neutral-700 text-white' : 'bg-white border border-neutral-200 text-neutral-900'}`}>
                  {educationOptions.levels.map((level) => (
                    <SelectItem key={level.value} value={level.value} className={isDarkMode ? 'text-white' : 'text-neutral-900'}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {formData.level && (
              <div>
                <Label htmlFor="edit-degree">{getFieldLabel(formData.level)} *</Label>
                <Select value={formData.degree} onValueChange={(value) => setFormData({ ...formData, degree: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder={`Select ${getFieldLabel(formData.level).toLowerCase()}`} />
                  </SelectTrigger>
                  <SelectContent className={`max-h-[300px] overflow-y-auto ${isDarkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-white'}`}>
                    {getDegreeOptions(formData.level).map((degree) => (
                      <SelectItem key={degree} value={degree} className={isDarkMode ? 'text-white' : 'text-neutral-900'}>
                        {degree}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {shouldShowSpecialization(formData.level) && (
              <div>
                <Label htmlFor="edit-specialization">{getSpecializationLabel(formData.level)}</Label>
                <Select value={formData.specialization} onValueChange={(value) => setFormData({ ...formData, specialization: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder={`Select ${getSpecializationLabel(formData.level).toLowerCase()}`} />
                  </SelectTrigger>
                  <SelectContent className={`max-h-[300px] overflow-y-auto ${isDarkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-white'}`}>
                    {getSpecializationOptions(formData.level).map((spec) => (
                      <SelectItem key={spec} value={spec} className={isDarkMode ? 'text-white' : 'text-neutral-900'}>
                        {spec}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {formData.level && (
              <div>
                <Label htmlFor="edit-boardUniversity">
                  {getInstitutionFieldType(formData.level) === 'school' ? 'School' : 
                   getInstitutionFieldType(formData.level) === 'college' ? 'College' :
                   getInstitutionFieldType(formData.level) === 'institute' ? 'Institute' : 'University'}
                </Label>
                <Select value={formData.boardUniversity} onValueChange={(value) => setFormData({ ...formData, boardUniversity: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select institution" />
                  </SelectTrigger>
                  <SelectContent className={`max-h-[300px] overflow-y-auto ${isDarkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-white'}`}>
                    {getFilteredBoards(formData.level).map((board) => (
                      <SelectItem key={board.value} value={board.value} className={isDarkMode ? 'text-white' : 'text-neutral-900'}>
                        {board.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {formData.boardUniversity === 'custom' && (
              <div>
                <Label htmlFor="edit-customInstitution">Institution Name *</Label>
                <Input
                  id="edit-customInstitution"
                  value={formData.customInstitution}
                  onChange={(e) => setFormData({ ...formData, customInstitution: e.target.value })}
                  required
                />
              </div>
            )}

            <div>
              <Label htmlFor="edit-location">Location</Label>
              <Input
                id="edit-location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="City, Country"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-startDate">Start Date *</Label>
                <Input
                  id="edit-startDate"
                  type="month"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="edit-endDate">End Date</Label>
                <Input
                  id="edit-endDate"
                  type="month"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  disabled={formData.isPresent}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="edit-isPresent"
                checked={formData.isPresent}
                onCheckedChange={(checked) => setFormData({ ...formData, isPresent: checked, endDate: checked ? "" : formData.endDate })}
              />
              <Label htmlFor="edit-isPresent" className="cursor-pointer">
                Currently studying here
              </Label>
            </div>

            <div>
              <Label htmlFor="edit-grade">Grade/CGPA</Label>
              <Input
                id="edit-grade"
                value={formData.grade}
                onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                placeholder="e.g., A+, 3.8/4.0"
              />
            </div>

            <div>
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Additional details, achievements, etc."
                rows={3}
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="destructive"
                onClick={() => setIsEditModalOpen(false)}
                disabled={isSubmitting}
              >
                <FiX className="mr-2" size={16} />
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Updating...
                  </>
                ) : (
                  <>
                    <FiSave size={16} className="mr-2" />
                    Update Education
                  </>
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className={
          isDarkMode
            ? 'bg-neutral-900 border border-neutral-800 text-white'
            : 'bg-white border border-neutral-200 text-neutral-900'
        }>
          <DialogHeader>
            <DialogTitle className={isDarkMode ? 'text-white' : 'text-neutral-900'}>
              Delete Education Entry
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this education entry? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Education;
