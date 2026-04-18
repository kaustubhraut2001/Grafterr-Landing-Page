import { useState, useEffect, useCallback } from 'react';
import { fetchHeroContent, fetchFeaturesContent } from '../services/api';

/**
 * Custom hook that fetches all page content in parallel.
 * Manages loading, error, and data states.
 * Exposes a retry callback to re-trigger fetches.
 *
 * @returns {{ data: object|null, loading: boolean, error: string|null, retry: function }}
 */
export function useContent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(() => {
    setLoading(true);
    setError(null);
    setData(null);

    Promise.all([fetchHeroContent(), fetchFeaturesContent()])
      .then(([heroData, featuresData]) => {
        setData({ ...heroData, ...featuresData });
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'An unexpected error occurred.');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, retry: fetchData };
}
