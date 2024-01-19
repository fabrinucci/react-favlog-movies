'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { GiRoundStar } from 'react-icons/gi';
import type { MoviesResult } from '@/interfaces';

interface Props {
  movie: MoviesResult;
}

export const HeroCard = ({ movie }: Props) => {
  const router = useRouter();

  const handlePlay = () => {
    router.push(`movie/${movie.id}`);
    window.scrollTo(0, 0);
  };
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

      <div className='absolute left-[50%] top-[60%] -translate-x-[50%] -translate-y-[50%] md:left-52 md:top-[40%] md:-translate-y-0 md:translate-x-0'>
        <h1 className='mb-4 text-center text-2xl font-semibold sm:text-left sm:text-3xl md:mb-3'>
          {movie.title}
        </h1>

        <div className='flex flex-col items-center gap-3 sm:flex-row sm:items-center md:items-start'>
          <p className='text-sm text-zinc-400'>
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

        <h2 className='mt-3 hidden text-sm leading-7 sm:w-[80%] sm:text-base md:block lg:w-[70%]'>
          {movie.overview}
        </h2>
        <div className='mt-8 flex flex-col items-center gap-3 sm:flex-row md:mt-5 md:items-start'>
          <button
            onClick={handlePlay}
            className='h-12 w-36 rounded-md border border-violet-600 bg-violet-600 px-5 py-2 duration-200 ease-in-out hover:bg-violet-700'
          >
            Play
          </button>
          <button className='h-12 w-36 rounded-md border border-violet-600 bg-[#0000006b] px-5 py-2 duration-200 ease-in-out hover:bg-[#000000cc]'>
            Watch Later
          </button>
        </div>
      </div>
    </>
  );
};
