import Image from 'next/image';
import Link from 'next/link';
import { getMovieCast } from '@/lib';

interface Props {
  movieId: string;
}

const CAST_IMG = 'https://image.tmdb.org/t/p/w300';
const NOT_FOUND_IMG = '/assets/profileNotFound.webp';

export async function MovieCast({ movieId }: Props) {
  const movieCast = await getMovieCast({ id: movieId });

  return (
    <ul className='flex flex-col gap-y-3'>
      {movieCast.map((profileCast) => (
        <li
          className='flex animate-fadeIn items-center gap-4'
          key={profileCast.id}
        >
          <Link href={`/person/${profileCast.id}`}>
            <figure className='my-2 h-32 w-24 rounded-md bg-purple-400'>
              <Image
                className='h-32 w-24 rounded-md object-cover'
                src={
                  profileCast.profile_path
                    ? `${CAST_IMG}${profileCast.profile_path}`
                    : NOT_FOUND_IMG
                }
                alt={profileCast.name}
                height={100}
                width={100}
              />
            </figure>
          </Link>
          <div>
            <h4>{profileCast.name}</h4>
            <h5 className='text-sm text-purple-200'>{profileCast.character}</h5>
          </div>
        </li>
      ))}
    </ul>
  );
}
