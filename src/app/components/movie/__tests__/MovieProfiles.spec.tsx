import { render, screen } from '@testing-library/react';
import { MovieProfiles } from '../MovieProfiles';
import {
  generateMockedMovieCreditsCast,
  generateMockedMovieCreditsCrewF,
} from '@/mocks/mockers';
import { config } from '@/config';
import { formatStrings } from '@/utils';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} fill='true' />;
  },
}));

jest.mock('../../../lib', () => ({
  getMovieCast: jest.fn(),
}));

const { MOVIE_PATH_SMALL, FEMALE_NOT_FOUND, MALE_NOT_FOUND } = config;

describe('Testing <MovieProfiles />', () => {
  describe('Test globals', () => {
    test('Should be in the component when there is a credit cast', () => {
      const mockedMovieCreditsCast = generateMockedMovieCreditsCast(10);
      render(<MovieProfiles profiles={mockedMovieCreditsCast} />);

      const list = screen.getByTestId('MovieProfiles');
      const li = screen.getAllByTestId('MovieProfiles-li');

      expect(list).toBeInTheDocument();
      expect(list.children.length).toBe(10);
      expect(li.length).toBe(10);
    });

    test('Should be in the component when there is a credit crew', () => {
      const mockedMovieCreditsCrew = generateMockedMovieCreditsCrewF(5);

      render(<MovieProfiles profiles={mockedMovieCreditsCrew} />);

      const list = screen.getByTestId('MovieProfiles');
      const li = screen.getAllByTestId('MovieProfiles-li');

      expect(list).toBeInTheDocument();
      expect(list.children.length).toBe(5);
      expect(li.length).toBe(5);
    });
  });

  describe('Test links', () => {
    test('Should have the correct links when there is a credit cast', () => {
      const mockedMovieCreditsCast = generateMockedMovieCreditsCast(10);
      mockedMovieCreditsCast[0].name = 'Albert James';
      mockedMovieCreditsCast[2].name = 'Marlos';
      mockedMovieCreditsCast[5].name = 'William Rusell Crow';

      render(<MovieProfiles profiles={mockedMovieCreditsCast} />);

      const imgLink = screen.getAllByTestId('MovieProfiles-img-link');
      const nameLink = screen.getAllByTestId('MovieProfiles-name-link');

      expect(imgLink[0]).toHaveAttribute(
        'href',
        `/person/${mockedMovieCreditsCast[0].id}-albert-james`
      );

      expect(imgLink[2]).toHaveAttribute(
        'href',
        `/person/${mockedMovieCreditsCast[2].id}-marlos`
      );

      expect(imgLink[5]).toHaveAttribute(
        'href',
        `/person/${mockedMovieCreditsCast[5].id}-william-rusell-crow`
      );

      expect(nameLink[0]).toHaveAttribute(
        'href',
        `/person/${mockedMovieCreditsCast[0].id}-albert-james`
      );

      expect(nameLink[2]).toHaveAttribute(
        'href',
        `/person/${mockedMovieCreditsCast[2].id}-marlos`
      );

      expect(nameLink[5]).toHaveAttribute(
        'href',
        `/person/${mockedMovieCreditsCast[5].id}-william-rusell-crow`
      );
    });

    test('Should have the correct links when there is a credit crew', () => {
      const mockedMovieCreditsCrew = generateMockedMovieCreditsCrewF(10);
      mockedMovieCreditsCrew[0].name = 'Albert James';
      mockedMovieCreditsCrew[2].name = 'Marlos';
      mockedMovieCreditsCrew[5].name = 'William Rusell Crow';

      render(<MovieProfiles profiles={mockedMovieCreditsCrew} />);

      const imgLink = screen.getAllByTestId('MovieProfiles-img-link');
      const nameLink = screen.getAllByTestId('MovieProfiles-name-link');

      expect(imgLink[0]).toHaveAttribute(
        'href',
        `/person/${mockedMovieCreditsCrew[0].id}-albert-james`
      );

      expect(imgLink[2]).toHaveAttribute(
        'href',
        `/person/${mockedMovieCreditsCrew[2].id}-marlos`
      );

      expect(imgLink[5]).toHaveAttribute(
        'href',
        `/person/${mockedMovieCreditsCrew[5].id}-william-rusell-crow`
      );

      expect(nameLink[0]).toHaveAttribute(
        'href',
        `/person/${mockedMovieCreditsCrew[0].id}-albert-james`
      );

      expect(nameLink[2]).toHaveAttribute(
        'href',
        `/person/${mockedMovieCreditsCrew[2].id}-marlos`
      );

      expect(nameLink[5]).toHaveAttribute(
        'href',
        `/person/${mockedMovieCreditsCrew[5].id}-william-rusell-crow`
      );
    });
  });

  describe('Test images', () => {
    test('Should render the correct image when there is a credit cast', () => {
      const mockedMovieCreditsCast = generateMockedMovieCreditsCast(10);

      render(<MovieProfiles profiles={mockedMovieCreditsCast} />);

      const img = screen.getAllByTestId('MovieProfiles-img');

      expect(img[0]).toHaveAttribute('alt', mockedMovieCreditsCast[0].name);
      expect(img[1]).toHaveAttribute('alt', mockedMovieCreditsCast[1].name);
      expect(img[2]).toHaveAttribute('alt', mockedMovieCreditsCast[2].name);
      expect(img[3]).toHaveAttribute('alt', mockedMovieCreditsCast[3].name);
    });

    test('Should render the correct image when there is a credit crew', () => {
      const mockedMovieCreditsCrew = generateMockedMovieCreditsCrewF(10);

      render(<MovieProfiles profiles={mockedMovieCreditsCrew} />);

      const img = screen.getAllByTestId('MovieProfiles-img');

      expect(img[0]).toHaveAttribute('alt', mockedMovieCreditsCrew[0].name);
      expect(img[1]).toHaveAttribute('alt', mockedMovieCreditsCrew[1].name);
      expect(img[2]).toHaveAttribute('alt', mockedMovieCreditsCrew[2].name);
      expect(img[3]).toHaveAttribute('alt', mockedMovieCreditsCrew[3].name);
    });

    test('Should render the correct default image when there is a credit cast', () => {
      const mockedMovieCreditsCast = generateMockedMovieCreditsCast(10);

      mockedMovieCreditsCast[0].profile_path = '';
      mockedMovieCreditsCast[0].gender = 0;

      mockedMovieCreditsCast[1].gender = 1;
      mockedMovieCreditsCast[1].profile_path = '';

      mockedMovieCreditsCast[2].gender = 2;
      mockedMovieCreditsCast[2].profile_path = '';

      mockedMovieCreditsCast[3].gender = 3;
      mockedMovieCreditsCast[3].profile_path = '';

      render(<MovieProfiles profiles={mockedMovieCreditsCast} />);

      const img = screen.getAllByTestId('MovieProfiles-img');

      expect(img[0]).toHaveAttribute('src', MALE_NOT_FOUND);
      expect(img[1]).toHaveAttribute('src', FEMALE_NOT_FOUND);
      expect(img[2]).toHaveAttribute('src', MALE_NOT_FOUND);
      expect(img[3]).toHaveAttribute('src', MALE_NOT_FOUND);

      expect(img[5]).toHaveAttribute(
        'src',
        `${MOVIE_PATH_SMALL}${mockedMovieCreditsCast[5].profile_path}`
      );
      expect(img[8]).toHaveAttribute(
        'src',
        `${MOVIE_PATH_SMALL}${mockedMovieCreditsCast[8].profile_path}`
      );
    });

    test('Should render the correct default image when there is a credit crew', () => {
      const mockedMovieCreditsCrew = generateMockedMovieCreditsCrewF(10);

      mockedMovieCreditsCrew[0].profile_path = '';
      mockedMovieCreditsCrew[0].gender = 0;

      mockedMovieCreditsCrew[1].gender = 1;
      mockedMovieCreditsCrew[1].profile_path = '';

      mockedMovieCreditsCrew[2].gender = 2;
      mockedMovieCreditsCrew[2].profile_path = '';

      mockedMovieCreditsCrew[3].gender = 3;
      mockedMovieCreditsCrew[3].profile_path = '';

      render(<MovieProfiles profiles={mockedMovieCreditsCrew} />);

      const img = screen.getAllByTestId('MovieProfiles-img');

      expect(img[0]).toHaveAttribute('src', MALE_NOT_FOUND);
      expect(img[1]).toHaveAttribute('src', FEMALE_NOT_FOUND);
      expect(img[2]).toHaveAttribute('src', MALE_NOT_FOUND);
      expect(img[3]).toHaveAttribute('src', MALE_NOT_FOUND);

      expect(img[5]).toHaveAttribute(
        'src',
        `${MOVIE_PATH_SMALL}${mockedMovieCreditsCrew[5].profile_path}`
      );
      expect(img[8]).toHaveAttribute(
        'src',
        `${MOVIE_PATH_SMALL}${mockedMovieCreditsCrew[8].profile_path}`
      );
    });
  });

  describe('Test person info', () => {
    test('Should have the correct names when there is a credit cast', () => {
      const mockedMovieCreditsCast = generateMockedMovieCreditsCast(10);

      render(<MovieProfiles profiles={mockedMovieCreditsCast} />);

      const name = screen.queryAllByTestId('MovieProfiles-name');

      expect(name[0]).toBeInTheDocument();
      expect(name[1]).toBeInTheDocument();
      expect(name[2]).toBeInTheDocument();
      expect(name[3]).toBeInTheDocument();

      expect(name[0]).toHaveTextContent(mockedMovieCreditsCast[0].name);
      expect(name[1]).toHaveTextContent(mockedMovieCreditsCast[1].name);
      expect(name[2]).toHaveTextContent(mockedMovieCreditsCast[2].name);
      expect(name[3]).toHaveTextContent(mockedMovieCreditsCast[3].name);
    });

    test('Should have the correct names when there is a credit crew', () => {
      const mockedMovieCreditsCrew = generateMockedMovieCreditsCrewF(10);

      render(<MovieProfiles profiles={mockedMovieCreditsCrew} />);

      const name = screen.queryAllByTestId('MovieProfiles-name');

      expect(name[0]).toBeInTheDocument();
      expect(name[1]).toBeInTheDocument();
      expect(name[2]).toBeInTheDocument();
      expect(name[3]).toBeInTheDocument();

      expect(name[0]).toHaveTextContent(mockedMovieCreditsCrew[0].name);
      expect(name[1]).toHaveTextContent(mockedMovieCreditsCrew[1].name);
      expect(name[2]).toHaveTextContent(mockedMovieCreditsCrew[2].name);
      expect(name[3]).toHaveTextContent(mockedMovieCreditsCrew[3].name);
    });

    test('Should have the character when there is a credit cast', () => {
      const mockedMovieCreditsCast = generateMockedMovieCreditsCast(10);

      render(<MovieProfiles profiles={mockedMovieCreditsCast} />);

      const job = screen.queryAllByTestId('MovieProfiles-job');
      const character = screen.queryAllByTestId('MovieProfiles-character');

      expect(character.length).toBe(10);
      expect(job.length).toBe(0);

      expect(character[0]).toBeInTheDocument();
      expect(character[1]).toBeInTheDocument();
      expect(character[2]).toBeInTheDocument();
      expect(character[3]).toBeInTheDocument();

      expect(character[0]).toHaveTextContent(
        mockedMovieCreditsCast[0].character
      );
      expect(character[1]).toHaveTextContent(
        mockedMovieCreditsCast[1].character
      );
      expect(character[2]).toHaveTextContent(
        mockedMovieCreditsCast[2].character
      );
      expect(character[3]).toHaveTextContent(
        mockedMovieCreditsCast[3].character
      );
    });

    test('Should have the job when there is a credit crew', () => {
      const mockedMovieCreditsCrew = generateMockedMovieCreditsCrewF(10);

      render(<MovieProfiles profiles={mockedMovieCreditsCrew} />);

      const job = screen.queryAllByTestId('MovieProfiles-job');
      const character = screen.queryAllByTestId('MovieProfiles-character');

      expect(job.length).toBe(10);
      expect(character.length).toBe(0);

      expect(job[0]).toBeInTheDocument();
      expect(job[1]).toBeInTheDocument();
      expect(job[2]).toBeInTheDocument();
      expect(job[3]).toBeInTheDocument();

      expect(job[0]).toHaveTextContent(
        formatStrings(mockedMovieCreditsCrew[0].job)
      );
      expect(job[1]).toHaveTextContent(
        formatStrings(mockedMovieCreditsCrew[1].job)
      );
      expect(job[2]).toHaveTextContent(
        formatStrings(mockedMovieCreditsCrew[2].job)
      );
      expect(job[3]).toHaveTextContent(
        formatStrings(mockedMovieCreditsCrew[3].job)
      );
    });
  });
});
