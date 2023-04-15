import { useEffect, useState } from 'react';
import { getMovie } from '../api';
import { Movie } from '../interfaces';

export const useMovie = (id: string) => {
  const [movie, setMovie] = useState<Movie>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleMovie = async () => {
    const data = await getMovie(id);
    return data;
  };

  useEffect(() => {
    handleMovie()
      .then((res) => setMovie(res))
      .then(() => setLoading(false))
      .catch((error) => setError(error));
  }, []);

  return { movie, loading, error };
};
