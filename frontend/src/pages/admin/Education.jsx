import React, { useState, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useEducation } from '../../hooks/usePortfolio';
import { getEducationOptions, uploadImage } from '../../api/portfolioApi';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../Components/ui/dialog";
import { Button } from "../../Components/ui/button";
import { Input } from "../../Components/ui/input";
import { Label } from "../../Components/ui/label";
import { Textarea } from "../../Components/ui/textarea";
import { Checkbox } from "../../Components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../Components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "../../Components/ui/avatar";
import Loader from "../../Components/common/Loader.jsx";
import { FiPlus, FiEdit2, FiTrash2, FiSave, FiX, FiBookOpen, FiCalendar, FiMapPin, FiAward, FiLink, FiUpload } from 'react-icons/fi';

/*
  EducationForm MOVED OUTSIDE the parent component and memoized.
  This keeps the component reference stable so React updates props
  without unmounting/remounting the form on every keystroke.
*/
const EducationForm = React.memo((props) => {
  const {
    formData,
    setFormData,
    onSubmit,
    isEdit = false,
    educationOptions,
    getDegreeOptions,
    getSpecializationOptions,
    shouldShowSpecialization,
    needsManualInstitutionInput,
    getFieldLabel,
    getSpecializationLabel,
    getInstitutionFieldType,
    getFilteredBoards,
    logoUploading,
    logoUploadError,
    handleLogoFileChange,
    isSubmitting,
    setIsAddModalOpen,
    setIsEditModalOpen,
    isDarkMode,
    filteredInstitutions,
    filteredInstitutionsLoading,
    filteredInstitutionsError,
  } = props;

  if (!formData) return null;

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* Education Level */}
      <div>
        <Label htmlFor={`${isEdit ? 'edit-' : ''}level`}>Education Level *</Label>
        <Select
          value={formData.level}
          onValueChange={(value) => setFormData({
            ...formData,
            level: value,
            degree: "",
            specialization: "",
            boardUniversity: ""
          })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select education level" />
          </SelectTrigger>
          <SelectContent className={`max-h-[300px] overflow-y-auto ${isDarkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-white'}`}>
            {educationOptions.levels.map((level) => (
              <SelectItem key={level.value} value={level.value}>
                {level.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Education Status */}
      <div>
        <Label htmlFor={`${isEdit ? 'edit-' : ''}educationStatus`}>Education Status *</Label>
        <Select value={formData.educationStatus} onValueChange={(value) => setFormData({ ...formData, educationStatus: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select education status" />
          </SelectTrigger>
          <SelectContent className={`max-h-[300px] overflow-y-auto ${isDarkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-white'}`}>
            {educationOptions.educationStatusOptions.map((status) => (
              <SelectItem key={status.value} value={status.value}>
                {status.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Degree/Group */}
      {formData.level && (
        <div>
          <Label htmlFor={`${isEdit ? 'edit-' : ''}degree`}>{getFieldLabel(formData.level)} *</Label>
          <Select value={formData.degree} onValueChange={(value) => setFormData({ ...formData, degree: value })}>
            <SelectTrigger>
              <SelectValue placeholder={`Select ${getFieldLabel(formData.level).toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent className={`max-h-[300px] overflow-y-auto ${isDarkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-white'}`}>
              {getDegreeOptions(formData.level).map((degree) => (
                <SelectItem key={degree} value={degree}>
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
          <Label htmlFor={`${isEdit ? 'edit-' : ''}specialization`}>{getSpecializationLabel(formData.level)}</Label>
          <Select value={formData.specialization} onValueChange={(value) => setFormData({ ...formData, specialization: value })}>
            <SelectTrigger>
              <SelectValue placeholder={`Select ${getSpecializationLabel(formData.level).toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent className={`max-h-[300px] overflow-y-auto ${isDarkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-white'}`}>
              {getSpecializationOptions(formData.level).map((spec) => (
                <SelectItem key={spec} value={spec}>
                  {spec}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Board/University */}
      {formData.level && !needsManualInstitutionInput(formData.level) && (
        <div>
          <Label htmlFor={`${isEdit ? 'edit-' : ''}boardUniversity`}>
            {getInstitutionFieldType(formData.level) === 'institute' ? 'Institute' : 'University'} *
          </Label>
          <Select value={formData.boardUniversity} onValueChange={(value) => setFormData({ ...formData, boardUniversity: value, customInstitution: '' })}>
            <SelectTrigger disabled={filteredInstitutionsLoading}>
              <SelectValue placeholder={filteredInstitutionsLoading ? "Loading institutions..." : "Select institution"} />
            </SelectTrigger>
            <SelectContent className={`max-h-[300px] overflow-y-auto ${isDarkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-white'}`}>
              {filteredInstitutionsError && (
                <SelectItem value="error" disabled>
                  {filteredInstitutionsError}
                </SelectItem>
              )}
              {!filteredInstitutionsLoading && filteredInstitutions.length === 0 && !filteredInstitutionsError && (
                <SelectItem value="no-results" disabled>
                  No institutions found for selected criteria
                </SelectItem>
              )}
              {filteredInstitutions.map((institutionName) => (
                <SelectItem key={institutionName} value={institutionName}>
                  {institutionName}
                </SelectItem>
              ))}
              <SelectItem value="custom">Other Institution</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Board Selection for SSC/HSC/O-Level/A-Level */}
      {formData.level && needsManualInstitutionInput(formData.level) && (
        <div>
          <Label htmlFor={`${isEdit ? 'edit-' : ''}boardUniversity`}>Board *</Label>
          <Select value={formData.boardUniversity} onValueChange={(value) => setFormData({ ...formData, boardUniversity: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select board" />
            </SelectTrigger>
            <SelectContent className={`max-h-[300px] overflow-y-auto ${isDarkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-white'}`}>
              {getFilteredBoards(formData.level).map((board) => (
                <SelectItem key={board.value} value={board.value}>
                  {board.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* School Name / College Name */}
      {formData.level && (formData.level === 'ssc' || formData.level === 'olevel') && (
        <div>
          <Label htmlFor={`${isEdit ? 'edit-' : ''}schoolName`}>School Name *</Label>
          <Input
            id={`${isEdit ? 'edit-' : ''}schoolName`}
            value={formData.schoolName}
            onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
            required
            placeholder="Enter your school name"
          />
        </div>
      )}

      {formData.level && (formData.level === 'hsc' || formData.level === 'alevel') && (
        <div>
          <Label htmlFor={`${isEdit ? 'edit-' : ''}collegeName`}>College Name *</Label>
          <Input
            id={`${isEdit ? 'edit-' : ''}collegeName`}
            value={formData.collegeName}
            onChange={(e) => setFormData({ ...formData, collegeName: e.target.value })}
            required
            placeholder="Enter your college name"
          />
        </div>
      )}

      {/* Custom Institution */}
      {formData.boardUniversity === 'custom' && (
        <div>
          <Label htmlFor={`${isEdit ? 'edit-' : ''}customInstitution`}>Institution Name *</Label>
          <Input
            id={`${isEdit ? 'edit-' : ''}customInstitution`}
            value={formData.customInstitution}
            onChange={(e) => setFormData({ ...formData, customInstitution: e.target.value })}
            required
            placeholder="Enter institution name"
          />
        </div>
      )}

      {/* Logo Upload */}
      <div>
        <Label htmlFor={`${isEdit ? 'edit-' : ''}logoUrl`}>Institution Logo</Label>
        <div className="space-y-2">
          <Input
            id={`${isEdit ? 'edit-' : ''}logoUrl`}
            type="file"
            accept="image/*"
            onChange={handleLogoFileChange}
            disabled={logoUploading}
          />
          {logoUploading && (
            <div className="flex items-center gap-2 text-sm text-blue-500">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
              <span>Uploading...</span>
            </div>
          )}
          {logoUploadError && (
            <span className="text-xs text-red-500">{logoUploadError}</span>
          )}
          {formData.logoUrl && (
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <img
                src={formData.logoUrl}
                alt="Logo Preview"
                className="h-16 w-16 object-contain border rounded"
              />
              <div className="flex-1">
                <p className="text-xs text-green-600 dark:text-green-400">Image uploaded successfully</p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setFormData({ ...formData, logoUrl: "" })}
                className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <FiX size={16} />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Location */}
      <div>
        <Label htmlFor={`${isEdit ? 'edit-' : ''}location`}>Location</Label>
        <Input
          id={`${isEdit ? 'edit-' : ''}location`}
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          placeholder="City, Country"
        />
      </div>

      {/* Dates */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor={`${isEdit ? 'edit-' : ''}startDate`}>Start Date *</Label>
          <Input
            id={`${isEdit ? 'edit-' : ''}startDate`}
            type="month"
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor={`${isEdit ? 'edit-' : ''}endDate`}>End Date</Label>
          <Input
            id={`${isEdit ? 'edit-' : ''}endDate`}
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
          id={`${isEdit ? 'edit-' : ''}isPresent`}
          checked={formData.isPresent}
          onCheckedChange={(checked) => setFormData({
            ...formData,
            isPresent: checked,
            endDate: checked ? "" : formData.endDate
          })}
        />
        <Label htmlFor={`${isEdit ? 'edit-' : ''}isPresent`} className="cursor-pointer">
          Currently studying here
        </Label>
      </div>

      {/* Grade */}
      <div>
        <Label htmlFor={`${isEdit ? 'edit-' : ''}grade`}>Grade/CGPA</Label>
        <Input
          id={`${isEdit ? 'edit-' : ''}grade`}
          value={formData.grade}
          onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
          placeholder="e.g., A+, 3.8/4.0"
        />
      </div>

      {/* Description */}
      <div>
        <Label htmlFor={`${isEdit ? 'edit-' : ''}description`}>Description</Label>
        <Textarea
          id={`${isEdit ? 'edit-' : ''}description`}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Additional details, achievements, etc."
          rows={3}
        />
      </div>

      {/* Academic Description */}
      <div>
        <Label htmlFor={`${isEdit ? 'edit-' : ''}academicDescription`}>
          Academic Description ({(formData.academicDescription || "").length}/1000)
        </Label>
        <Textarea
          id={`${isEdit ? 'edit-' : ''}academicDescription`}
          value={formData.academicDescription}
          onChange={(e) => setFormData({ ...formData, academicDescription: e.target.value })}
          placeholder="Detailed academic experiences, projects, or relevant coursework."
          rows={5}
          maxLength={1000}
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 pt-4">
        <Button
          type="button"
          variant="destructive"
          onClick={() => isEdit ? setIsEditModalOpen(false) : setIsAddModalOpen(false)}
          disabled={isSubmitting}
        >
          <FiX className="mr-2" size={16} />
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white"
          disabled={isSubmitting || logoUploading}
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              {isEdit ? 'Updating...' : 'Adding...'}
            </>
          ) : (
            <>
              <FiSave size={16} className="mr-2" />
              {isEdit ? 'Update Education' : 'Add Education'}
            </>
          )}
        </Button>
      </div>
    </form>
  );
});

/*
  Main Education component (unchanged logic, but now uses the moved EducationForm above)
*/
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


  // --- HOOKS: Place all useState at the top ---
  const [educationOptions, setEducationOptions] = useState({
    levels: [],
    boardsUniversities: [],
    degreeOptions: {},
    specializationOptions: {},
    educationStatusOptions: []
  });
  const [optionsLoading, setOptionsLoading] = useState(true);
  const [filteredInstitutions, setFilteredInstitutions] = useState([]);
  const [filteredInstitutionsLoading, setFilteredInstitutionsLoading] = useState(false);
  const [filteredInstitutionsError, setFilteredInstitutionsError] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedEducation, setSelectedEducation] = useState(null);
  const [formData, setFormData] = useState({
    level: "",
    degree: "",
    specialization: "",
    boardUniversity: "",
    customInstitution: "",
    schoolName: "",
    collegeName: "",
    location: "",
    startDate: "",
    endDate: "",
    description: "",
    grade: "",
    isPresent: false,
    logoUrl: "",
    academicDescription: "",
    educationStatus: "Planned"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [logoUploading, setLogoUploading] = useState(false);
  const [logoUploadError, setLogoUploadError] = useState("");

  // --- HELPERS: Place all helper functions after hooks ---
  const getDegreeOptions = (level) => educationOptions.degreeOptions[level] || [];
  const getSpecializationOptions = (level) => educationOptions.specializationOptions[level] || [];
  const shouldShowSpecialization = (level) => ['bachelor', 'master', 'mphil', 'phd'].includes(level);
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
      return boards.filter(b => ['cambridge', 'edexcel'].includes(b.value));
    }
    if (['bachelor', 'master', 'mphil', 'phd', 'associate'].includes(level)) {
      return boards.filter(b => b.type === 'university');
    }
    return boards;
  };
  const needsManualInstitutionInput = (level) => ['ssc', 'hsc', 'olevel', 'alevel'].includes(level);

  // --- EFFECTS: Place all useEffect after hooks and helpers ---
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await getEducationOptions();
        const data = response.data || response;
        setEducationOptions({
          levels: data?.levels ?? [],
          boardsUniversities: data?.boardsUniversities ?? [],
          degreeOptions: data?.degreeOptions ?? {},
          specializationOptions: data?.specializationOptions ?? {},
          educationStatusOptions: data?.educationStatusOptions ?? []
        });
      } catch (err) {
        console.error('Failed to load education options:', err);
      } finally {
        setOptionsLoading(false);
      }
    };
    fetchOptions();
  }, []);

  useEffect(() => {
    // Use educationOptions.boardsUniversities for dropdown, filtered by level
    if (formData.level && !needsManualInstitutionInput(formData.level)) {
      setFilteredInstitutionsLoading(true);
      setFilteredInstitutionsError(null);
      let institutions = [];
      const type = getInstitutionFieldType(formData.level);
      if (type === 'university') {
        institutions = educationOptions.boardsUniversities.filter(b => b.type === 'university').map(b => b.label);
      } else if (type === 'institute') {
        institutions = educationOptions.boardsUniversities.filter(b => b.type === 'institute').map(b => b.label);
      }
      setFilteredInstitutions(institutions);
      setFilteredInstitutionsLoading(false);
    } else {
      setFilteredInstitutions([]);
    }
  }, [formData.level, educationOptions.boardsUniversities]);

  const handleLogoFileChange = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    setLogoUploading(true);
    setLogoUploadError("");

    try {
      const uploadedUrl = await uploadImage(file);
      setFormData((prev) => ({ ...prev, logoUrl: uploadedUrl }));
    } catch (err) {
      console.error('Logo upload error:', err);
      setLogoUploadError("Failed to upload image. Please try again.");
    } finally {
      setLogoUploading(false);
    }
  };

  const handleOpenAddModal = () => {
    setFormData({
      level: "",
      degree: "",
      specialization: "",
      boardUniversity: "",
      customInstitution: "",
      schoolName: "",
      collegeName: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
      grade: "",
      isPresent: false,
      logoUrl: "",
      academicDescription: "",
      educationStatus: "Planned"
    });
    setLogoUploadError("");
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (educationItem) => {
    setSelectedEducation(educationItem);

    let preselectedBoardUniversity = "";
    if (educationItem.customInstitution) {
      preselectedBoardUniversity = "custom";
    } else if (educationItem.board) {
      const foundBoard = educationOptions.boardsUniversities.find(
        (option) => option.label === educationItem.board && option.type === 'board'
      );
      preselectedBoardUniversity = foundBoard ? foundBoard.value : "";
    } else if (educationItem.university) {
      const foundUniversity = educationOptions.boardsUniversities.find(
        (option) => option.label === educationItem.university && option.type === 'university'
      );
      preselectedBoardUniversity = foundUniversity ? foundUniversity.value : "";
    }

    setFormData({
      level: educationItem.level || "",
      degree: educationItem.degree || "",
      specialization: educationItem.specialization || "",
      boardUniversity: preselectedBoardUniversity,
      customInstitution: educationItem.customInstitution || "",
      schoolName: educationItem.school || "",
      collegeName: educationItem.college || "",
      location: educationItem.location || "",
      startDate: educationItem.startDate || "",
      endDate: educationItem.endDate || "",
      description: educationItem.description || "",
      grade: educationItem.grade || "",
      isPresent: educationItem.isPresent || false,
      logoUrl: educationItem.logoUrl || "",
      academicDescription: educationItem.academicDescription || "",
      educationStatus: educationItem.educationStatus || "Planned"
    });
    setLogoUploadError("");
    setIsEditModalOpen(true);
  };

  const handleOpenDeleteDialog = (educationItem) => {
    setSelectedEducation(educationItem);
    setIsDeleteDialogOpen(true);
  };

  const handleSubmitAdd = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const dataToSubmit = {
        level: formData.level,
        degree: formData.degree,
        specialization: formData.specialization || undefined,
        location: formData.location || undefined,
        startDate: formData.startDate,
        endDate: formData.isPresent ? null : formData.endDate,
        isPresent: formData.isPresent,
        grade: formData.grade || undefined,
        description: formData.description || undefined,
        logoUrl: formData.logoUrl === "" ? null : formData.logoUrl,
        academicDescription: formData.academicDescription || undefined,
        educationStatus: formData.educationStatus
      };

      const institutionType = getInstitutionFieldType(formData.level);

      if (formData.level === 'ssc' || formData.level === 'hsc') {
        if (formData.boardUniversity) {
          const boardOption = educationOptions.boardsUniversities.find(b => b.value === formData.boardUniversity);
          dataToSubmit.board = boardOption?.label || formData.boardUniversity;
        }
        if (formData.level === 'ssc' && formData.schoolName) {
          dataToSubmit.school = formData.schoolName;
        } else if (formData.level === 'hsc' && formData.collegeName) {
          dataToSubmit.college = formData.collegeName;
        }
      } else if (formData.level === 'olevel' || formData.level === 'alevel') {
        if (formData.boardUniversity) {
          const boardOption = educationOptions.boardsUniversities.find(b => b.value === formData.boardUniversity);
          dataToSubmit.board = boardOption?.label || formData.boardUniversity;
        }
        if (formData.level === 'olevel' && formData.schoolName) {
          dataToSubmit.school = formData.schoolName;
        } else if (formData.level === 'alevel' && formData.collegeName) {
          dataToSubmit.college = formData.collegeName;
        }
      } else if (['bachelor', 'master', 'mphil', 'phd', 'associate'].includes(formData.level)) {
        if (formData.boardUniversity === 'custom') {
          dataToSubmit.customInstitution = formData.customInstitution;
        } else if (formData.boardUniversity) {
          const universityOption = educationOptions.boardsUniversities.find(b => b.value === formData.boardUniversity);
          dataToSubmit.university = universityOption?.label || formData.boardUniversity;
        }
      } else if (institutionType === 'institute') {
        if (formData.boardUniversity === 'custom') {
          dataToSubmit.customInstitution = formData.customInstitution;
        } else if (formData.boardUniversity) {
          const instituteOption = educationOptions.boardsUniversities.find(b => b.value === formData.boardUniversity);
          dataToSubmit.institute = instituteOption?.label || formData.boardUniversity;
        }
      }

      await createEducationAPI(dataToSubmit);
      setIsAddModalOpen(false);
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
        specialization: formData.specialization || undefined,
        location: formData.location || undefined,
        startDate: formData.startDate,
        endDate: formData.isPresent ? null : formData.endDate,
        isPresent: formData.isPresent,
        grade: formData.grade || undefined,
        description: formData.description || undefined,
        logoUrl: formData.logoUrl === "" ? null : formData.logoUrl,
        academicDescription: formData.academicDescription || undefined,
        educationStatus: formData.educationStatus
      };

      const institutionType = getInstitutionFieldType(formData.level);

      if (formData.level === 'ssc' || formData.level === 'hsc') {
        if (formData.boardUniversity) {
          const boardOption = educationOptions.boardsUniversities.find(b => b.value === formData.boardUniversity);
          dataToSubmit.board = boardOption?.label || formData.boardUniversity;
        }
        if (formData.level === 'ssc' && formData.schoolName) {
          dataToSubmit.school = formData.schoolName;
        } else if (formData.level === 'hsc' && formData.collegeName) {
          dataToSubmit.college = formData.collegeName;
        }
        dataToSubmit.customInstitution = undefined;
        dataToSubmit.institute = undefined;
        dataToSubmit.university = undefined;
      } else if (formData.level === 'olevel' || formData.level === 'alevel') {
        if (formData.boardUniversity) {
          const boardOption = educationOptions.boardsUniversities.find(b => b.value === formData.boardUniversity);
          dataToSubmit.board = boardOption?.label || formData.boardUniversity;
        }
        if (formData.level === 'olevel' && formData.schoolName) {
          dataToSubmit.school = formData.schoolName;
        } else if (formData.level === 'alevel' && formData.collegeName) {
          dataToSubmit.college = formData.collegeName;
        }
        dataToSubmit.customInstitution = undefined;
        dataToSubmit.institute = undefined;
        dataToSubmit.university = undefined;
      } else if (['bachelor', 'master', 'mphil', 'phd', 'associate'].includes(formData.level)) {
        if (formData.boardUniversity === 'custom') {
          dataToSubmit.customInstitution = formData.customInstitution;
          dataToSubmit.university = undefined;
        } else if (formData.boardUniversity) {
          const universityOption = educationOptions.boardsUniversities.find(b => b.value === formData.boardUniversity);
          dataToSubmit.university = universityOption?.label || formData.boardUniversity;
          dataToSubmit.customInstitution = undefined;
        }
        dataToSubmit.school = undefined;
        dataToSubmit.college = undefined;
        dataToSubmit.board = undefined;
        dataToSubmit.institute = undefined;
      } else if (institutionType === 'institute') {
        if (formData.boardUniversity === 'custom') {
          dataToSubmit.customInstitution = formData.customInstitution;
          dataToSubmit.institute = undefined;
        } else if (formData.boardUniversity) {
          const instituteOption = educationOptions.boardsUniversities.find(b => b.value === formData.boardUniversity);
          dataToSubmit.institute = instituteOption?.label || formData.boardUniversity;
          dataToSubmit.customInstitution = undefined;
        }
        dataToSubmit.school = undefined;
        dataToSubmit.college = undefined;
        dataToSubmit.board = undefined;
        dataToSubmit.university = undefined;
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

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'Completed':
      case 'Graduated':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'InProgress':
      case 'Undergraduate':
      case 'Postgraduate':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Planned':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'DroppedOut':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
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
    <div className="min-h-screen p-6">
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
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {edu.logoUrl && (
                      <Avatar className="h-10 w-10 border-2 border-primary-500/50">
                        <AvatarImage src={edu.logoUrl} alt={`${edu.institution} logo`} />
                        <AvatarFallback>{(edu.school || edu.college || edu.university || 'ED').charAt(0)}</AvatarFallback>
                      </Avatar>
                    )}
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelBadgeColor(edu.level)}`}>
                      {educationOptions.levels.find(l => l.value === edu.level)?.label || edu.level}
                    </span>
                    {edu.educationStatus && (
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(edu.educationStatus)}`}>
                        {educationOptions.educationStatusOptions.find(s => s.value === edu.educationStatus)?.label || edu.educationStatus}
                      </span>
                    )}
                    {edu.grade && (
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${isDarkMode ? 'bg-yellow-900 text-yellow-200' : 'bg-yellow-100 text-yellow-800'}`}>
                        <FiAward className="inline mr-1" size={12} />
                        Grade: {edu.grade}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-semibold mb-1">{edu.degree}</h3>
                  {edu.specialization && (
                    <p className={`text-sm ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'} mb-2`}>{edu.specialization}</p>
                  )}

                  <p className={`text-sm ${isDarkMode ? 'text-neutral-300' : 'text-neutral-700'} font-medium`}>
                    {edu.school || edu.college || edu.institute || edu.university || edu.customInstitution}
                  </p>

                  {(edu.board || edu.location) && (
                    <div className="flex gap-4 mt-2">
                      {edu.board && (
                        <p className={`text-sm ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>Board: {edu.board}</p>
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
                    <p className={`text-sm mt-3 ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>{edu.description}</p>
                  )}

                  {edu.academicDescription && (
                    <div className={`text-sm mt-3 p-3 rounded-md ${isDarkMode ? 'bg-neutral-700 text-neutral-300' : 'bg-neutral-100 text-neutral-700'}`}>
                      <h4 className="font-semibold mb-1">Academic Details:</h4>
                      <p>{edu.academicDescription}</p>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 ml-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleOpenEditModal(edu)}
                    className={isDarkMode ? 'hover:bg-neutral-400' : 'hover:bg-gray-600'}
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
        <DialogContent className={`max-w-3xl max-h-[90vh] overflow-y-auto ${isDarkMode ? 'bg-neutral-900 border border-neutral-800 text-white' : 'bg-white border border-neutral-200 text-neutral-900'}`}>
          <DialogHeader>
            <DialogTitle className={isDarkMode ? 'text-white' : 'text-neutral-900'}>Add Education</DialogTitle>
            <DialogDescription>Add a new education entry to your profile</DialogDescription>
          </DialogHeader>
          {formData && (
            <EducationForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmitAdd}
              isEdit={false}
              educationOptions={educationOptions}
              getDegreeOptions={getDegreeOptions}
              getSpecializationOptions={getSpecializationOptions}
              shouldShowSpecialization={shouldShowSpecialization}
              needsManualInstitutionInput={needsManualInstitutionInput}
              getFieldLabel={getFieldLabel}
              getSpecializationLabel={getSpecializationLabel}
              getInstitutionFieldType={getInstitutionFieldType}
              getFilteredBoards={getFilteredBoards}
              logoUploading={logoUploading}
              logoUploadError={logoUploadError}
              handleLogoFileChange={handleLogoFileChange}
              isSubmitting={isSubmitting}
              setIsAddModalOpen={setIsAddModalOpen}
              setIsEditModalOpen={setIsEditModalOpen}
              isDarkMode={isDarkMode}
              filteredInstitutions={filteredInstitutions}
              filteredInstitutionsLoading={filteredInstitutionsLoading}
              filteredInstitutionsError={filteredInstitutionsError}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Education Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className={`max-w-3xl max-h-[90vh] overflow-y-auto ${isDarkMode ? 'bg-neutral-900 border border-neutral-800 text-white' : 'bg-white border border-neutral-200 text-neutral-900'}`}>
          <DialogHeader>
            <DialogTitle className={isDarkMode ? 'text-white' : 'text-neutral-900'}>Edit Education</DialogTitle>
            <DialogDescription>Update education entry details</DialogDescription>
          </DialogHeader>
          {formData && (
            <EducationForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmitEdit}
              isEdit={true}
              educationOptions={educationOptions}
              getDegreeOptions={getDegreeOptions}
              getSpecializationOptions={getSpecializationOptions}
              shouldShowSpecialization={shouldShowSpecialization}
              needsManualInstitutionInput={needsManualInstitutionInput}
              getFieldLabel={getFieldLabel}
              getSpecializationLabel={getSpecializationLabel}
              getInstitutionFieldType={getInstitutionFieldType}
              getFilteredBoards={getFilteredBoards}
              logoUploading={logoUploading}
              logoUploadError={logoUploadError}
              handleLogoFileChange={handleLogoFileChange}
              isSubmitting={isSubmitting}
              setIsAddModalOpen={setIsAddModalOpen}
              setIsEditModalOpen={setIsEditModalOpen}
              isDarkMode={isDarkMode}
              filteredInstitutions={filteredInstitutions}
              filteredInstitutionsLoading={filteredInstitutionsLoading}
              filteredInstitutionsError={filteredInstitutionsError}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className={isDarkMode ? 'bg-neutral-900 border border-neutral-800 text-white' : 'bg-white border border-neutral-200 text-neutral-900'}>
          <DialogHeader>
            <DialogTitle className={isDarkMode ? 'text-white' : 'text-neutral-900'}>Delete Education Entry</DialogTitle>
            <DialogDescription>Are you sure you want to delete this education entry? This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="destructive" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white">Delete</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Education;
