import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getMovieCrew } from '@/lib';
import { transformToKebabCase } from '@/utils';

interface Props {
  movieId: string;
}

const CREW_IMG = 'https://image.tmdb.org/t/p/w300';
const NOT_FOUND_F = '/assets/profileFemaleNF.svg';
const NOT_FOUND_M = '/assets/profileMaleNF.svg';

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
            href={`/person/${profileCrew.id}-${transformToKebabCase(
              profileCrew.name
            )}`}
          >
            <figure className='my-2 h-32 w-24 rounded-md bg-purple-400'>
              <Image
                className='h-32 w-24 rounded-md object-cover'
                src={
                  profileCrew.profile_path
                    ? `${CREW_IMG}${profileCrew.profile_path}`
                    : profileCrew.gender === 1
                    ? NOT_FOUND_F
                    : NOT_FOUND_M
                }
                alt={profileCrew.name}
                height={100}
                width={100}
              />
            </figure>
          </Link>
          <div>
            <Link
              href={`/person/${profileCrew.id}-${transformToKebabCase(
                profileCrew.name
              )}`}
            >
              <h4 className='mb-1 font-semibold transition-colors md:hover:text-violet-300'>
                {profileCrew.name}
              </h4>
            </Link>
            <h5 className='text-sm text-purple-200'>
              {`${profileCrew.job}`.split(',').join(', ')}
            </h5>
          </div>
        </li>
      ))}
    </ul>
  );
}
