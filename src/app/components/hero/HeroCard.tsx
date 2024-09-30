import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GiRoundStar } from 'react-icons/gi';
import type { MoviesResult } from '@/interfaces';
import { transformToSlug } from '@/utils';

interface Props {
  movie: MoviesResult;
}

export const HeroCard = ({ movie }: Props) => {
  const movieTitle = transformToSlug(movie.title);

  return (
    <>
      <picture>
        <source
          media='(min-width:640px)'
          srcSet={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        />
        <Image
          className='h-full w-full object-cover'
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          height={500}
          width={500}
          priority
        />
      </picture>

      <section className='absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]'>
        <div className='flex flex-col items-center justify-center gap-6'>
          <h1 className='text-center text-3xl font-semibold lg:text-4xl'>
            {movie.title}
          </h1>

          <div className='flex flex-col items-center gap-4 sm:flex-row'>
            <p className='text-sm text-purple-300'>
              Released: {movie.release_date}
            </p>
            <div className='flex gap-3'>
              <p className='rounded-md bg-violet-600 px-2 py-[0.1rem] text-sm font-semibold'>
                Trending
              </p>
              <div className='flex items-center justify-center gap-2'>
                <div>
                  <GiRoundStar size={20} />
                </div>
                <p className='leading-4'>{movie.vote_average.toFixed(1)}</p>
              </div>
            </div>
          </div>

          <div className='flex flex-col items-center gap-4 sm:flex-row md:items-start'>
            <Link
              href={`/movie/${movie.id}-${movieTitle}`}
              className='w-36 rounded-md border border-violet-600 bg-violet-600 py-3 text-center font-semibold transition-all hover:scale-110'
            >
              Play
            </Link>
            <button className='w-36 rounded-md border border-violet-600 bg-[#000000b8] py-3 font-semibold transition-all hover:scale-110'>
              Watch Later
            </button>
          </div>
        </div>
      </section>
    </>
  );
};
