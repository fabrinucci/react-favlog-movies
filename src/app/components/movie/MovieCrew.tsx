import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getMovieCrew } from '@/lib';

interface Props {
  movieId: string;
}

const CREW_IMG = 'https://image.tmdb.org/t/p/w300';
const NOT_FOUND_IMG = '/assets/profileNotFound.webp';

export async function MovieCrew({ movieId }: Props) {
  const movieCast = await getMovieCrew({ id: movieId });

  if (movieCast.length === 0) redirect('/');

  return (
    <ul className='flex flex-col gap-y-3'>
      {movieCast.map((profileCrew) => (
        <li
          className='flex animate-fadeIn items-center gap-4'
          key={profileCrew.id}
        >
          <Link href={`/person/${profileCrew.id}`}>
            <figure className='my-2 h-32 w-24 rounded-md bg-purple-400'>
              <Image
                className='h-32 w-24 rounded-md object-cover'
                src={
                  profileCrew.profile_path
                    ? `${CREW_IMG}${profileCrew.profile_path}`
                    : NOT_FOUND_IMG
                }
                alt={profileCrew.name}
                height={100}
                width={100}
              />
            </figure>
          </Link>
          <div>
            <h4>{profileCrew.name}</h4>
            <h5 className='text-sm text-purple-200'>{profileCrew.job}</h5>
          </div>
        </li>
      ))}
    </ul>
  );
}
