import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getMovieCrew } from '@/lib';
import { config } from '@/config';
import { formatStrings, transformToSlug } from '@/utils';

interface Props {
  movieId: string;
}

const { MOVIE_PATH_SMALL, FEMALE_NOT_FOUND, MALE_NOT_FOUND } = config;

export async function MovieCrew({ movieId }: Props) {
  const movieCrew = await getMovieCrew({ id: movieId });
  if (movieCrew.length === 0) redirect('/');

  return (
    <ul className='flex flex-col gap-y-3'>
      {movieCrew.map((profileCrew) => (
        <li
          className='flex animate-fadeIn items-center gap-4'
          key={profileCrew.id}
        >
          <Link
            href={`/person/${profileCrew.id}-${transformToSlug(
              profileCrew.name
            )}`}
          >
            <figure className='my-2 h-32 w-24 rounded-md bg-purple-400'>
              <Image
                className='h-32 w-24 rounded-md object-cover'
                src={
                  profileCrew.profile_path
                    ? `${MOVIE_PATH_SMALL}${profileCrew.profile_path}`
                    : profileCrew.gender === 1
                    ? FEMALE_NOT_FOUND
                    : MALE_NOT_FOUND
                }
                alt={profileCrew.name}
                height={100}
                width={100}
              />
            </figure>
          </Link>
          <div>
            <Link
              href={`/person/${profileCrew.id}-${transformToSlug(
                profileCrew.name
              )}`}
            >
              <h4 className='mb-1 font-semibold transition-colors md:hover:text-violet-300'>
                {profileCrew.name}
              </h4>
            </Link>
            <h5 className='text-sm text-purple-200'>
              {formatStrings(profileCrew.job)}
            </h5>
          </div>
        </li>
      ))}
    </ul>
  );
}
