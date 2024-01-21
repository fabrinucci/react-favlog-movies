import Image from 'next/image';
import { getMovie, getMovieCredits } from '@/lib';
import { MovieInfo, MovieCast } from './';

interface Props {
  id: string;
}

export async function MovieCard({ id }: Props) {
  const movie = await getMovie(id);
  const movieCredits = await getMovieCredits(id);

  return (
    <section className='h-full w-full'>
      {movie.backdrop_path ? (
        <figure>
          <Image
            className='h-[120px] w-full object-cover sm:h-[80px]'
            src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
            alt={movie?.title}
            height={200}
            width={1000}
          />
        </figure>
      ) : (
        <div className='h-[120px] sm:h-[80px]'></div>
      )}

      <div className='p-6 md:p-8'>
        <MovieInfo movie={movie} movieCredits={movieCredits} />
        <MovieCast movieCredits={movieCredits} />
      </div>
    </section>
  );
}
