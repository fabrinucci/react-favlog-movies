import type { MoviesResult } from '@/interfaces';
import { getRandomImage } from '@/utils';
import { HeroCard } from './HeroCard';

interface Props {
  movies: MoviesResult[];
}

export const Hero = ({ movies }: Props) => {
  const randomMovie = getRandomImage(movies);

  return (
    <section className='relative h-[600px] w-full text-white'>
      <div className='h-full w-full animate-fadeIn'>
        <div className='absolute h-[600px] w-full bg-gradient-to-r from-black'></div>
        <HeroCard movie={movies[randomMovie]} />
      </div>
    </section>
  );
};
