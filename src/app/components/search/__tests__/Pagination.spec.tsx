import { usePathname, useSearchParams } from 'next/navigation';
import { render, screen } from '@testing-library/react';
import { Pagination } from '../Pagination';
import { generateMockedFullMovies } from '@/mocks/mockers';

jest.mock('next/navigation');

describe('Testing Pagination', () => {
  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue('/movies');
    (useSearchParams as jest.Mock).mockReturnValue({
      get: (key: string) => (key === 'query' ? 'matrix' : null),
    });
  });

  const mockedMovies = generateMockedFullMovies();

  test('Pagination buttons should appear with their correct href', () => {
    render(<Pagination movies={mockedMovies} />);

    const firstPage = screen.getByTestId('pagination-link-first-page');
    const prevPage = screen.getByTestId('pagination-link-prev-page');
    const nextPage = screen.getByTestId('pagination-link-next-page');
    const lastPage = screen.getByTestId('pagination-link-last-page');

    expect(firstPage).toHaveAttribute('href', '/movies?query=matrix&page=1');
    expect(prevPage).toHaveAttribute(
      'href',
      `/movies?query=matrix&page=${mockedMovies.page - 1}`
    );

    expect(nextPage).toHaveAttribute(
      'href',
      `/movies?query=matrix&page=${mockedMovies.page + 1}`
    );

    expect(lastPage).toHaveAttribute(
      'href',
      `/movies?query=matrix&page=${mockedMovies.total_pages}`
    );
  });

  test('Should not render previous and first page buttons', () => {
    const newMockMovies = { ...mockedMovies, page: 1, total_pages: 10 };

    render(<Pagination movies={newMockMovies} />);

    const firstPage = screen.queryByTestId('pagination-link-first-page');
    const prevPage = screen.queryByTestId('pagination-link-prev-page');

    expect(firstPage).not.toBeInTheDocument();
    expect(prevPage).not.toBeInTheDocument();
  });

  test('Should not render next and last page buttons', () => {
    const newMockedMovies = {
      ...mockedMovies,
      page: 10,
      total_pages: 10,
    };
    render(<Pagination movies={newMockedMovies} />);
    const nextPage = screen.queryByTestId('pagination-link-next-page');
    const lastPage = screen.queryByTestId('pagination-link-last-page');

    expect(nextPage).not.toBeInTheDocument();
    expect(lastPage).not.toBeInTheDocument();
  });

  test('Should render correctly the number pages', () => {
    const newMockedMovies = { ...mockedMovies, page: 3, total_pages: 10 };

    render(<Pagination movies={newMockedMovies} />);

    expect(screen.getByTestId('pagination-link-2-page')).toBeInTheDocument();
    expect(screen.getByTestId('pagination-link-3-page')).toBeInTheDocument();
    expect(screen.getByTestId('pagination-link-4-page')).toBeInTheDocument();

    expect(screen.getByTestId('pagination-link-2-page')).toHaveAttribute(
      'href',
      '/movies?query=matrix&page=2'
    );

    expect(screen.getByTestId('pagination-link-3-page')).toHaveAttribute(
      'href',
      '/movies?query=matrix&page=3'
    );

    expect(screen.getByTestId('pagination-link-4-page')).toHaveAttribute(
      'href',
      '/movies?query=matrix&page=4'
    );
  });

  it('Should apply different color class to the current page.', () => {
    const newMockedMovies = { ...mockedMovies, page: 3, total_pages: 10 };

    render(<Pagination movies={newMockedMovies} />);

    const firstPage = screen.queryByTestId('pagination-link-first-page');
    const prevPage = screen.queryByTestId('pagination-link-prev-page');
    const nextPage = screen.queryByTestId('pagination-link-next-page');
    const lastPage = screen.queryByTestId('pagination-link-last-page');
    const currentPage = screen.getByTestId('pagination-link-3-page');

    expect(firstPage).toHaveClass('bg-violet-500');
    expect(prevPage).toHaveClass('bg-violet-500');
    expect(nextPage).toHaveClass('bg-violet-500');
    expect(lastPage).toHaveClass('bg-violet-500');

    expect(currentPage).toHaveClass('bg-violet-700');
  });

  test('Should handle the 500 page limit', () => {
    const newMockedMovies = {
      ...mockedMovies,
      page: 490,
      total_pages: 510,
    };
    render(<Pagination movies={newMockedMovies} />);
    const nextPage = screen.getByTestId('pagination-link-next-page');
    const lastPage = screen.getByTestId('pagination-link-last-page');

    expect(nextPage).toHaveAttribute('href', '/movies?query=matrix&page=491');
    expect(lastPage).toHaveAttribute('href', '/movies?query=matrix&page=500');
  });
});
