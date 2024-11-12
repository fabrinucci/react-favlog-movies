import Image from 'next/image';
import Link from 'next/link';
import type { CreditCast, CreditCrewFiltered } from '@/interfaces';
import { config } from '@/config';
import { transformToSlug } from '@/utils';

interface Props {
  credits: CreditCast | CreditCrewFiltered;
}

export const PersonMoviesCard = ({ credits }: Props) => {
  const { MOVIE_PATH_SMALL, MOVIE_NOT_FOUND } = config;
  return (
    <li
      data-testid='PersonMoviesCard-li'
      className='flex w-[120px] flex-col gap-3'
      key={credits.id}
    >
      <div className='h-[190px]'>
        <Link
          data-testid='PersonMoviesCard-img-link'
          className='h-full w-full'
          href={`/movie/${credits.id}-${transformToSlug(credits.title)}`}
        >
          <figure className='h-full w-full rounded-sm bg-purple-400'>
            <Image
              data-testid='PersonMoviesCard-img'
              src={
                credits.poster_path
                  ? `${MOVIE_PATH_SMALL}${credits.poster_path}`
                  : MOVIE_NOT_FOUND
              }
              alt={credits.title}
              className={`h-full w-full rounded-sm ${
                credits.poster_path ? 'object-cover' : ''
              }`}
              height={120}
              width={120}
            />
          </figure>
        </Link>
      </div>
      <h3
        data-testid='PersonMoviesCard-title'
        className='text-center font-semibold text-purple-300'
      >
        <Link
          data-testid='PersonMoviesCard-title-link'
          className='transition-opacity hover:opacity-80'
          href={`/movie/${credits.id}-${transformToSlug(credits.title)}`}
        >
          {credits.title}
        </Link>
      </h3>
    </li>
  );
};
