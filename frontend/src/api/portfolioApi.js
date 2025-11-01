// portfolioApi.js
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }
    return config;
  },
  (error) => Promise.reject(error)
);
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401 && !error.config.url.includes('/admin/login')) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('tokenExpiry');
        localStorage.removeItem('userData');
        window.location.href = '/login';
      }
      
      if (error.response.status === 403) {
        const message = error.response.data?.message || 'Access denied';
        console.error('[403 Forbidden]:', message);
        
        if (message.includes('IP not allowed') || message.includes('Access denied: IP')) {
          console.error('IP Restriction Error - Your IP may have changed or is not in the allowlist');
        }
      }
  // ...removed console.error('API Error:', error.response.data);
    } else if (error.request) {
  // ...removed console.error('Network Error:', error.request);
    } else {
  // ...removed console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

/**
 * Portfolio API - All portfolio-related API calls
 */

// ==================== PERSONAL INFO ====================
export const getPersonalInfo = async () => {
  const response = await axiosInstance.get('/about');
  return response.data;
};

export const updatePersonalInfo = async (data) => {
  const response = await axiosInstance.post('/about', data);
  return response.data;
};

// ==================== STATS ====================
export const getStats = async () => {
  const response = await axiosInstance.get('/about');
  return response.data;
};

export const updateStats = async (stats) => {
  const response = await axiosInstance.patch('/about/statistics', stats);
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
  const response = await axiosInstance.post('/contact', formData);
  return response.data;
};

export const getAllMessages = async () => {
  const response = await axiosInstance.get('/contact');
  return response.data;
};

export const markMessageAsRead = async (id) => {
  const response = await axiosInstance.patch(`/contact/${id}/status`, { isRead: true });
  return response.data;
};

export const deleteMessage = async (id) => {
  const response = await axiosInstance.delete(`/contact/${id}`);
  return response.data;
};

// ==================== EDUCATION ====================
export const getEducationOptions = async () => {
  const response = await axiosInstance.get('/education/options/metadata');
  return response.data;
};

export const getAllEducation = async () => {
  const response = await axiosInstance.get('/education');
  return response.data;
};

export const getEducationById = async (id) => {
  const response = await axiosInstance.get(`/education/${id}`);
  return response.data;
};

export const createEducation = async (educationData) => {
  const response = await axiosInstance.post('/education', educationData);
  return response.data;
};

export const updateEducation = async (id, educationData) => {
  const response = await axiosInstance.put(`/education/${id}`, educationData);
  return response.data;
};

export const deleteEducation = async (id) => {
  const response = await axiosInstance.delete(`/education/${id}`);
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

// ========== IMAGE UPLOAD ========== 
/**
 * Upload an image file to the backend (or Cloudinary via backend)
 * Returns the uploaded image URL
 */
export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  // Adjust the endpoint if your backend uses a different route
  const response = await axiosInstance.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  // Expecting { url: 'https://...' }
  // ...removed console.log("API: uploadImage response data:", response.data);
  return response.data.data.url; // Corrected to access the nested URL
};

// ==================== ANALYTICS ====================
export const fetchAnalyticsSummary = async () => {
  const res = await axiosInstance.get('/analytics/summary');
  return res.data;
};

export const logVisit = async () => {
  try {
    await axiosInstance.post('/analytics/visit');
  } catch {}
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
  
  // Education
  getEducationOptions,
  getAllEducation,
  getEducationById,
  createEducation,
  updateEducation,
  deleteEducation,
  
  // File Upload
  uploadFile,
  uploadImage
};

export { axiosInstance };