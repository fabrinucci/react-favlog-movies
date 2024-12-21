import { render, screen } from '@testing-library/react';
import { MoviesCard } from '@/components/main/MoviesCard';
import { getMovies } from '@/lib';
import { generateMockedMovies } from '@/mocks';

jest.mock('../../../lib', () => ({
  getMovies: jest.fn(),
}));

describe('Testing <MoviesCard />', () => {
  test('Should be in the document and render the correct info', async () => {
    const mockedMovies = generateMockedMovies(12);

    (getMovies as jest.Mock).mockResolvedValue(mockedMovies);
    render(
      await MoviesCard({
        moviesTitle: 'Top movies',
        movieType: 'popular',
      })
    );

    const titleCard = screen.getByTestId('MoviesCard-title');
    const listMovies = screen.getByTestId('MoviesCard-list');
    const li = screen.getAllByTestId('MovieCard-li');

    expect(titleCard).toBeInTheDocument();
    expect(titleCard).toHaveTextContent('Top movies');

    expect(listMovies).toBeInTheDocument();
    expect(listMovies.children.length).toBe(mockedMovies.length);

    expect(li.length).toBe(mockedMovies.length);
  });
});
