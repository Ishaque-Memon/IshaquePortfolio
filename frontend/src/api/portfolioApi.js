import axiosInstance from './axiosConfig';

/**
 * Portfolio API - All portfolio-related API calls
 */

// ==================== PERSONAL INFO ====================
export const getPersonalInfo = async () => {
  const response = await axiosInstance.get('/about/info');
  return response.data;
};

export const updatePersonalInfo = async (data) => {
  const response = await axiosInstance.put('/about/info', data);
  return response.data;
};

// ==================== STATS ====================
export const getStats = async () => {
  const response = await axiosInstance.get('/about/stats');
  return response.data;
};

export const updateStats = async (stats) => {
  const response = await axiosInstance.put('/about/stats', stats);
  return response.data;
};

// ==================== SKILLS ====================
export const getAllSkills = async () => {
  const response = await axiosInstance.get('/skills');
  return response.data;
};

export const getSkillById = async (id) => {
  const response = await axiosInstance.get(`/skills/${id}`);
  return response.data;
};

export const createSkill = async (skillData) => {
  const response = await axiosInstance.post('/skills', skillData);
  return response.data;
};

export const updateSkill = async (id, skillData) => {
  const response = await axiosInstance.put(`/skills/${id}`, skillData);
  return response.data;
};

export const deleteSkill = async (id) => {
  const response = await axiosInstance.delete(`/skills/${id}`);
  return response.data;
};

// ==================== PROJECTS ====================
export const getAllProjects = async () => {
  const response = await axiosInstance.get('/projects');
  return response.data;
};

export const getProjectById = async (id) => {
  const response = await axiosInstance.get(`/projects/${id}`);
  return response.data;
};

export const createProject = async (projectData) => {
  const response = await axiosInstance.post('/projects', projectData);
  return response.data;
};

export const updateProject = async (id, projectData) => {
  const response = await axiosInstance.put(`/projects/${id}`, projectData);
  return response.data;
};

export const deleteProject = async (id) => {
  const response = await axiosInstance.delete(`/projects/${id}`);
  return response.data;
};

// ==================== CERTIFICATES ====================
export const getAllCertificates = async () => {
  const response = await axiosInstance.get('/certificates');
  return response.data;
};

export const getCertificateById = async (id) => {
  const response = await axiosInstance.get(`/certificates/${id}`);
  return response.data;
};

export const createCertificate = async (certificateData) => {
  const response = await axiosInstance.post('/certificates', certificateData);
  return response.data;
};

export const updateCertificate = async (id, certificateData) => {
  const response = await axiosInstance.put(`/certificates/${id}`, certificateData);
  return response.data;
};

export const deleteCertificate = async (id) => {
  const response = await axiosInstance.delete(`/certificates/${id}`);
  return response.data;
};

// ==================== CONTACT ====================
export const getContactInfo = async () => {
  const response = await axiosInstance.get('/contact/info');
  return response.data;
};

export const updateContactInfo = async (data) => {
  const response = await axiosInstance.put('/contact/info', data);
  return response.data;
};

export const submitContactForm = async (formData) => {
  const response = await axiosInstance.post('/contact/submit', formData);
  return response.data;
};

export const getAllMessages = async () => {
  const response = await axiosInstance.get('/contact/messages');
  return response.data;
};

export const markMessageAsRead = async (id) => {
  const response = await axiosInstance.patch(`/contact/messages/${id}/read`);
  return response.data;
};

export const deleteMessage = async (id) => {
  const response = await axiosInstance.delete(`/contact/messages/${id}`);
  return response.data;
};

// ==================== FILE UPLOAD ====================
export const uploadFile = async (file, folder = 'general') => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('folder', folder);

  const response = await axiosInstance.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

export default {
  // Personal Info
  getPersonalInfo,
  updatePersonalInfo,
  
  // Stats
  getStats,
  updateStats,
  
  // Skills
  getAllSkills,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkill,
  
  // Projects
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  
  // Certificates
  getAllCertificates,
  getCertificateById,
  createCertificate,
  updateCertificate,
  deleteCertificate,
  
  // Contact
  getContactInfo,
  updateContactInfo,
  submitContactForm,
  getAllMessages,
  markMessageAsRead,
  deleteMessage,
  
  // File Upload
  uploadFile
};
