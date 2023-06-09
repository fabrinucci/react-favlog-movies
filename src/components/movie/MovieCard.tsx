import { GiRoundStar } from 'react-icons/gi';
import { Movie, MovieCredits } from '../../interfaces';

interface Props {
  movie: Movie;
  movieCredits: MovieCredits;
  loading: boolean;
}

export const MovieCard = ({ movie, movieCredits, loading }: Props) => {
  const director = movieCredits?.crew.find(
    (member) => member.job === 'Director'
  );
  const producers = movieCredits?.crew.filter(
    (member) => member.job === 'Producer'
  );

  const writers = movieCredits?.crew.filter(
    (member) => member.job === 'Writer'
  );

  return (
    <section className='grid gap-8 py-10 md:grid-cols-3 md:py-6'>
      {loading ? (
        <>
          <div className='mx-auto h-screen w-[80%] animate-loading rounded-md bg-gray-600 sm:w-[60%] md:col-span-1 md:h-[350px] md:w-full lg:h-[500px]'></div>
          <div className='h-screen w-full md:col-span-2 md:h-auto md:w-auto'>
            <div className='flex animate-loading flex-col sm:flex-row sm:items-center sm:justify-center sm:gap-6 md:justify-start'>
              <span className='mx-auto h-10 w-[70%] rounded-[40px] bg-gray-600 sm:mx-0 sm:w-[50%]'></span>
              <div className='mt-5 flex w-full items-center justify-center gap-4 sm:mt-0 sm:w-auto'>
                <span className='h-[30px] w-[50px] rounded-[50px] bg-gray-600'></span>
                <span className='h-[30px] w-[50px] rounded-[50px] bg-gray-600'></span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className='mx-auto w-[80%] animate-fadeIn sm:w-[60%] md:col-span-1 md:w-auto'>
            <img
              className='rounded-md'
              src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
              alt={movie?.title}
            />
          </div>
          <div className='animate-fadeIn md:col-span-2'>
            <div className='flex flex-col items-center justify-center gap-5 sm:flex-row md:justify-start'>
              <h2 className='text-center text-2xl font-semibold sm:text-3xl'>
                {movie?.title}
              </h2>
              <div className='flex gap-5'>
                <h3 className='text-xl font-semibold'>
                  {movie?.release_date.split('-')[0]}
                </h3>
                <div className='flex items-center gap-2'>
                  <GiRoundStar size={22} />
                  <h3 className='text-xl font-semibold'>
                    {movie?.vote_average.toFixed(1)}
                  </h3>
                </div>
              </div>
            </div>
            <div className='mt-3'>
              <h3 className='font-semibold'>Categories:</h3>
              <ul className='flex gap-2'>
                {movie?.genres.map((category) => (
                  <li key={category.id}>{category.name}</li>
                ))}
              </ul>
            </div>
            <div className='mt-3'>
              <h3 className='font-semibold'>Overview:</h3>
              <p className='text-justify leading-7 text-zinc-300'>
                {movie?.overview}
              </p>
            </div>
            <div className='mt-3 grid grid-cols-3 gap-3'>
              {director && (
                <div>
                  <h3 className='text-base font-semibold'>{director.name}</h3>
                  <h4 className='text-sm text-gray-300'>Director</h4>
                </div>
              )}
              {producers &&
                producers.map((producer) => (
                  <div key={producer.id}>
                    <h3 className='text-base font-semibold'>{producer.name}</h3>
                    <h4 className='text-sm text-gray-300'>Producer</h4>
                  </div>
                ))}
              {writers &&
                writers.map((writer) => (
                  <div key={writer.id}>
                    <h3 className='text-base font-semibold'>{writer.name}</h3>
                    <h4 className='text-sm text-gray-300'>Writer</h4>
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
};
