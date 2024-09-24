import { render, screen } from '@testing-library/react';
import { mockedPopularMovies } from '@/mocks/mockedResponse';
import { SearchMovies } from '../SearchMovies';
import { useSearchParams } from 'next/navigation';

jest.mock('next/navigation');

describe('Testing SearchMovies', () => {
  it('Should be in the component', () => {
    render(<SearchMovies movies={mockedPopularMovies} />);

    const title = screen.getByText('Title');
    expect(title).toBeInTheDocument();
  });

  it('Should have been called', () => {
    render(<SearchMovies movies={mockedPopularMovies} />);
    expect(useSearchParams).toHaveBeenCalled();
  });
});
