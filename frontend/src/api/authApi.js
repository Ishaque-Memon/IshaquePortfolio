import axiosInstance from './axiosConfig';

/**
 * Authentication API calls
 */

// Admin login
export const login = async (email, password) => {
  const response = await axiosInstance.post('/admin/login', { email, password });
  return response.data;
};

// Get admin profile
export const getProfile = async () => {
  const response = await axiosInstance.get('/admin/profile');
  return response.data;
};

// Update admin profile
export const updateProfile = async (profileData) => {
  const response = await axiosInstance.put('/admin/profile', profileData);
  return response.data;
};

// Change password
export const changePassword = async (currentPassword, newPassword) => {
  const response = await axiosInstance.put('/admin/change-password', {
    currentPassword,
    newPassword
  });
  return response.data;
};

// Logout
export const logout = async () => {
  const response = await axiosInstance.post('/admin/logout');
  return response.data;
};

export default {
  login,
  getProfile,
  updateProfile,
  changePassword,
  logout
};
