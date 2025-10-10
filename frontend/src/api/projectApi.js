import axiosInstance from './axiosConfig';

// Get all projects
export const getAllProjects = async () => {
  try {
    const response = await axiosInstance.get('/projects');
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

// Get single project by ID
export const getProjectById = async (id) => {
  try {
    const response = await axiosInstance.get(`/projects/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching project:', error);
    throw error;
  }
};

// Create new project (Admin only)
export const createProject = async (projectData) => {
  try {
    const response = await axiosInstance.post('/projects', projectData);
    return response.data;
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};

// Update project (Admin only)
export const updateProject = async (id, projectData) => {
  try {
    const response = await axiosInstance.put(`/projects/${id}`, projectData);
    return response.data;
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
};

// Delete project (Admin only)
export const deleteProject = async (id) => {
  try {
    const response = await axiosInstance.delete(`/projects/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
};

// Upload project image
export const uploadProjectImage = async (formData) => {
  try {
    const response = await axiosInstance.post('/projects/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};
