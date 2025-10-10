import axiosInstance from './axiosConfig';

// Get all skills
export const getAllSkills = async () => {
  try {
    const response = await axiosInstance.get('/skills');
    return response.data;
  } catch (error) {
    console.error('Error fetching skills:', error);
    throw error;
  }
};

// Get skills by category
export const getSkillsByCategory = async (category) => {
  try {
    const response = await axiosInstance.get(`/skills/category/${category}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching skills by category:', error);
    throw error;
  }
};

// Create new skill (Admin only)
export const createSkill = async (skillData) => {
  try {
    const response = await axiosInstance.post('/skills', skillData);
    return response.data;
  } catch (error) {
    console.error('Error creating skill:', error);
    throw error;
  }
};

// Update skill (Admin only)
export const updateSkill = async (id, skillData) => {
  try {
    const response = await axiosInstance.put(`/skills/${id}`, skillData);
    return response.data;
  } catch (error) {
    console.error('Error updating skill:', error);
    throw error;
  }
};

// Delete skill (Admin only)
export const deleteSkill = async (id) => {
  try {
    const response = await axiosInstance.delete(`/skills/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting skill:', error);
    throw error;
  }
};
