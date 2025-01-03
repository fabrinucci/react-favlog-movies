import Image from 'next/image';
import Link from 'next/link';
import { getMovieCast } from '@/lib';
import { transformToSlug } from '@/utils';
import { config } from '@/config';

interface Props {
  movieId: string;
}

export async function SmallMovieCast({ movieId }: Props) {
  const movieCast = await getMovieCast({ id: movieId, start: 0, end: 6 });

  const { MOVIE_PATH_SMALL, FEMALE_NOT_FOUND, MALE_NOT_FOUND } = config;

  return (
    <ul
      data-testid='SmallMovieCast'
      className='grid grid-cols-fit-3 gap-x-6 gap-y-4'
    >
      {movieCast.map((profileCast) => (
        <li
          data-testid='SmallMovieCast-li'
          className='flex animate-fadeIn flex-col items-center justify-center'
          key={profileCast.id}
        >
          <Link
            data-testid='SmallMovieCast-img-link'
            href={`/person/${profileCast.id}-${transformToSlug(
              profileCast.name
            )}`}
          >
            <figure className='my-2 h-60 w-40 rounded-md bg-purple-400'>
              <Image
                data-testid='SmallMovieCast-img'
                className='h-60 w-40 rounded-md object-cover'
                src={
                  profileCast.profile_path
                    ? `${MOVIE_PATH_SMALL}${profileCast.profile_path}`
                    : profileCast.gender === 1
                    ? FEMALE_NOT_FOUND
                    : MALE_NOT_FOUND
                }
                alt={profileCast.name}
                height={300}
                width={300}
              />
            </figure>
          </Link>
          <Link
            data-testid='SmallMovieCast-name-link'
            href={`/person/${profileCast.id}-${transformToSlug(
              profileCast.name
            )}`}
          >
            <h4
              data-testid='SmallMovieCast-name'
              className='text-center font-semibold transition-colors md:hover:text-violet-300'
            >
              {profileCast.name?.length! <= 22
                ? profileCast.name
                : `${profileCast.name?.slice(0, 22)}...`}
            </h4>
          </Link>
          <h5
            data-testid='SmallMovieCast-character'
            className='text-sm text-purple-200'
          >
            {profileCast.character?.length! <= 22
              ? profileCast.character
              : `${profileCast.character?.slice(0, 22)}...`}
          </h5>
        </li>
      ))}
    </ul>
  );
}
