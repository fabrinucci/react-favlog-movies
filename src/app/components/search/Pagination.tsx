'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import {
  RxArrowLeft,
  RxDoubleArrowLeft,
  RxArrowRight,
  RxDoubleArrowRight,
} from 'react-icons/rx';

import type { Movies } from '@/interfaces';

interface Props {
  movies: Movies;
}

const createPagination = (n: number) => {
  let array = [];
  for (let i = 1; i <= n; i++) {
    array.push(i);
  }
  return array;
};

export const Pagination = ({ movies }: Props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams?.get('query');
  const currentPage = movies.page;
  const totalPages = movies.total_pages;

  const LIMIT = 4;

  const getStartingPage = () => {
    if (currentPage <= Math.ceil(LIMIT / 2)) {
      return 1;
    } else if (currentPage >= totalPages - Math.ceil(LIMIT / 2)) {
      return totalPages - 2;
    } else {
      return currentPage - Math.ceil(LIMIT / 2) + 1;
    }
  };

  const getPaginationArray = () => {
    const startingPage = getStartingPage();
    const endingPage = Math.min(startingPage + LIMIT - 1, totalPages);
    return createPagination(endingPage).slice(startingPage - 1);
  };
  return (
    <section className='flex justify-center gap-6'>
      {currentPage > 1 && (
        <>
          <Link
            data-testid='pagination-link-first-page'
            href={
              query ? `${pathname}?query=${query}&page=1` : `${pathname}?page=1`
            }
            className='rounded-lg bg-violet-500 p-3 text-xl duration-200 ease-in-out hover:bg-violet-700'
          >
            <RxDoubleArrowLeft />
          </Link>
          <Link
            data-testid='pagination-link-prev-page'
            href={
              query
                ? `${pathname}?query=${query}&page=${currentPage - 1}`
                : `${pathname}?page=${currentPage - 1}`
            }
            className='rounded-lg bg-violet-500 p-3 text-xl duration-200 ease-in-out hover:bg-violet-700'
          >
            <RxArrowLeft />
          </Link>
        </>
      )}
      {getPaginationArray().map(
        (searchPage) =>
          searchPage <= 500 && (
            <Link
              data-testid={`pagination-link-${searchPage}-page`}
              key={searchPage}
              href={
                query
                  ? `${pathname}?query=${query}&page=${searchPage}`
                  : `${pathname}?page=${searchPage}`
              }
              className={`rounded-lg p-3 ${
                currentPage === searchPage
                  ? 'bg-violet-700'
                  : 'bg-violet-500 duration-200 ease-in-out hover:bg-violet-700'
              }`}
            >
              {searchPage}
            </Link>
          )
      )}
      {currentPage !== totalPages && currentPage < 500 && (
        <>
          <Link
            data-testid='pagination-link-next-page'
            href={
              query
                ? `${pathname}?query=${query}&page=${currentPage + 1}`
                : `${pathname}?page=${currentPage + 1}`
            }
            className='rounded-lg bg-violet-500 p-3 text-xl duration-200 ease-in-out hover:bg-violet-700'
          >
            <RxArrowRight />
          </Link>

          <Link
            data-testid='pagination-link-last-page'
            href={
              query
                ? `${pathname}?query=${query}&page=${
                    totalPages <= 500 ? totalPages : 500
                  }`
                : `${pathname}?page=${totalPages <= 500 ? totalPages : 500}`
            }
            className='rounded-lg bg-violet-500 p-3 text-xl duration-200 ease-in-out hover:bg-violet-700'
          >
            <RxDoubleArrowRight />
          </Link>
        </>
      )}
    </section>
  );
};
