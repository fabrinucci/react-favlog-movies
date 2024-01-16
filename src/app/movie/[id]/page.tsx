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
    <main className='relative h-[120px] w-full text-white sm:h-[80px]'>
      <Suspense fallback={<MovieCardSkeleton />}>
        <MovieCard id={params.id} />
      </Suspense>
    </main>
  );
}
