import Image from 'next/image';
import type { MoviesResult } from '@/interfaces';

interface Props {
  movies: MoviesResult[];
  query: string;
}

export const SearchMovies = ({ movies, query }: Props) => {
  const MOVIE_PATH = 'https://image.tmdb.org/t/p/w300';
  const MOVIE_NOT_FOUND = '/assets/movieNotFound.webp';

  return (
    <section>
      <div className='h-[120px] w-full bg-gray-950 sm:h-[80px]'></div>
      <div className='px-4 py-4 md:px-8'>
        <h2 className='mb-3 text-2xl'>
          {movies?.length! > 0
            ? `Results about: "${query}"`
            : `There are no movies that matched your query "${query}"`}
        </h2>
        <ul>
          {movies?.map((movie) => (
            <li className='mb-4' key={movie.id}>
              <div className='flex animate-fadeIn flex-col items-center gap-4 sm:flex-row sm:items-start'>
                <div>
                  <figure className='h-40 w-28 rounded-sm bg-gray-600'>
                    <Image
                      className='h-full w-full rounded-sm object-cover'
                      src={
                        movie.poster_path
                          ? `${MOVIE_PATH}${movie.poster_path}`
                          : MOVIE_NOT_FOUND
                      }
                      alt={movie.title}
                      height={300}
                      width={300}
                    />
                  </figure>
                </div>
                <div className='flex flex-col gap-1'>
                  <h2 className='text-center font-semibold sm:text-start'>
                    {movie.title}
                  </h2>
                  <p className='text-center text-sm text-gray-300 sm:text-start'>
                    {movie.release_date}
                  </p>
                  <p className='text-justify text-sm leading-7 sm:leading-6'>
                    {movie.overview.length > 300
                      ? `${movie.overview.slice(0, 300)}...`
                      : movie.overview}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
