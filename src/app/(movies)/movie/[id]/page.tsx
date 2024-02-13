import { Suspense } from 'react';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { MovieCard } from '@/components/movie';
import { MovieCardSkeleton } from '@/components/skeletons';
import { getMovie } from '@/lib';

interface Props {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const [id] = params.id.split('-');
  const movie = await getMovie(id);
  return {
    title: movie?.title,
    description: `View the details about ${movie?.title}`,
  };
}

export default async function MoviePage({ params }: Props) {
  const movie = await getMovie(params.id);
  if (!movie) redirect('/');

  return (
    <Suspense fallback={<MovieCardSkeleton />}>
      <MovieCard id={params.id} />
    </Suspense>
  );
}
