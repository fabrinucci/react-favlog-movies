import { Suspense } from 'react';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Pagination, SearchMovies } from '@/components/search';
import { getMoviesBySearch } from '@/lib';
import { validatePage } from '@/utils';

interface Props {
  searchParams: {
    query: string;
    page: string;
  };
}

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  return {
    title: searchParams.query,
    description: `Find movies with your query: ${searchParams.query}`,
  };
}

export default async function SearchPage({ searchParams }: Props) {
  const { query, page } = searchParams;
  const searchedMovies = await getMoviesBySearch({
    query: query,
    page: validatePage(Number(page)),
  });

  if (!query) redirect('/');

  if (Number(page) > searchedMovies.total_pages || isNaN(Number(page)))
    redirect(`/search?query=${query}&page=1`);

  return (
    <div className='mb-10'>
      <Suspense>
        <SearchMovies movies={searchedMovies.results} />
        {searchedMovies.results.length !== 0 && (
          <Pagination movies={searchedMovies} />
        )}
      </Suspense>
    </div>
  );
}
