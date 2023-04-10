import { useEffect, useState } from 'react';
import { getCategories } from '../api';
import { Categories, Genre } from '../interfaces';

export const useCategories = () => {
  const [categories, setCategories] = useState<Genre[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleCategories = async () => {
    const data = await getCategories();
    return data;
  };

  useEffect(() => {
    handleCategories()
      .then((res) => setCategories(res))
      .then(() => setLoading(false))
      .catch((error) => setError(error));
  }, []);

  return { categories, loading, error };
};
