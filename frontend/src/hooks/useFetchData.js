import { useState, useEffect } from 'react';

/**
 * Custom hook for fetching data from API
 * @param {Function} apiFunction - The API function to call
 * @param {Array} dependencies - Dependencies array for useEffect
 * @returns {Object} { data, loading, error, refetch }
 */
const useFetchData = (apiFunction, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiFunction();
      setData(result);
    } catch (err) {
      setError(err.message || 'An error occurred while fetching data');
  // ...removed console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  // Function to manually refetch data
  const refetch = () => {
    fetchData();
  };

  return { data, loading, error, refetch };
};

export default useFetchData;
