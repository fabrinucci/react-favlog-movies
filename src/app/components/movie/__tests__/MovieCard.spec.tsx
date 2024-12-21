import { render, screen } from '@testing-library/react';
import { MovieCard } from '../MovieCard';
import { getMovie, getMovieCast, getMovieCrew } from '@/lib';
import {
  generateMockedFullMovie,
  generateMockedMovieCreditsCast,
  generateMockedMovieCreditsCrew,
} from '@/mocks';
import { config } from '@/config';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));

jest.mock('../MovieInfo', () => ({
  MovieInfo: () => <div data-testid='MovieInfo'></div>,
}));

jest.mock('../SmallMovieCast', () => ({
  SmallMovieCast: () => <div data-testid='SmallMovieCast'></div>,
}));

jest.mock('../../../lib', () => ({
  getMovie: jest.fn(),
  getMovieCast: jest.fn(),
  getMovieCrew: jest.fn(),
}));

const { MOVIE_PATH_LARGE } = config;

describe('Testing <MovieCard />', () => {
  const mockedMovieCreditsCast = generateMockedMovieCreditsCast(10);
  const mockedMovieCreditsCrew = generateMockedMovieCreditsCrew(10);
  const mockedFullMovie = generateMockedFullMovie();

  test('Should be in the component', async () => {
    (getMovie as jest.Mock).mockResolvedValue(mockedFullMovie);
    (getMovieCast as jest.Mock).mockResolvedValue(mockedMovieCreditsCast);
    (getMovieCrew as jest.Mock).mockResolvedValue(mockedMovieCreditsCrew);

    render(await MovieCard({ id: '4' }));

    const image = screen.getByTestId('MovieCard-img');
    const cast = screen.getByTestId('MovieCard-cast');
    const castTitle = screen.getByTestId('MovieCard-cast-title');
    const castLink = screen.getByTestId('MovieCard-cast-link');
    const noCast = screen.queryByTestId('MovieCard-no-cast');

    expect(image).toBeInTheDocument();
    expect(cast).toBeInTheDocument();
    expect(noCast).not.toBeInTheDocument();
    expect(castTitle).toBeInTheDocument();
    expect(castLink).toBeInTheDocument();

    expect(screen.getByTestId('MovieInfo')).toBeInTheDocument();
    expect(screen.getByTestId('SmallMovieCast')).toBeInTheDocument();
  });

  test('Should show the cast when it is available', async () => {
    (getMovie as jest.Mock).mockResolvedValue(mockedFullMovie);
    (getMovieCast as jest.Mock).mockResolvedValue(mockedMovieCreditsCast);
    (getMovieCrew as jest.Mock).mockResolvedValue(mockedMovieCreditsCrew);

    render(await MovieCard({ id: '4' }));

    const cast = screen.queryByTestId('MovieCard-cast');
    const castTitle = screen.queryByTestId('MovieCard-cast-title');
    const castLink = screen.queryByTestId('MovieCard-cast-link');
    const noCast = screen.queryByTestId('MovieCard-no-cast');

    expect(noCast).not.toBeInTheDocument();
    expect(cast).toBeInTheDocument();
    expect(castLink).toBeInTheDocument();
    expect(castTitle).toBeInTheDocument();
    expect(castTitle).toHaveTextContent('Cast:');
  });

  test('Should not show the cast when it is not available', async () => {
    (getMovie as jest.Mock).mockResolvedValue(mockedFullMovie);
    (getMovieCast as jest.Mock).mockResolvedValue([]);
    (getMovieCrew as jest.Mock).mockResolvedValue(mockedMovieCreditsCrew);

    render(await MovieCard({ id: '4' }));

    const cast = screen.queryByTestId('MovieCard-cast');
    const castTitle = screen.queryByTestId('MovieCard-cast-title');
    const castLink = screen.queryByTestId('MovieCard-cast-link');
    const noCast = screen.queryByTestId('MovieCard-no-cast');

    expect(noCast).toBeInTheDocument();
    expect(cast).not.toBeInTheDocument();
    expect(castLink).not.toBeInTheDocument();
    expect(castTitle).toBeInTheDocument();
    expect(castTitle).toHaveTextContent('No cast available');
  });

  test('Should have the correct link', async () => {
    const mockedFullMovie = {
      ...generateMockedFullMovie(),
      title: 'The Amazing Spiderman',
    };

    (getMovie as jest.Mock).mockResolvedValue(mockedFullMovie);
    (getMovieCast as jest.Mock).mockResolvedValue(mockedMovieCreditsCast);
    (getMovieCrew as jest.Mock).mockResolvedValue(mockedMovieCreditsCrew);

    render(await MovieCard({ id: '4' }));

    const castLink = screen.queryByTestId('MovieCard-cast-link');

    expect(castLink).toHaveTextContent('View full cast');
    expect(castLink).toHaveAttribute(
      'href',
      `/movie/${mockedFullMovie.id}-the-amazing-spiderman/cast`
    );
  });

  test('Should show the correct image when the path is available', async () => {
    (getMovie as jest.Mock).mockResolvedValue(mockedFullMovie);
    (getMovieCast as jest.Mock).mockResolvedValue(mockedMovieCreditsCast);
    (getMovieCrew as jest.Mock).mockResolvedValue(mockedMovieCreditsCrew);

    render(await MovieCard({ id: '4' }));

    const defaultImage = screen.queryByTestId('MovieCard-img-default');
    const image = screen.queryByTestId('MovieCard-img');

    expect(defaultImage).not.toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(image).toHaveAccessibleName(mockedFullMovie.title);
    expect(image).toHaveAttribute(
      'src',
      `${MOVIE_PATH_LARGE}${mockedFullMovie.backdrop_path}`
    );
  });

  test('Should show the default image when the path is not available', async () => {
    (getMovie as jest.Mock).mockResolvedValue({
      ...mockedFullMovie,
      backdrop_path: '',
    });
    (getMovieCast as jest.Mock).mockResolvedValue(mockedMovieCreditsCast);
    (getMovieCrew as jest.Mock).mockResolvedValue(mockedMovieCreditsCrew);

    render(await MovieCard({ id: '4' }));

    const defaultImage = screen.queryByTestId('MovieCard-img-default');
    const image = screen.queryByTestId('MovieCard-img');

    expect(defaultImage).toBeInTheDocument();
    expect(image).not.toBeInTheDocument();
  });
});
