import { useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';

export function useDestinations() {
  const [destinations, setDestinations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDestinations = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.getDestinations();
      setDestinations(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch destinations');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDestinations();
  }, [fetchDestinations]);

  return {
    destinations,
    isLoading,
    error,
    refetch: fetchDestinations
  };
}

export default useDestinations;
