import Link from 'next/link';
import { CgMathMinus } from 'react-icons/cg';
import type { CreditCast, CreditCrewFiltered } from '@/interfaces';
import { formatStrings, transformToSlug } from '@/utils';

interface Props {
  creditsList: CreditCast[] | CreditCrewFiltered[];
  type: 'Acting' | 'Crew';
}

export const CreditsMovieList = ({ creditsList, type }: Props) => {
  return (
    <div data-testid='CreditsMovieList-card'>
      <h3
        data-testid='CreditsMovieList-title'
        className='mb-4 text-xl font-semibold'
      >
        {type}
      </h3>
      <ul data-testid='CreditsMovieList-ul' className='flex flex-col'>
        {creditsList.map((credit) => {
          const { id, title, release_date } = credit;
          return (
            <li
              data-testid='CreditsMovieList-li'
              className='flex gap-6 border-b border-purple-400 py-4 last-of-type:border-none'
              key={id}
            >
              <p
                data-testid='CreditsMovieList-release'
                className='min-w-[50px] text-center font-semibold'
              >
                {release_date ? (
                  `(${parseInt(release_date)})`
                ) : (
                  <CgMathMinus className='w-full' size={22} />
                )}
              </p>
              <div>
                <Link
                  className='transition-colors hover:text-violet-300'
                  href={`/movie/${id}-${transformToSlug(title)}`}
                >
                  <p
                    data-testid='CreditsMovieList-movie-title'
                    className='font-semibold'
                  >
                    {title}
                  </p>
                </Link>

                {'character' in credit && credit.character && (
                  <p data-testid='CreditsMovieList-character'>
                    <span className='mr-1 text-purple-300'>as</span>
                    {credit.character}
                  </p>
                )}

                {'job' in credit && credit.job && (
                  <p data-testid='CreditsMovieList-job'>
                    {formatStrings(credit.job)}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
