import { useMovies } from '../hooks';
import { GiRoundStar } from 'react-icons/gi';
import { getRandomImage } from '../utils';

export const Hero = () => {
  const { movies, loading } = useMovies('popular');
  const randomMovie = getRandomImage(movies!);

  return (
    <div className='relative h-[600px] w-full text-white'>
      <div className='h-full w-full'>
        <div className='absolute h-[600px] w-full bg-gradient-to-r from-black'></div>
        {!loading && (
          <>
            <img
              className='h-full w-full object-cover'
              src={`https://image.tmdb.org/t/p/original${movies?.[randomMovie].backdrop_path}`}
              alt={movies?.[randomMovie].title}
            />
            <div className='absolute left-10 top-[45%] min-[440px]:left-24 sm:left-40'>
              <h1 className='my-2 pr-4 text-2xl font-semibold sm:text-3xl'>
                {movies?.[randomMovie].title}
              </h1>
              <div className='flex flex-col items-start gap-3 sm:flex-row sm:items-center'>
                <p className='text-sm text-zinc-400'>
                  Released: {movies?.[randomMovie].release_date}
                </p>
                <div className='flex gap-3'>
                  <p className='rounded-md bg-violet-600 px-2 py-[0.1rem] text-sm font-semibold'>
                    Trending
                  </p>
                  <div className='flex items-center justify-center gap-2'>
                    <GiRoundStar size={20} />
                    <p className='leading-4'>
                      {movies?.[randomMovie].vote_average}
                    </p>
                  </div>
                </div>
              </div>
              <h2 className='mt-3 hidden text-sm leading-7 sm:block sm:w-[80%] sm:text-base lg:w-[70%]'>
                {movies?.[randomMovie].overview}
              </h2>
              <div className='mt-5 flex gap-3'>
                <button className='rounded-md border border-violet-600 bg-violet-600 px-5 py-2 duration-200 ease-in-out hover:bg-violet-700'>
                  Play
                </button>
                <button className='rounded-md border border-violet-600 bg-[#0000006b] px-5 py-2 duration-200 ease-in-out hover:bg-[#000000cc]'>
                  Watch Later
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
