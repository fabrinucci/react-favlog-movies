import Image from 'next/image';
import Link from 'next/link';
import { getMovieCast } from '@/lib';
import { config } from '@/config';
import { transformToSlug } from '@/utils';

interface Props {
  movieId: string;
}

const { MOVIE_PATH_SMALL, FEMALE_NOT_FOUND, MALE_NOT_FOUND } = config;

export async function MovieCast({ movieId }: Props) {
  const movieCast = await getMovieCast({ id: movieId });

  return (
    <ul className='flex flex-col gap-y-3'>
      {movieCast.map((profileCast) => (
        <li
          className='flex animate-fadeIn items-center gap-4'
          key={profileCast.id}
        >
          <Link
            href={`/person/${profileCast.id}-${transformToSlug(
              profileCast.name
            )}`}
          >
            <figure className='my-2 h-32 w-24 rounded-md bg-purple-400'>
              <Image
                className='h-32 w-24 rounded-md object-cover'
                src={
                  profileCast.profile_path
                    ? `${MOVIE_PATH_SMALL}${profileCast.profile_path}`
                    : profileCast.gender === 1
                    ? FEMALE_NOT_FOUND
                    : MALE_NOT_FOUND
                }
                alt={profileCast.name}
                height={100}
                width={100}
              />
            </figure>
          </Link>
          <div>
            <Link
              href={`/person/${profileCast.id}-${transformToSlug(
                profileCast.name
              )}`}
            >
              <h4 className='mb-1 font-semibold transition-colors md:hover:text-violet-300'>
                {profileCast.name}
              </h4>
            </Link>
            <h5 className='text-sm text-purple-200'>{profileCast.character}</h5>
          </div>
        </li>
      ))}
    </ul>
  );
}
