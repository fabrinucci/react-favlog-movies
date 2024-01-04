import { useEffect, useState } from 'react';
import { getMoviesBySearch } from '@/api';
import type { MoviesResult } from '@/interfaces';

export const useSearchMovies = (query: string) => {
  const [movies, setMovies] = useState<MoviesResult[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleMovies = async () => {
    const data = await getMoviesBySearch(query);
    return data;
  };

  useEffect(() => {
    handleMovies()
      .then((res) => setMovies(res))
      .then(() => setLoading(false))
      .catch((error) => setError(error));
  }, [query]);

  return { movies, loading, error };
};
