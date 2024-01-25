import { HeroCard } from './HeroCard';
import { getHeroMovie } from '@/lib';

export async function Hero() {
  const movie = await getHeroMovie();

  return (
    <section className='relative h-[600px] w-full'>
      <div className='h-full w-full animate-fadeIn'>
        <div className='absolute h-[600px] w-full bg-gradient-to-r from-black'></div>
        <HeroCard movie={movie} />
      </div>
    </section>
  );
}
