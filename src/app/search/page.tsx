import { getMoviesBySearch } from '@/api';
import { SearchMovies } from '@/components/search';

interface Props {
  searchParams: {
    query: string;
  };
}

export default async function SearchPage({ searchParams }: Props) {
  const searchedMovies = await getMoviesBySearch(searchParams.query);

  return (
    <main>
      <SearchMovies movies={searchedMovies} />
    </main>
  );
}
