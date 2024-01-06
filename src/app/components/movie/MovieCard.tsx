import Image from 'next/image';
import { Suspense } from 'react';
import { MovieInfo, MovieCast } from './';
import type { Movie, MovieCredits } from '@/interfaces';
import { MovieInfoSkeleton } from '@/components/skeletons';

interface Props {
  movie: Movie;
  movieCredits: MovieCredits;
}

export const MovieCard = ({ movie, movieCredits }: Props) => {
  return (
    <section className='h-full w-full'>
      <div className='absolute h-[120px] w-full bg-gradient-to-r from-black sm:h-[80px]'></div>
      <Image
        className='h-full w-full object-cover'
        src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
        alt={movie?.title}
        height={800}
        width={800}
      />

      <div className='px-4 md:px-8'>
        <Suspense fallback={<MovieInfoSkeleton />}>
          <MovieInfo movie={movie} movieCredits={movieCredits} />
        </Suspense>
        <MovieCast movieCredits={movieCredits} />
      </div>
    </section>
  );
};
