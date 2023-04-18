import { useParams } from 'react-router-dom';
import { useMovie, useMovieInfo } from '../hooks';
import { MovieCard, MovieCast } from '../components/movie';

export const MoviePage = () => {
  const params = useParams();
  const { movie, loading } = useMovie(params.id!);
  const { movieInfo: movieCredits } = useMovieInfo(params.id!, 'credits');

  return (
    <main className='relative h-[80px] w-full text-white'>
      <div className='h-full w-full'>
        <div className='absolute h-[80px] w-full bg-gradient-to-r from-black'></div>
        {loading ? (
          <div className='h-full w-full bg-gray-900'></div>
        ) : (
          <img
            className='h-full w-full object-cover'
            src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
            alt={movie?.title}
          />
        )}

        <div className='px-4 md:px-8'>
          <MovieCard
            movie={movie!}
            movieCredits={movieCredits!}
            loading={loading}
          />
          <MovieCast movieCredits={movieCredits!} />
        </div>
      </div>
    </main>
  );
};
