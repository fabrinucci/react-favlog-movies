import Image from 'next/image';
import Link from 'next/link';
import { GiRoundStar } from 'react-icons/gi';
import type { MoviesResult } from '@/interfaces';

interface Props {
  movie: MoviesResult;
}

export default async function MovieCardList({ movie }: Props) {
  return (
    <li className='relative inline-block w-[160px] cursor-pointer overflow-hidden p-2 sm:w-[200px] md:w-[240px]'>
      <Link href={`/movie/${movie.id}`}>
        <article className='container-movies'>
          <figure className='relative h-[250px] w-auto rounded-sm bg-gray-600 sm:h-[300px] md:h-[350px]'>
            <Image
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
              className='h-full w-full rounded-sm object-cover'
              fill
            />
          </figure>
          <div className='info-movies hidden lg:block'>
            <h4 className='mb-1 text-sm font-semibold'>{movie.title}</h4>
            <div className='mb-2 flex items-center justify-center gap-2'>
              <p className='text-[.65rem] text-zinc-300'>
                {movie.release_date.split('-')[0]}
              </p>
              <div className='flex items-center gap-1'>
                <GiRoundStar size={10} />
                <p className='text-[.65rem] text-zinc-300'>
                  {movie.vote_average}
                </p>
              </div>
            </div>
          </div>
        </article>
      </Link>
    </li>
  );
}
