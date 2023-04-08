import { useMovies } from '../hooks';

export const Main = () => {
  const { movies, loading } = useMovies('popular');
  const randomMovie = Math.floor(Math.random() * movies?.length!);

  return (
    <main>
      <div className='relative h-[600px] w-full text-white'>
        <div className='h-full w-full'>
          <div className='absolute h-[600px] w-full bg-gradient-to-r from-black'></div>
          {!loading && (
            <img
              className='h-full w-full object-cover'
              src={`https://image.tmdb.org/t/p/original${movies?.[randomMovie].backdrop_path}`}
              alt={movies?.[randomMovie].title}
            />
          )}

          <div className='absolute left-10 top-[45%] md:left-40'>
            <h1 className='my-2 pr-4 text-2xl font-semibold md:text-3xl'>
              {movies?.[randomMovie].title}
            </h1>
            <p className='mb-2 text-sm text-zinc-400'>
              Released: {movies?.[randomMovie].release_date}
            </p>
            <p className='hidden text-sm leading-7 md:block md:w-[80%] lg:w-[70%]'>
              {movies?.[randomMovie].overview}
            </p>
            <div className='mt-3 flex gap-3'>
              <button className='rounded-md border border-violet-600 bg-violet-600 px-5 py-2 duration-200 ease-in-out hover:bg-violet-700'>
                Play
              </button>
              <button className='rounded-md border border-violet-600 bg-[#0000006b] px-5 py-2 duration-200 ease-in-out hover:bg-[#000000cc]'>
                Watch Later
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
