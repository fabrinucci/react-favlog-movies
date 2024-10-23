import { render, screen } from '@testing-library/react';
import { config } from '@/config';
import { generateMockedMovie } from '@/mocks/mockers';
import { MovieCardList } from '../MovieCardList';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} fill='true' />;
  },
}));

describe('Testing <MoviesCardList />', () => {
  const { MOVIE_PATH_SMALL } = config;
  const mockedMovie = generateMockedMovie();

  test('Should render the correct title', () => {
    render(<MovieCardList movie={mockedMovie} />);
    const title = screen.getByTestId('MovieCard-title');

    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(mockedMovie.title);
  });

  test('Should have the correct movie link', () => {
    const mockedMovieLink = {
      ...mockedMovie,
      id: 12,
      title: 'Inception',
    };

    render(<MovieCardList movie={mockedMovieLink} />);

    const linkElement = screen.getByRole('link');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', `/movie/12-inception`);
  });

  test('Should display the correct release year and vote average', () => {
    render(
      <MovieCardList
        movie={{
          ...mockedMovie,
          release_date: '2019-04-21',
          vote_average: 7.496,
        }}
      />
    );

    const releaseYear = screen.getByTestId('MovieCard-release_date');
    const voteAverage = screen.getByTestId('MovieCard-vote_average');

    expect(releaseYear).toBeInTheDocument();
    expect(voteAverage).toBeInTheDocument();

    expect(releaseYear).toHaveTextContent('2019');
    expect(voteAverage).toHaveTextContent('7.5');
  });

  test('Should display the correct alt and src to the image', () => {
    render(<MovieCardList movie={mockedMovie} />);

    const img = screen.getByTestId('MovieCard-img');

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute(
      'src',
      `${MOVIE_PATH_SMALL}${mockedMovie.poster_path}`
    );
    expect(img).toHaveAttribute('alt', mockedMovie.title);
  });

  test('Should have the "hidden" class in responsive', () => {
    render(<MovieCardList movie={mockedMovie} />);

    const movieInfo = screen.getByTestId('MovieCard-info-movies');
    expect(movieInfo).toHaveClass('hidden');
  });
});
