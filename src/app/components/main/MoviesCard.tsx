'use client';
import Image from 'next/image';
import Link from 'next/link';
import { GiRoundStar } from 'react-icons/gi';
import type { MoviesResult } from '@/interfaces';

interface Props {
  movies: MoviesResult[] | undefined;
  moviesTitle: string;
}

export const MoviesCard = ({ movies, moviesTitle }: Props) => {
  const handleNavigation = () => {
    window.scrollTo(0, 0);
  };

  return (
    <section className='animate-fadeIn'>
      <div className='py-5'>
        <div className='mb-5 flex items-center justify-between'>
          <h3 className='text-xl font-semibold md:text-2xl'>{moviesTitle}</h3>
        </div>

        <ul className='scrollbar-hide relative h-full w-full overflow-x-scroll scroll-smooth whitespace-nowrap'>
          {movies?.map((movie) => (
            <li
              className='relative inline-block w-[160px] cursor-pointer overflow-hidden p-2 sm:w-[200px] md:w-[240px]'
              key={movie.id}
            >
              <Link href={`/movie/${movie.id}`} onClick={handleNavigation}>
                <article className='container-movies'>
                  <Image
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    alt={movie.title}
                    className='block h-auto w-full rounded-sm'
                    height={300}
                    width={300}
                  />
                  <div className='info-movies hidden lg:block'>
                    <h4 className='mb-1 text-sm font-semibold'>
                      {movie.title}
                    </h4>
                    <div className='mb-2 flex items-center justify-center gap-2'>
                      <p className='text-[.65rem] text-zinc-300'>
                        {movie.release_date.split('-')[0]}
                      </p>
                      <div className='flex items-center gap-1'>
                        <GiRoundStar size={10} />
                        <p className='text-[.65rem] text-zinc-300'>
                          {movie.vote_average}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
