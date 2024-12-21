import { render, screen } from '@testing-library/react';
import { faker } from '@faker-js/faker';
import { config } from '@/config';
import { generateMockedMovie } from '@/mocks';
import { SearchMovieCard } from '../SearchMovieCard';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));

describe('Testing SearchMovieCard', () => {
  const mockedMovie = generateMockedMovie();
  const { MOVIE_PATH_SMALL, MOVIE_NOT_FOUND } = config;

  test('Should render movie details correctly', () => {
    render(<SearchMovieCard movie={mockedMovie} />);

    const movieTitle = screen.getByTestId('SearchMovieCard-title');
    const releaseDate = screen.getByTestId('SearchMovieCard-release');
    const overview = screen.getByTestId('SearchMovieCard-overview');

    expect(movieTitle).toBeInTheDocument();
    expect(movieTitle).toHaveTextContent(mockedMovie.title);

    expect(releaseDate).toBeInTheDocument();
    expect(releaseDate).toHaveTextContent(mockedMovie.release_date);

    expect(overview).toBeInTheDocument();
    expect(overview).toHaveTextContent(mockedMovie.overview);
  });

  test('Should truncate the movie overview to 150 characters', () => {
    const mockedMovieOverview = {
      ...mockedMovie,
      overview: faker.lorem.paragraph(30),
    };
    render(<SearchMovieCard movie={mockedMovieOverview} />);

    const overview = screen.getByTestId('SearchMovieCard-overview');

    expect(overview).toBeInTheDocument();
    expect(overview).toHaveTextContent(
      `${mockedMovieOverview.overview.slice(0, 150)}...`
    );
  });

  test('Should render image data correctly', () => {
    render(<SearchMovieCard movie={mockedMovie} />);

    const movieImage = screen.getByTestId('SearchMovieCard-img');

    expect(movieImage).toBeInTheDocument();
    expect(movieImage).toHaveAttribute('alt', mockedMovie.title);
    expect(movieImage).toHaveAttribute(
      'src',
      `${MOVIE_PATH_SMALL}${mockedMovie.poster_path}`
    );
  });

  test('Should render default image when poster_path is not available', () => {
    const mockedMoviePoster = { ...mockedMovie, poster_path: null };

    render(<SearchMovieCard movie={mockedMoviePoster} />);

    const movieImage = screen.getByTestId('SearchMovieCard-img');
    expect(movieImage).toHaveAttribute('src', MOVIE_NOT_FOUND);
    expect(movieImage).toHaveAttribute('alt', mockedMovie.title);
  });

  test('Should render the correct link', () => {
    const mockedMovieTitle = { ...mockedMovie, title: 'Monster House' };

    render(<SearchMovieCard movie={mockedMovieTitle} />);

    const movieTitleLink = screen.getByTestId('SearchMovieCard-title-link');
    const movieImgLink = screen.getByTestId('SearchMovieCard-img-link');

    expect(movieTitleLink).toBeInTheDocument();
    expect(movieTitleLink).toHaveAttribute(
      'href',
      `/movie/${mockedMovie.id}-monster-house`
    );

    expect(movieImgLink).toBeInTheDocument();
    expect(movieImgLink).toHaveAttribute(
      'href',
      `/movie/${mockedMovie.id}-monster-house`
    );
  });
});
