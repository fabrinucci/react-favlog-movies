import { useEffect, useState } from 'react';
import { getMovieInfo } from '../api';
import { MovieCredits } from '../interfaces';

export const useMovieInfo = (id: string, info: string) => {
  const [movieInfo, setMovieInfo] = useState<MovieCredits>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleMovieInfo = async () => {
    const data = await getMovieInfo(id, info);
    return data;
  };

  useEffect(() => {
    handleMovieInfo()
      .then((res) => setMovieInfo(res))
      .then(() => setLoading(false))
      .catch((error) => setError(error));
  }, []);

  return { movieInfo, loading, error };
};
