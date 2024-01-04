import { MovieCard } from '@/components/movie';

interface Props {
  params: {
    id: string;
  };
}

export default async function MoviePage({ params }: Props) {
  return (
    <main className='relative h-[120px] w-full text-white sm:h-[80px]'>
      <MovieCard id={params.id} />
    </main>
  );
}
