import Image from 'next/image';
import Link from 'next/link';
import { getMovieCast } from '@/lib';

interface Props {
  movieId: string;
}

export async function SmallMovieCast({ movieId }: Props) {
  const CAST_IMG = 'https://image.tmdb.org/t/p/w300';
  const NOT_FOUND_IMG = '/assets/profileNotFound.webp';
  const movieCast = await getMovieCast({ id: movieId, start: 0, end: 6 });
  return (
    <ul className='grid grid-cols-fill-2 gap-4'>
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
                    : NOT_FOUND_IMG
                }
                alt={profileCast.name}
                height={300}
                width={300}
              />
            </figure>
          </Link>
          <h4>
            {profileCast.name?.length! <= 22
              ? profileCast.name
              : `${profileCast.name?.slice(0, 22)}...`}
          </h4>
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
