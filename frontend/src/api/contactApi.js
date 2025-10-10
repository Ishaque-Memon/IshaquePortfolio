import axiosInstance from './axiosConfig';

// Submit contact form
export const submitContactForm = async (formData) => {
  try {
    const response = await axiosInstance.post('/contact', formData);
    return response.data;
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw error;
  }
};

// Get all contact messages (Admin only)
export const getAllContactMessages = async () => {
  try {
    const response = await axiosInstance.get('/contact/messages');
    return response.data;
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    throw error;
  }
};

// Mark message as read (Admin only)
export const markMessageAsRead = async (id) => {
  try {
    const response = await axiosInstance.patch(`/contact/messages/${id}/read`);
    return response.data;
  } catch (error) {
    console.error('Error marking message as read:', error);
    throw error;
  }
};

// Delete contact message (Admin only)
export const deleteContactMessage = async (id) => {
  try {
    const response = await axiosInstance.delete(`/contact/messages/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting contact message:', error);
    throw error;
  }
};
