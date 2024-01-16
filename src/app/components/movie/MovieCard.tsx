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
      <div className='absolute h-[120px] w-full bg-gradient-to-r from-black sm:h-[80px]'></div>
      <Image
        className='h-full w-full object-cover'
        src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
        alt={movie?.title}
        height={200}
        width={1000}
      />

      <div className='px-4 md:px-8'>
        <MovieInfo movie={movie} movieCredits={movieCredits} />
        <MovieCast movieCredits={movieCredits} />
      </div>
    </section>
  );
}
