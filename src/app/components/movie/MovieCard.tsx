import Image from 'next/image';
import Link from 'next/link';
import { getMovie, getMovieCast, getMovieCrew } from '@/lib';
import { MovieInfo, SmallMovieCast } from './';
import type { Movie } from '@/interfaces';
import { transformToKebabCase } from '@/utils';

interface Props {
  id: string;
}

export async function MovieCard({ id }: Props) {
  const movie = (await getMovie(id)) as Movie;
  const movieCast = await getMovieCast({ id });
  const movieCrew = await getMovieCrew({ id });

  const movieTitle = transformToKebabCase(movie.title);

  return (
    <section>
      {movie.backdrop_path ? (
        <figure>
          <Image
            className='h-[120px] w-full object-cover sm:h-[80px]'
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            height={200}
            width={1000}
          />
        </figure>
      ) : (
        <div className='h-[120px] sm:h-[80px]'></div>
      )}

      <div className='p-6 md:p-8'>
        <MovieInfo movie={movie} movieCrew={movieCrew} />

        {movieCast.length === 0 ? (
          <section className='mt-6'>
            <h3 className='text-xl font-semibold'>No cast available</h3>
          </section>
        ) : (
          <section className='mt-6'>
            <div className='flex items-center justify-between pb-3'>
              <h3 className='text-xl font-semibold'>Cast:</h3>
              <Link
                href={`/movie/${movie.id}-${movieTitle}/cast`}
                className='rounded-md border border-violet-600 bg-violet-600 px-4 py-3 font-semibold text-white duration-200 ease-in-out md:hover:scale-110'
              >
                View full cast
              </Link>
            </div>

            <SmallMovieCast movieId={id} />
          </section>
        )}
      </div>
    </section>
  );
}
