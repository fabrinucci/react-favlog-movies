'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Movies } from '@/interfaces';

interface Props {
  movies: Movies;
}

const createPaginationArray = (n: number) => {
  let array = [];
  for (let i = 1; i <= n; i++) {
    array.push(i);
  }
  return array;
};

export const Pagination = ({ movies }: Props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get('query');

  return (
    <div className='flex justify-center gap-6'>
      {createPaginationArray(movies.total_pages).map((searchPage) => (
        <Link
          key={searchPage}
          href={`${pathname}?query=${query}&page=${searchPage}`}
          className={`rounded-lg p-3 ${
            movies.page === searchPage
              ? 'bg-violet-600'
              : 'bg-gray-500 duration-200 ease-in-out hover:bg-violet-500'
          }`}
        >
          {searchPage}
        </Link>
      ))}
    </div>
  );
};
