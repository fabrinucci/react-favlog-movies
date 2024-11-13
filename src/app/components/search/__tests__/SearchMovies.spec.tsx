import { render, screen } from '@testing-library/react';
import { SearchMovies } from '../SearchMovies';
import { useSearchParams } from 'next/navigation';
import { generateMockedMovies } from '@/mocks/mockers';

jest.mock('next/navigation');

const mockedMovies = generateMockedMovies(10);

describe('Testing SearchMovies', () => {
  beforeEach(() => jest.clearAllMocks());

  test('Should display title with the query and results', () => {
    (useSearchParams as jest.Mock).mockReturnValue({ get: () => 'matrix' });
    render(<SearchMovies movies={mockedMovies} />);

    const title = screen.getByTestId('SearchMovies-title');
    const list = screen.getByTestId('SearchMovies-list');

    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Results about: "matrix"');

    expect(list).toBeInTheDocument();
    expect(list.children).toHaveLength(mockedMovies.length);
  });

  test('Title should return correct message when are not movies', () => {
    (useSearchParams as jest.Mock).mockReturnValue({ get: () => 'matrix' });
    render(<SearchMovies movies={[]} />);

    const title = screen.getByTestId('SearchMovies-title');

    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(
      'There are no movies that matched your query "matrix"'
    );

    expect(screen.queryByTestId('SearchMovies-list')).not.toBeInTheDocument();
  });

  test('useSearchParams should have been called', () => {
    (useSearchParams as jest.Mock).mockReturnValue({ get: () => 'matrix' });

    render(<SearchMovies movies={mockedMovies} />);
    expect(useSearchParams).toHaveBeenCalled();
  });
});
