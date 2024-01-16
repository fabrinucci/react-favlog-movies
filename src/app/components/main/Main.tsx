import { MoviesCard } from './';

export const Main = () => {
  return (
    <main className='bg-[#13114b] px-4 py-5 text-white sm:px-8 md:px-16'>
      <MoviesCard movieType='popular' moviesTitle='Top Movies Today' />
      <MoviesCard movieType='top_rated' moviesTitle='Top Rated Movies' />
    </main>
  );
};
