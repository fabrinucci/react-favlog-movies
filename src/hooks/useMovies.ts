import { useEffect, useState } from 'react';
import { getMovies } from '../api';
import { Movies, MoviesResult } from '../interfaces';

export const useMovies = (type: string) => {
  const [movies, setMovies] = useState<MoviesResult[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleMovies = async () => {
    const data = await getMovies(type);
    return data;
  };

  useEffect(() => {
    handleMovies()
      .then((res) => setMovies(res))
      .then(() => setLoading(false))
      .catch((error) => setError(error));
  }, []);

  return { movies, loading, error };
};
