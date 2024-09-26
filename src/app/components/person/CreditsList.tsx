import Link from 'next/link';
import { CgMathMinus } from 'react-icons/cg';
import type { CreditCrewFiltered, PersonCredits } from '@/interfaces';
import { groupCrewJobs, transformToKebabCase } from '@/utils';

interface Props {
  credits: PersonCredits;
  knownFor: string;
}

export function CreditsList({ credits, knownFor }: Props) {
  const { cast, crew } = credits;

  const sortMoviesCast = () => {
    const moviesWithoutYear = cast.filter((movie) => !movie.release_date);
    return moviesWithoutYear.concat(cast.filter((movie) => movie.release_date));
  };

  const sortMoviesCrew = () => {
    const moviesWithoutYear = crew.filter((movie) => !movie.release_date);
    return moviesWithoutYear.concat(crew.filter((movie) => movie.release_date));
  };

  const sortedMoviesCast = sortMoviesCast().sort(
    (a, b) => parseInt(b.release_date) - parseInt(a.release_date)
  );

  const sortedMoviesCrew = sortMoviesCrew().sort(
    (a, b) => parseInt(b.release_date) - parseInt(a.release_date)
  );

  const filteredCreditsCrew = groupCrewJobs(
    sortedMoviesCrew
  ) as CreditCrewFiltered[];

  return (
    <div
      className={`flex ${
        knownFor === 'Acting' ? 'flex-col' : 'flex-col-reverse'
      } gap-10`}
    >
      {cast.length > 0 && (
        <div>
          <h3 className='mb-4 text-xl font-semibold'>Acting</h3>
          <ul className='flex flex-col'>
            {sortedMoviesCast.map((personCast) => {
              const { id, character, title, release_date } = personCast;
              return (
                <li
                  className='flex gap-6 border-b border-purple-400 py-4 last-of-type:border-none'
                  key={id}
                >
                  <p className='min-w-[50px] text-center font-semibold'>
                    {release_date ? (
                      `(${parseInt(release_date)})`
                    ) : (
                      <CgMathMinus className='w-full' size={22} />
                    )}
                  </p>
                  <div>
                    <Link
                      className='transition-colors hover:text-violet-300'
                      href={`/movie/${id}-${transformToKebabCase(title)}`}
                    >
                      <p className='font-semibold'>{title}</p>
                    </Link>
                    {character && (
                      <p>
                        <span className='mr-1 text-purple-300'>as</span>
                        {character}
                      </p>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {crew.length > 0 && (
        <div>
          <h3 className='mb-4 text-xl font-semibold'>Crew</h3>
          <ul className='flex flex-col'>
            {filteredCreditsCrew.map((personCrew) => {
              const { id, job, title, release_date } = personCrew;
              return (
                <li
                  className='flex gap-6 border-b border-purple-400 py-4 last-of-type:border-none'
                  key={id}
                >
                  <p className='min-w-[50px] text-center font-semibold'>
                    {release_date ? (
                      `(${parseInt(release_date)})`
                    ) : (
                      <CgMathMinus className='w-full' size={22} />
                    )}
                  </p>
                  <div>
                    <Link
                      className='transition-colors hover:text-violet-300'
                      href={`/movie/${id}-${transformToKebabCase(title)}`}
                    >
                      <p className='font-semibold'>{title}</p>
                    </Link>
                    <p className=''>{`${job}`.split(',').join(', ')}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
