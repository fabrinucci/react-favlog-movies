import type { MoviesType } from '@/interfaces';
import { getMovies } from '@/api';
import MovieCardList from './MovieCardList';

interface Props {
  movieType: MoviesType;
  moviesTitle: string;
}

export async function MoviesCard({ movieType, moviesTitle }: Props) {
  const movies = await getMovies(movieType);

  return (
    <section className='animate-fadeIn'>
      <div className='py-5'>
        <div className='mb-5 flex items-center justify-between'>
          <h3 className='text-xl font-semibold md:text-2xl'>{moviesTitle}</h3>
        </div>

        <ul className='scrollbar-hide relative h-full w-full overflow-x-scroll scroll-smooth whitespace-nowrap'>
          {movies?.map((movie) => (
            <MovieCardList key={movie.id} movie={movie} />
          ))}
        </ul>
      </div>
    </section>
  );
}
