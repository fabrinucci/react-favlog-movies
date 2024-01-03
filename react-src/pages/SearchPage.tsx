import { useLocation } from 'react-router-dom';
import { useSearchMovies } from '../hooks';

const moviePath = 'https://image.tmdb.org/t/p/w300';
const movieNotFound = '/assets/movieNotFound.webp';

export const SearchPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('query');

  const { movies, loading } = useSearchMovies(query!);

  return (
    <main>
      <div className='h-[120px] w-full bg-gray-950 sm:h-[80px]'></div>
      {loading ? (
        <div className='animate-loading px-4 py-4 md:px-8'>
          <div className='mb-4 h-9 w-64 rounded-full bg-gray-600'></div>
          <div className='flex gap-4'>
            <span className='h-56 w-40 rounded-sm bg-gray-600'></span>
            <span className='h-7 w-80 rounded-full bg-gray-600'></span>
          </div>
        </div>
      ) : (
        <div className='px-4 py-4 md:px-8'>
          <h2 className='mb-3 text-2xl'>
            {movies?.length! > 0
              ? `Results about: ${query}`
              : 'There are no movies that matched your query.'}
          </h2>
          <ul>
            {movies?.map((movie) => (
              <li className='mb-4' key={movie.id}>
                <div className='flex animate-fadeIn flex-col items-center gap-4 sm:flex-row sm:items-start'>
                  <div>
                    <figure className='h-40 w-28 rounded-sm bg-gray-600'>
                      <img
                        className='h-full w-full rounded-sm object-cover'
                        src={
                          movie.poster_path
                            ? `${moviePath}${movie.poster_path}`
                            : movieNotFound
                        }
                        alt={movie.title}
                        loading='lazy'
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
      )}
    </main>
  );
};
