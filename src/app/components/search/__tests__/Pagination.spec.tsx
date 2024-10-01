import { render } from '@testing-library/react';
import { Pagination } from '../Pagination';
import { mockedMovies } from '@/mocks/mockedResponse';
import { usePathname, useSearchParams } from 'next/navigation';

jest.mock('next/navigation');

describe('Testing Pagination', () => {
  it('Should have been called', () => {
    render(<Pagination movies={mockedMovies} />);
    expect(useSearchParams).toHaveBeenCalled();
    expect(usePathname).toHaveBeenCalled();
  });
});
