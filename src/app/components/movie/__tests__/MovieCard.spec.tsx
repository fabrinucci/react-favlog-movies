import { render, screen } from '@testing-library/react';
import { MovieCard } from '../MovieCard';
import { mockedFullMovie, mockedMovieCast } from '@/mocks/mockedResponse';
import { getMovie, getMovieCast, getMovieCrew } from '@/lib';

jest.mock('../MovieInfo', () => ({
  MovieInfo: () => <div data-testid='movie-info'></div>,
}));

jest.mock('../SmallMovieCast', () => ({
  SmallMovieCast: () => <div data-testid='small-movie-cast'></div>,
}));

jest.mock('../../../lib', () => ({
  getMovie: jest.fn(),
  getMovieCast: jest.fn(),
  getMovieCrew: jest.fn(),
}));

describe('Testing <MovieCard />', () => {
  it('Should be in the component', async () => {
    (getMovie as jest.Mock).mockResolvedValue(mockedFullMovie);
    (getMovieCast as jest.Mock).mockResolvedValue(mockedMovieCast);
    (getMovieCrew as jest.Mock).mockResolvedValue(mockedMovieCast);

    render(await MovieCard({ id: '4' }));

    const title = screen.getByText('View full cast');
    expect(title).toBeInTheDocument();
  });
});
