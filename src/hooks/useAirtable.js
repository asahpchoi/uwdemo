import { useState, useEffect } from 'react';

const useAirtable = (fetcher, params) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await fetcher(params);
        setData(result);
      } catch (err) {
        setError(err);
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [fetcher, params]);

  return { data, isLoading, error };
};

export default useAirtable;
