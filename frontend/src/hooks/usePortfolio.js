import { useState, useEffect } from 'react';
import * as portfolioApi from '../api/portfolioApi';

/**
 * Custom hook for fetching skills data
 */
export const useSkills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await portfolioApi.getAllSkills();
      setSkills(response.data || []);
    } catch (err) {
      console.error('Error fetching skills:', err);
      setError(err.response?.data?.message || 'Failed to fetch skills');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const createSkill = async (skillData) => {
    try {
      const response = await portfolioApi.createSkill(skillData);
      await fetchSkills(); // Refresh list
      return response;
    } catch (err) {
      throw err;
    }
  };

  const updateSkill = async (id, skillData) => {
    try {
      const response = await portfolioApi.updateSkill(id, skillData);
      await fetchSkills(); // Refresh list
      return response;
    } catch (err) {
      throw err;
    }
  };

  const deleteSkill = async (id) => {
    try {
      const response = await portfolioApi.deleteSkill(id);
      await fetchSkills(); // Refresh list
      return response;
    } catch (err) {
      throw err;
    }
  };

  return {
    skills,
    loading,
    error,
    refetch: fetchSkills,
    createSkill,
    updateSkill,
    deleteSkill
  };
};

/**
 * Custom hook for fetching projects data
 */
export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await portfolioApi.getAllProjects();
      setProjects(response.data || []);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError(err.response?.data?.message || 'Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const createProject = async (projectData) => {
    try {
      const response = await portfolioApi.createProject(projectData);
      await fetchProjects();
      return response;
    } catch (err) {
      throw err;
    }
  };

  const updateProject = async (id, projectData) => {
    try {
      const response = await portfolioApi.updateProject(id, projectData);
      await fetchProjects();
      return response;
    } catch (err) {
      throw err;
    }
  };

  const deleteProject = async (id) => {
    try {
      const response = await portfolioApi.deleteProject(id);
      await fetchProjects();
      return response;
    } catch (err) {
      throw err;
    }
  };

  return {
    projects,
    loading,
    error,
    refetch: fetchProjects,
    createProject,
    updateProject,
    deleteProject
  };
};

/**
 * Custom hook for fetching certificates data
 */
export const useCertificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCertificates = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await portfolioApi.getAllCertificates();
      setCertificates(response.data || []);
    } catch (err) {
      console.error('Error fetching certificates:', err);
      setError(err.response?.data?.message || 'Failed to fetch certificates');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const createCertificate = async (certificateData) => {
    try {
      const response = await portfolioApi.createCertificate(certificateData);
      await fetchCertificates();
      return response;
    } catch (err) {
      throw err;
    }
  };

  const updateCertificate = async (id, certificateData) => {
    try {
      const response = await portfolioApi.updateCertificate(id, certificateData);
      await fetchCertificates();
      return response;
    } catch (err) {
      throw err;
    }
  };

  const deleteCertificate = async (id) => {
    try {
      const response = await portfolioApi.deleteCertificate(id);
      await fetchCertificates();
      return response;
    } catch (err) {
      throw err;
    }
  };

  return {
    certificates,
    loading,
    error,
    refetch: fetchCertificates,
    createCertificate,
    updateCertificate,
    deleteCertificate
  };
};

/**
 * Custom hook for fetching personal info
 */
/**
 * Custom hook for fetching personal info
 */
export const usePersonalInfo = () => {
  const [personalInfo, setPersonalInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPersonalInfo = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching personal info...');
      
      const response = await portfolioApi.getPersonalInfo();
      console.log('Personal Info Response:', response);
      
      // Handle both response.data and direct response
      const data = response?.data || response;
      setPersonalInfo(data);
    } catch (err) {
      console.error('Error fetching personal info:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch personal info';
      setError(errorMessage);
      setPersonalInfo(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPersonalInfo();
  }, []);

  const updatePersonalInfo = async (data) => {
    try {
      console.log('Updating personal info with:', data);
      const response = await portfolioApi.updatePersonalInfo(data);
      console.log('Update response:', response);
      await fetchPersonalInfo(); // Refresh data
      return response;
    } catch (err) {
      console.error('Error updating personal info:', err);
      throw err;
    }
  };

  return {
    personalInfo,
    loading,
    error,
    refetch: fetchPersonalInfo,
    updatePersonalInfo
  };
};
/**
 * Custom hook for fetching contact messages
 */
export const useContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await portfolioApi.getAllMessages();
      setMessages(response.data || []);
    } catch (err) {
      console.error('Error fetching messages:', err);
      setError(err.response?.data?.message || 'Failed to fetch messages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const markAsRead = async (id) => {
    try {
      const response = await portfolioApi.markMessageAsRead(id);
      await fetchMessages();
      return response;
    } catch (err) {
      throw err;
    }
  };

  const deleteMessage = async (id) => {
    try {
      const response = await portfolioApi.deleteMessage(id);
      await fetchMessages();
      return response;
    } catch (err) {
      throw err;
    }
  };

  return {
    messages,
    loading,
    error,
    refetch: fetchMessages,
    markAsRead,
    deleteMessage
  };
};

/**
 * Custom hook for managing education entries
 */
export const useEducation = () => {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEducation = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await portfolioApi.getAllEducation();
      
      // Fix: Handle response.data like other hooks
      // Check if response has a data property, otherwise use response directly
      const educationData = response?.data || response;
      
      // Ensure it's always an array
      setEducation(Array.isArray(educationData) ? educationData : []);
    } catch (err) {
      console.error('Error fetching education:', err);
      setError(err.response?.data?.message || 'Failed to fetch education');
      setEducation([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEducation();
  }, []);

  const createEducation = async (educationData) => {
    try {
      const response = await portfolioApi.createEducation(educationData);
      await fetchEducation(); // Refresh list
      return response;
    } catch (err) {
      throw err;
    }
  };

  const updateEducation = async (id, educationData) => {
    try {
      const response = await portfolioApi.updateEducation(id, educationData);
      await fetchEducation(); // Refresh list
      return response;
    } catch (err) {
      throw err;
    }
  };

  const deleteEducation = async (id) => {
    try {
      const response = await portfolioApi.deleteEducation(id);
      await fetchEducation(); // Refresh list
      return response;
    } catch (err) {
      throw err;
    }
  };

  return {
    education,
    loading,
    error,
    refetch: fetchEducation,
    createEducation,
    updateEducation,
    deleteEducation
  };
};