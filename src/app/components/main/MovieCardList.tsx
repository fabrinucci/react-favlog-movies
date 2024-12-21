import Image from 'next/image';
import Link from 'next/link';
import { GiRoundStar } from 'react-icons/gi';
import type { MoviesResult } from '@/interfaces';
import { config } from '@/config';
import { transformToSlug } from '@/utils';

interface Props {
  movie: MoviesResult;
}

export const MovieCardList = ({ movie }: Props) => {
  const movieTitle = transformToSlug(movie.title);
  const { MOVIE_PATH_SMALL } = config;

  return (
    <li
      data-testid='MovieCard-li'
      className='relative mb-2 mr-4 inline-block w-[160px] overflow-hidden transition-all last-of-type:mr-0 sm:w-[200px] md:w-[240px]'
    >
      <Link href={`/movie/${movie.id}-${movieTitle}`}>
        <article data-testid='MovieCard-article' className='container-movies'>
          <figure className='relative h-[250px] w-auto rounded-sm bg-purple-400 sm:h-[300px] md:h-[350px]'>
            <Image
              data-testid='MovieCard-img'
              src={`${MOVIE_PATH_SMALL}${movie.poster_path}`}
              alt={movie.title}
              className='h-full w-full rounded-sm object-cover'
              fill
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            />
          </figure>

          <div
            data-testid='MovieCard-info-movies'
            className='info-movies hidden hover:scale-110 md:block'
          >
            <h4
              data-testid='MovieCard-title'
              className='text-md mb-2 text-wrap font-semibold text-purple-100'
            >
              {movie.title}
            </h4>
            <div className='mb-2 flex items-center justify-center gap-2 text-purple-200'>
              <p data-testid='MovieCard-release_date' className='text-sm'>
                {movie.release_date.split('-')[0]}
              </p>
              <div className='flex items-center gap-1'>
                <GiRoundStar size={10} />
                <p data-testid='MovieCard-vote_average' className='text-sm'>
                  {movie.vote_average.toFixed(1)}
                </p>
              </div>
            </div>
          </div>
        </article>
      </Link>
    </li>
  );
};
