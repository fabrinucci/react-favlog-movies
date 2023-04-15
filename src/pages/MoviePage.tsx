import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { GiRoundStar } from 'react-icons/gi';
import { useMovie, useMovieInfo } from '../hooks';

const castImg = `https://image.tmdb.org/t/p/w500`;
const notFoundImg = '/assets/profileNotFound.jpg';

export const MoviePage = () => {
  const params = useParams();
  const { movie } = useMovie(params.id!);
  const { movieInfo: movieCredits } = useMovieInfo(params.id!, 'credits');

  const [showAllCast, setShowAllCast] = useState(false);
  let moviesCast;

  if (showAllCast) {
    moviesCast = movieCredits?.cast;
  } else {
    moviesCast = movieCredits?.cast.slice(0, 6);
  }

  const director = movieCredits?.crew.find(
    (member) => member.job === 'Director'
  );
  const producers = movieCredits?.crew.filter(
    (member) => member.job === 'Producer'
  );

  const writers = movieCredits?.crew.filter(
    (member) => member.job === 'Writer'
  );

  const onToggleCast = () => {
    setShowAllCast(!showAllCast);
  };

  return (
    <main className='relative h-[80px] w-full text-white'>
      <div className='h-full w-full'>
        <div className='absolute h-[80px] w-full bg-gradient-to-r from-black'></div>
        <img
          className='h-full w-full object-cover'
          src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
          alt={movie?.title}
        />
        <div className='px-4 md:px-8'>
          <section className='grid gap-5 py-10 md:grid-cols-3 md:py-6'>
            <div className='mx-auto w-[80%] sm:w-[60%] md:col-span-1 md:w-auto'>
              <img
                className='rounded-md'
                src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
                alt={movie?.title}
              />
            </div>
            <div className='md:col-span-2'>
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
                      <h3 className='text-base font-semibold'>
                        {producer.name}
                      </h3>
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
          </section>
          <section className='py-10 md:py-6'>
            <div className='mt-3'>
              <div className='flex items-center justify-between pb-3'>
                <h3 className='text-xl font-semibold'>Cast:</h3>
                {movieCredits?.cast.length! > 6 && (
                  <button
                    onClick={onToggleCast}
                    className='rounded-md bg-violet-600 px-4 py-1 font-semibold text-gray-200 md:py-2'
                  >
                    {showAllCast ? 'Hide cast' : 'Show all cast'}
                  </button>
                )}
              </div>
              <ul
                className={`grid grid-cols-1 justify-items-center gap-2 min-[400px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6`}
              >
                {moviesCast?.map((profileCast) => (
                  <li
                    className='flex animate-fadeIn flex-col items-center justify-center'
                    key={profileCast.id}
                  >
                    <div className='my-2 h-60 w-40 rounded-md bg-gray-600'>
                      <img
                        className='h-60 w-40 rounded-md object-cover'
                        src={
                          profileCast.profile_path
                            ? `${castImg}${profileCast.profile_path}`
                            : notFoundImg
                        }
                        alt={profileCast.name}
                      />
                    </div>
                    <h4>
                      {profileCast.name?.length! <= 22
                        ? profileCast.name
                        : `${profileCast.name?.slice(0, 22)}...`}
                    </h4>
                    <h5 className='text-sm text-gray-300'>
                      {profileCast.character?.length! <= 26
                        ? profileCast.character
                        : `${profileCast.character?.slice(0, 26)}...`}
                    </h5>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};
