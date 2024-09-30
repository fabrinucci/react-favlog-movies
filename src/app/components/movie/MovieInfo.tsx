import Image from 'next/image';
import Link from 'next/link';
import { GiRoundStar } from 'react-icons/gi';
import type { Movie, MovieCrewFiltered } from '@/interfaces';
import { filterCrewByJob, transformToSlug } from '@/utils';
import { CrewJobInfo } from './CrewJobInfo';

interface Props {
  movie: Movie;
  movieCrew: MovieCrewFiltered[];
}

export const MovieInfo = ({ movie, movieCrew }: Props) => {
  const {
    genres,
    poster_path,
    release_date,
    overview,
    title,
    vote_average,
    vote_count,
  } = movie;

  const movieVotesAvg = Number(vote_average.toFixed(1));
  const MOVIE_NOT_FOUND = '/assets/movieNotFound.svg';

  const directors = filterCrewByJob({ movieCrew, job: 'Director' });
  const producers = filterCrewByJob({ movieCrew, job: 'Producer' });
  const writers = filterCrewByJob({ movieCrew, job: 'Writer' });

  return (
    <section className='grid gap-8 md:grid-cols-3'>
      <div className='mx-auto h-[500px] w-full animate-fadeIn overflow-clip rounded-md bg-purple-400 min-[460px]:w-[80%] sm:h-[600px] md:h-[400px] md:w-full lg:h-[500px]'>
        <picture>
          <source
            media='(min-width:640px)'
            srcSet={
              poster_path
                ? `https://image.tmdb.org/t/p/w500${poster_path}`
                : MOVIE_NOT_FOUND
            }
          />
          <Image
            className={`h-full w-full rounded-md ${
              poster_path ? 'object-cover' : ''
            } object-center`}
            src={
              poster_path
                ? `https://image.tmdb.org/t/p/w300${poster_path}`
                : MOVIE_NOT_FOUND
            }
            alt={title}
            height={500}
            width={500}
            priority
            blurDataURL={`https://image.tmdb.org/t/p/300${poster_path}`}
            placeholder='blur'
          />
        </picture>
      </div>
      <div className='animate-fadeIn md:col-start-2 md:col-end-4'>
        <div className='flex flex-col items-center justify-center gap-5 sm:flex-row md:justify-start'>
          <h2 className='text-center text-2xl font-semibold sm:text-3xl'>
            {title}
          </h2>
          <div className='flex items-center gap-5'>
            {release_date && (
              <h3 className='text-xl font-semibold sm:text-2xl'>
                {release_date.split('-')[0]}
              </h3>
            )}
            {vote_count === 0 ? (
              <div className='flex h-[55px] w-[55px] items-center justify-center rounded-full border-2 border-purple-200 text-purple-200'>
                <p className='text-center'>N/R</p>
              </div>
            ) : (
              <div
                className={`flex items-center gap-2 ${
                  movieVotesAvg > 0 && movieVotesAvg < 6 && 'text-orange-400'
                } ${
                  movieVotesAvg >= 6 && movieVotesAvg < 7 && 'text-yellow-300'
                } 
              ${movieVotesAvg >= 7 && movieVotesAvg < 8 && 'text-lime-400'}
              ${movieVotesAvg >= 8 && 'text-green-400'}
              
            `}
              >
                <GiRoundStar size={22} />
                <h3 className='text-xl font-semibold sm:text-2xl'>
                  {movieVotesAvg}
                </h3>
              </div>
            )}
          </div>
        </div>
        <div className='my-4'>
          <h3 className='text-lg font-semibold'>Categories:</h3>
          <ul className='mt-2 flex flex-wrap gap-4'>
            {genres.map((category) => (
              <li key={category.id}>
                <Link
                  className='block rounded-md bg-violet-600 p-2 duration-200 ease-in hover:scale-110'
                  href={`/category/${category.id}-${transformToSlug(
                    category.name
                  )}`}
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className='my-4'>
          <h3 className='text-lg font-semibold'>Overview:</h3>
          <p className='max-w-[700px] text-justify leading-7 text-purple-200'>
            {overview}
          </p>
        </div>

        <div className='my-4 grid gap-4 min-[400px]:grid-cols-2 sm:grid-cols-3 sm:gap-6'>
          {directors && <CrewJobInfo crew={directors} />}
          {producers && (
            <CrewJobInfo crew={producers} excludeJobs={['Director']} />
          )}
          {writers && (
            <CrewJobInfo
              crew={writers}
              excludeJobs={['Director', 'Producer']}
            />
          )}
        </div>
      </div>
    </section>
  );
};
