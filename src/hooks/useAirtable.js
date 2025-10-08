import { useState, useEffect, useCallback } from 'react';

const useAirtable = (fetcher) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const memoizedFetcher = useCallback(fetcher, [fetcher]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await memoizedFetcher();
        setData(result);
      } catch (err) {
        setError(err);
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [memoizedFetcher]);

  return { data, isLoading, error };
};

export default useAirtable;