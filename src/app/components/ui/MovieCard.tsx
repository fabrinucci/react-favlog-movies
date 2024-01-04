'use client';

import Image from 'next/image';
import { useMovie, useMovieInfo } from '@/hooks';
import { MovieInfo, MovieCast } from '.';

interface Props {
  id: string;
}

export const MovieCard = ({ id }: Props) => {
  const { movie, loading } = useMovie(id);
  const { movieInfo: movieCredits } = useMovieInfo(id, 'credits');

  return (
    <section className='h-full w-full'>
      <div className='absolute h-[120px] w-full bg-gradient-to-r from-black sm:h-[80px]'></div>
      {loading ? (
        <div className='h-full w-full bg-gray-900'></div>
      ) : (
        <Image
          className='h-full w-full object-cover'
          src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
          alt={movie?.title!}
          height={800}
          width={800}
        />
      )}

      <div className='px-4 md:px-8'>
        <MovieInfo
          movie={movie!}
          movieCredits={movieCredits!}
          loading={loading}
        />
        <MovieCast movieCredits={movieCredits!} />
      </div>
    </section>
  );
};
