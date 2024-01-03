import { useNavigate } from 'react-router-dom';
import { GiRoundStar } from 'react-icons/gi';
import { useMovies } from '../../hooks';
import { getRandomImage } from '../../utils';

export const Hero = () => {
  const navigate = useNavigate();
  const { movies, loading } = useMovies('popular');
  const randomMovie = getRandomImage(movies!);

  const handlePlay = () => {
    navigate(`movie/${movies?.[randomMovie].id}`);
    window.scrollTo(0, 0);
  };

  return (
    <section className='relative h-[600px] w-full text-white'>
      <div className='h-full w-full animate-fadeIn'>
        <div className='absolute h-[600px] w-full bg-gradient-to-r from-black'></div>
        {!loading && (
          <>
            <picture>
              <source
                media='(min-width:640px)'
                srcSet={`https://image.tmdb.org/t/p/original${movies?.[randomMovie].backdrop_path}`}
              />
              <img
                className='h-full w-full object-cover'
                src={`https://image.tmdb.org/t/p/w500${movies?.[randomMovie].poster_path}`}
                alt={movies?.[randomMovie].title}
              />
            </picture>
            <div className='absolute left-[50%] top-[60%] -translate-x-[50%] -translate-y-[50%] md:left-52 md:top-[40%] md:-translate-y-0 md:translate-x-0'>
              <h1 className='mb-4 text-center text-2xl font-semibold sm:text-left sm:text-3xl md:mb-3'>
                {movies?.[randomMovie].title}
              </h1>
              <div className='flex flex-col items-center gap-3 sm:flex-row sm:items-center md:items-start'>
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
              <h2 className='mt-3 hidden text-sm leading-7 sm:w-[80%] sm:text-base md:block lg:w-[70%]'>
                {movies?.[randomMovie].overview}
              </h2>
              <div className='mt-8 flex flex-col items-center gap-3 sm:flex-row md:mt-5 md:items-start'>
                <button
                  onClick={handlePlay}
                  className='h-12 w-36 rounded-md border border-violet-600 bg-violet-600 px-5 py-2 duration-200 ease-in-out hover:bg-violet-700'
                >
                  Play
                </button>
                <button className='h-12 w-36 rounded-md border border-violet-600 bg-[#0000006b] px-5 py-2 duration-200 ease-in-out hover:bg-[#000000cc]'>
                  Watch Later
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};
