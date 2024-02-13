import { CategoriesCard, MoviesCard } from '@/components/main';

export default async function HomePage() {
  return (
    <>
      <MoviesCard movieType='popular' moviesTitle='Top Movies Today' />
      <CategoriesCard />
      <MoviesCard movieType='top_rated' moviesTitle='Top Rated Movies' />
    </>
  );
}
