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
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            />
          </figure>

          <div className='info-movies hidden hover:scale-110 md:block'>
            <h4 className='text-md mb-2 text-wrap font-semibold text-purple-100'>
              {movie.title}
            </h4>
            <div className='mb-2 flex items-center justify-center gap-2 text-purple-200'>
              <p className='text-sm'>{movie.release_date.split('-')[0]}</p>
              <div className='flex items-center gap-1'>
                <GiRoundStar size={10} />
                <p className='text-sm'>{movie.vote_average.toFixed(1)}</p>
              </div>
            </div>
          </div>
        </article>
      </Link>
    </li>
  );
}
