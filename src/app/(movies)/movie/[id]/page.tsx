import { Suspense } from 'react';
import { MovieCard } from '@/components/movie';
import { MovieCardSkeleton } from '@/components/skeletons';

interface Props {
  params: {
    id: string;
  };
}

export default async function MoviePage({ params }: Props) {
  return (
    <Suspense fallback={<MovieCardSkeleton />}>
      {/* <MovieCard id={params.id} /> */}
      <MovieCardSkeleton />
    </Suspense>
  );
}
