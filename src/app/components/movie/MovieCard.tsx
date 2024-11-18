import Image from 'next/image';
import Link from 'next/link';
import { getMovie, getMovieCast, getMovieCrew } from '@/lib';
import { MovieInfo, SmallMovieCast } from './';
import type { Movie } from '@/interfaces';
import { config } from '@/config';
import { transformToSlug } from '@/utils';

interface Props {
  id: string;
}

export async function MovieCard({ id }: Props) {
  const movie = (await getMovie(id)) as Movie;
  const movieCast = await getMovieCast({ id });
  const movieCrew = await getMovieCrew({ id });

  const { MOVIE_PATH_LARGE } = config;

  const movieTitle = transformToSlug(movie.title);

  return (
    <section>
      {movie.backdrop_path ? (
        <figure>
          <Image
            data-testid='MovieCard-img'
            className='h-[120px] w-full object-cover sm:h-[80px]'
            src={`${MOVIE_PATH_LARGE}${movie.backdrop_path}`}
            alt={movie.title}
            height={200}
            width={1000}
          />
        </figure>
      ) : (
        <div
          data-testid='MovieCard-img-default'
          className='h-[120px] sm:h-[80px]'
        ></div>
      )}

      <div className='p-6 md:p-8'>
        <MovieInfo movie={movie} movieCrew={movieCrew} />

        {movieCast.length === 0 ? (
          <section data-testid='MovieCard-no-cast' className='mt-6'>
            <h3
              data-testid='MovieCard-cast-title'
              className='text-xl font-semibold'
            >
              No cast available
            </h3>
          </section>
        ) : (
          <section data-testid='MovieCard-cast' className='mt-6'>
            <div className='flex items-center justify-between pb-3'>
              <h3
                data-testid='MovieCard-cast-title'
                className='text-xl font-semibold'
              >
                Cast:
              </h3>
              <Link
                data-testid='MovieCard-cast-link'
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
