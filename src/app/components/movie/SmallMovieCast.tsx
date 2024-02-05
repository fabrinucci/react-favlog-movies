import Image from 'next/image';
import Link from 'next/link';
import { getMovieCast } from '@/lib';

interface Props {
  movieId: string;
}

export async function SmallMovieCast({ movieId }: Props) {
  const movieCast = await getMovieCast({ id: movieId, start: 0, end: 6 });

  const CAST_IMG = 'https://image.tmdb.org/t/p/w300';
  const NOT_FOUND_F = '/assets/profileFemaleNF.svg';
  const NOT_FOUND_M = '/assets/profileMaleNF.svg';

  return (
    <ul className='grid grid-cols-fit-3 gap-x-6 gap-y-4'>
      {movieCast.map((profileCast) => (
        <li
          className='flex animate-fadeIn flex-col items-center justify-center'
          key={profileCast.id}
        >
          <Link href={`/person/${profileCast.id}`}>
            <figure className='my-2 h-60 w-40 rounded-md bg-purple-400'>
              <Image
                className='h-60 w-40 rounded-md object-cover'
                src={
                  profileCast.profile_path
                    ? `${CAST_IMG}${profileCast.profile_path}`
                    : profileCast.gender === 1
                    ? NOT_FOUND_F
                    : NOT_FOUND_M
                }
                alt={profileCast.name}
                height={300}
                width={300}
              />
            </figure>
          </Link>
          <Link href={`/person/${profileCast.id}`}>
            <h4 className='text-center font-semibold transition-colors md:hover:text-violet-300'>
              {profileCast.name?.length! <= 22
                ? profileCast.name
                : `${profileCast.name?.slice(0, 22)}...`}
            </h4>
          </Link>
          <h5 className='text-sm text-purple-200'>
            {profileCast.character?.length! <= 22
              ? profileCast.character
              : `${profileCast.character?.slice(0, 22)}...`}
          </h5>
        </li>
      ))}
    </ul>
  );
}
