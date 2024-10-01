import { render, screen } from '@testing-library/react';
import { MoviesCard } from '@/components/main/MoviesCard';
import { getMovies } from '@/lib';
import { mockedMovieResult } from '@/mocks/mockedResponse';

jest.mock('../../../lib', () => ({
  getMovies: jest.fn(),
}));

describe('Testing <MoviesCard />', () => {
  it('Should be in the component', async () => {
    (getMovies as jest.Mock).mockResolvedValue([mockedMovieResult]);
    render(
      await MoviesCard({
        moviesTitle: 'Popular movies',
        movieType: 'popular',
      })
    );

    const titleMovie = screen.getByText('Movie title test');
    expect(titleMovie).toBeInTheDocument();
  });
});
