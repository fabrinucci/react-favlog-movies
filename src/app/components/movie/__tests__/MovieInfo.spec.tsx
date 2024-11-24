import { render, screen } from '@testing-library/react';
import { MovieInfo } from '../MovieInfo';
import {
  generateMockedFullMovie,
  generateMockedMovieCrewFiltered,
} from '@/mocks/mockers';
import { config } from '@/config';

const { MOVIE_PATH_SMALL, MOVIE_NOT_FOUND } = config;

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} fill='true' />;
  },
}));

describe('Testing <MovieInfo />', () => {
  const mockedFullMovie = generateMockedFullMovie();
  const mockedMovieCrewFiltered = generateMockedMovieCrewFiltered(10);

  describe('Test global', () => {
    test('Should correctly render the movie info', () => {
      render(
        <MovieInfo
          movie={{ ...mockedFullMovie, release_date: '2022' }}
          movieCrew={mockedMovieCrewFiltered}
        />
      );

      const title = screen.getByTestId('MovieInfo-title');
      const release = screen.getByTestId('MovieInfo-release');
      const overview = screen.getByTestId('MovieInfo-overview');

      expect(screen.getByText('Categories:')).toBeInTheDocument();
      expect(screen.getByText('Overview:')).toBeInTheDocument();

      expect(screen.getByTestId('MovieInfo')).toBeInTheDocument();
      expect(title).toHaveTextContent(mockedFullMovie.title);
      expect(release).toHaveTextContent('2022');

      expect(overview).toContainHTML(mockedFullMovie.overview);
    });

    test('Should render a default text when there is no overview', () => {
      render(
        <MovieInfo
          movie={{ ...mockedFullMovie, overview: '' }}
          movieCrew={mockedMovieCrewFiltered}
        />
      );

      const overview = screen.getByTestId('MovieInfo-overview');

      expect(overview).toBeInTheDocument();
      expect(overview).toHaveTextContent(
        "We don't have an overview about this movie."
      );
    });
  });

  describe('Test vote average', () => {
    test('Should render "green" color when it is 8 or more', () => {
      const voteMockedMovie = {
        ...mockedFullMovie,
        vote_average: 8,
      };

      render(
        <MovieInfo
          movie={voteMockedMovie}
          movieCrew={mockedMovieCrewFiltered}
        />
      );

      const voteCount = screen.getByTestId('MovieInfo-vote-avg');
      expect(voteCount).toHaveTextContent('8');
      expect(voteCount).toHaveClass('text-green-400');
    });

    test('Should render "lime" color when it is 7.9 or less', () => {
      const voteMockedMovie = {
        ...mockedFullMovie,
        vote_average: 7.9,
      };

      render(
        <MovieInfo
          movie={voteMockedMovie}
          movieCrew={mockedMovieCrewFiltered}
        />
      );

      const voteCount = screen.getByTestId('MovieInfo-vote-avg');
      expect(voteCount).toHaveTextContent('7.9');
      expect(voteCount).toHaveClass('text-lime-400');
    });

    test('Should render "lime" color when it is 7 or more', () => {
      const voteMockedMovie = {
        ...mockedFullMovie,
        vote_average: 7,
      };

      render(
        <MovieInfo
          movie={voteMockedMovie}
          movieCrew={mockedMovieCrewFiltered}
        />
      );

      const voteCount = screen.getByTestId('MovieInfo-vote-avg');
      expect(voteCount).toHaveTextContent('7');
      expect(voteCount).toHaveClass('text-lime-400');
    });

    test('Should render "yellow" color when it is 6.9 or less', () => {
      const voteMockedMovie = {
        ...mockedFullMovie,
        vote_average: 6.9,
      };

      render(
        <MovieInfo
          movie={voteMockedMovie}
          movieCrew={mockedMovieCrewFiltered}
        />
      );

      const voteCount = screen.getByTestId('MovieInfo-vote-avg');
      expect(voteCount).toHaveTextContent('6.9');
      expect(voteCount).toHaveClass('text-yellow-300');
    });

    test('Should render "yellow" color when it is 6 or more', () => {
      const voteMockedMovie = {
        ...mockedFullMovie,
        vote_average: 6,
      };

      render(
        <MovieInfo
          movie={voteMockedMovie}
          movieCrew={mockedMovieCrewFiltered}
        />
      );

      const voteCount = screen.getByTestId('MovieInfo-vote-avg');
      expect(voteCount).toHaveTextContent('6');
      expect(voteCount).toHaveClass('text-yellow-300');
    });

    test('Should render "orange" color when it is 5.9 or less', () => {
      const voteMockedMovie = {
        ...mockedFullMovie,
        vote_average: 5.9,
      };

      render(
        <MovieInfo
          movie={voteMockedMovie}
          movieCrew={mockedMovieCrewFiltered}
        />
      );

      const voteCount = screen.getByTestId('MovieInfo-vote-avg');
      expect(voteCount).toHaveTextContent('5.9');
      expect(voteCount).toHaveClass('text-orange-400');
    });

    test('Should render "orange" color when it is no ranking', () => {
      const voteMockedMovie = {
        ...mockedFullMovie,
        vote_count: 0,
      };

      render(
        <MovieInfo
          movie={voteMockedMovie}
          movieCrew={mockedMovieCrewFiltered}
        />
      );

      const voteCount = screen.getByTestId('MovieInfo-vote-avg');
      expect(voteCount).toHaveTextContent('N/R');
    });
  });

  describe('Test images', () => {
    test('Should render correct values when there is a poster_path', () => {
      render(
        <MovieInfo
          movie={mockedFullMovie}
          movieCrew={mockedMovieCrewFiltered}
        />
      );

      const image = screen.getByTestId('MovieInfo-img');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute(
        'src',
        `${MOVIE_PATH_SMALL}${mockedFullMovie.poster_path}`
      );

      expect(image).toHaveAttribute('alt', mockedFullMovie.title);
    });

    test('Should render correct values when there is not a poster_path', () => {
      render(
        <MovieInfo
          movie={{ ...mockedFullMovie, poster_path: '' }}
          movieCrew={mockedMovieCrewFiltered}
        />
      );

      const image = screen.getByTestId('MovieInfo-img');

      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', MOVIE_NOT_FOUND);
      expect(image).toHaveAttribute('alt', mockedFullMovie.title);
    });
  });

  describe('Test categories', () => {
    const mockedFullMovie = generateMockedFullMovie();

    test('Should render correct values when there is a poster_path', () => {
      render(
        <MovieInfo
          movie={mockedFullMovie}
          movieCrew={mockedMovieCrewFiltered}
        />
      );

      const list = screen.getByTestId('MovieInfo-categories-list');
      const li = screen.getAllByTestId('MovieInfo-categories-li');
      const links = screen.getAllByTestId('MovieInfo-categories-link');

      expect(list).toBeInTheDocument();

      expect(list.children.length).toBe(mockedFullMovie.genres.length);
      expect(li.length).toBe(mockedFullMovie.genres.length);
      expect(links.length).toBe(mockedFullMovie.genres.length);

      expect(screen.getByText('Categories:')).toBeInTheDocument();
    });

    test('Should render correct values', () => {
      render(
        <MovieInfo
          movie={mockedFullMovie}
          movieCrew={mockedMovieCrewFiltered}
        />
      );

      const links = screen.getAllByTestId('MovieInfo-categories-link');

      expect(links[0]).toHaveTextContent(mockedFullMovie.genres[0].name);
      expect(links[0]).toHaveAttribute(
        'href',
        `/category/${
          mockedFullMovie.genres[0].id
        }-${mockedFullMovie.genres[0].name.toLowerCase()}`
      );
    });

    test('Should render alternative text when there are no categories', () => {
      render(
        <MovieInfo
          movie={{ ...mockedFullMovie, genres: [] }}
          movieCrew={mockedMovieCrewFiltered}
        />
      );

      const categoriesList = screen.queryByTestId('MovieInfo-categories-list');

      expect(categoriesList).not.toBeInTheDocument();
      expect(screen.queryByText('No categories yet')).toBeInTheDocument();
    });
  });

  describe('Test crew job', () => {
    test('Should render alternative text when there are no categories', () => {
      const mockedMovieCrewFiltered = generateMockedMovieCrewFiltered(4);
      render(
        <MovieInfo
          movie={mockedFullMovie}
          movieCrew={mockedMovieCrewFiltered}
        />
      );

      const crewJob = screen.queryByTestId('MovieInfo-crewjob');
      expect(crewJob).toBeInTheDocument();
    });
  });
});
