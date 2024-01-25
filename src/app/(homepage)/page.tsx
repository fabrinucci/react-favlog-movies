import { MoviesCard } from '@/components/main';

export const revalidate = 3600;

export default async function HomePage() {
  return (
    <>
      <MoviesCard movieType='popular' moviesTitle='Top Movies Today' />
      <MoviesCard movieType='top_rated' moviesTitle='Top Rated Movies' />
    </>
  );
}
