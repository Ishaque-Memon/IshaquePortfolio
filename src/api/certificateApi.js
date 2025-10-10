import axiosInstance from './axiosConfig';

// Get all certificates
export const getAllCertificates = async () => {
  try {
    const response = await axiosInstance.get('/certificates');
    return response.data;
  } catch (error) {
    console.error('Error fetching certificates:', error);
    throw error;
  }
};

// Get single certificate by ID
export const getCertificateById = async (id) => {
  try {
    const response = await axiosInstance.get(`/certificates/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching certificate:', error);
    throw error;
  }
};

// Create new certificate (Admin only)
export const createCertificate = async (certificateData) => {
  try {
    const response = await axiosInstance.post('/certificates', certificateData);
    return response.data;
  } catch (error) {
    console.error('Error creating certificate:', error);
    throw error;
  }
};

// Update certificate (Admin only)
export const updateCertificate = async (id, certificateData) => {
  try {
    const response = await axiosInstance.put(`/certificates/${id}`, certificateData);
    return response.data;
  } catch (error) {
    console.error('Error updating certificate:', error);
    throw error;
  }
};

// Delete certificate (Admin only)
export const deleteCertificate = async (id) => {
  try {
    const response = await axiosInstance.delete(`/certificates/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting certificate:', error);
    throw error;
  }
};

// Upload certificate image
export const uploadCertificateImage = async (formData) => {
  try {
    const response = await axiosInstance.post('/certificates/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading certificate image:', error);
    throw error;
  }
};
