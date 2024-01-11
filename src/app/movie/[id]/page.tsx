import { getMovie, getMovieCredits } from '@/api';
import { MovieCard } from '@/components/movie';
import { MovieCardSkeleton } from '@/components/skeletons/MovieCardSkeleton';
import { Suspense } from 'react';

interface Props {
  params: {
    id: string;
  };
}

export default async function MoviePage({ params }: Props) {
  return (
    <main className='relative h-[120px] w-full text-white sm:h-[80px]'>
      <Suspense fallback={<MovieCardSkeleton />}>
        <MovieCard id={params.id} />
      </Suspense>
    </main>
  );
}
