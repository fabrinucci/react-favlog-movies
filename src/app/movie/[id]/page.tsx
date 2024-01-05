import { getMovie, getMovieCredits } from '@/api';
import { MovieCard } from '@/components/movie';

interface Props {
  params: {
    id: string;
  };
}

export default async function MoviePage({ params }: Props) {
  const movie = await getMovie(params.id);
  const movieCredits = await getMovieCredits(params.id);

  return (
    <main className='relative h-[120px] w-full text-white sm:h-[80px]'>
      <MovieCard movie={movie} movieCredits={movieCredits} />
    </main>
  );
}
