import { Hero } from '@/components/hero';
import { Main } from '@/components/main';
import { getMovies } from './api';

export default async function HomePage() {
  const popularMovies = await getMovies('popular');
  const topRatedMovies = await getMovies('top_rated');

  return (
    <>
      <Hero movies={popularMovies.slice(0, 5)} />
      <Main popularMovies={popularMovies} topRatedMovies={topRatedMovies} />
    </>
  );
}
