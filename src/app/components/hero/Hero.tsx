import Image from 'next/image';
import type { MoviesResult } from '@/interfaces';
import { getRandomImage } from '@/utils';
import { HeroCard } from './HeroCard';

interface Props {
  movies: MoviesResult[];
}

export const Hero = ({ movies }: Props) => {
  const randomMovie = getRandomImage(movies!);

  return (
    <section className='relative h-[600px] w-full text-white'>
      <div className='h-full w-full animate-fadeIn'>
        <div className='absolute h-[600px] w-full bg-gradient-to-r from-black'></div>

        <picture>
          <source
            media='(min-width:640px)'
            srcSet={`https://image.tmdb.org/t/p/original${movies?.[randomMovie].backdrop_path}`}
          />
          <Image
            className='h-full w-full object-cover'
            src={`https://image.tmdb.org/t/p/w500${movies?.[randomMovie].poster_path}`}
            alt={movies?.[randomMovie].title!}
            height={500}
            width={500}
            priority
          />
        </picture>

        <HeroCard movie={movies[randomMovie]} />
      </div>
    </section>
  );
};
