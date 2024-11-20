import { render, screen } from '@testing-library/react';
import { SmallMovieCast } from '../SmallMovieCast';
import { getMovieCast } from '@/lib';
import { generateMockedMovieCreditsCast } from '@/mocks/mockers';
import { transformToSlug } from '@/utils';
import { config } from '@/config';

const { MOVIE_PATH_SMALL, FEMALE_NOT_FOUND, MALE_NOT_FOUND } = config;

jest.mock('../../../lib', () => ({
  getMovieCast: jest.fn(),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} fill='true' />;
  },
}));

describe('Testing <SmallMovieCast />', () => {
  const mockedMovieCast = generateMockedMovieCreditsCast(10);

  describe('Test general', () => {
    test('Should be in the component', async () => {
      (getMovieCast as jest.Mock).mockResolvedValue(mockedMovieCast);

      render(await SmallMovieCast({ movieId: '5' }));

      const list = screen.getByTestId('SmallMovieCast');
      const listItems = await screen.findAllByTestId('SmallMovieCast-li');

      expect(list).toBeInTheDocument();
      expect(listItems).toHaveLength(10);
    });
  });

  describe('Test images', () => {
    test('Should have the correct src', async () => {
      (getMovieCast as jest.Mock).mockResolvedValue(mockedMovieCast);

      render(await SmallMovieCast({ movieId: '5' }));

      const images = screen.getAllByTestId('SmallMovieCast-img');

      expect(images[2]).toHaveAttribute(
        'src',
        `${MOVIE_PATH_SMALL}${mockedMovieCast[2].profile_path}`
      );

      expect(images[4]).toHaveAttribute(
        'src',
        `${MOVIE_PATH_SMALL}${mockedMovieCast[4].profile_path}`
      );
    });

    test('Should have the correct src when there is no path', async () => {
      mockedMovieCast[1].profile_path = '';
      mockedMovieCast[1].gender = 1;

      mockedMovieCast[3].profile_path = '';
      mockedMovieCast[3].gender = 2;

      mockedMovieCast[5].profile_path = '';
      mockedMovieCast[5].gender = 3;

      mockedMovieCast[7].profile_path = '';
      mockedMovieCast[7].gender = 0;

      (getMovieCast as jest.Mock).mockResolvedValue(mockedMovieCast);

      render(await SmallMovieCast({ movieId: '5' }));

      const images = screen.getAllByTestId('SmallMovieCast-img');

      expect(images[1]).toHaveAttribute('src', FEMALE_NOT_FOUND);
      expect(images[3]).toHaveAttribute('src', MALE_NOT_FOUND);
      expect(images[5]).toHaveAttribute('src', MALE_NOT_FOUND);
      expect(images[7]).toHaveAttribute('src', MALE_NOT_FOUND);
    });

    test('Should have the alt text', async () => {
      (getMovieCast as jest.Mock).mockResolvedValue(mockedMovieCast);

      render(await SmallMovieCast({ movieId: '5' }));

      const images = screen.getAllByTestId('SmallMovieCast-img');

      expect(images[1]).toHaveAttribute('alt', mockedMovieCast[1].name);
      expect(images[3]).toHaveAttribute('alt', mockedMovieCast[3].name);
      expect(images[5]).toHaveAttribute('alt', mockedMovieCast[5].name);
    });
  });

  describe('Test links', () => {
    test('Image should have the correct link', async () => {
      (getMovieCast as jest.Mock).mockResolvedValue(mockedMovieCast);

      render(await SmallMovieCast({ movieId: '5' }));
      const imgLinks = screen.getAllByTestId('SmallMovieCast-img-link');

      expect(imgLinks[1]).toHaveAttribute(
        'href',
        `/person/${mockedMovieCast[1].id}-${transformToSlug(
          mockedMovieCast[1].name
        )}`
      );

      expect(imgLinks[3]).toHaveAttribute(
        'href',
        `/person/${mockedMovieCast[3].id}-${transformToSlug(
          mockedMovieCast[3].name
        )}`
      );
    });

    test('Name should have the correct link', async () => {
      (getMovieCast as jest.Mock).mockResolvedValue(mockedMovieCast);

      render(await SmallMovieCast({ movieId: '5' }));

      const nameLinks = screen.getAllByTestId('SmallMovieCast-name-link');

      expect(nameLinks[1]).toHaveAttribute(
        'href',
        `/person/${mockedMovieCast[1].id}-${transformToSlug(
          mockedMovieCast[1].name
        )}`
      );

      expect(nameLinks[3]).toHaveAttribute(
        'href',
        `/person/${mockedMovieCast[3].id}-${transformToSlug(
          mockedMovieCast[3].name
        )}`
      );
    });

    test('Links should have an accessible name', async () => {
      (getMovieCast as jest.Mock).mockResolvedValue(mockedMovieCast);

      render(await SmallMovieCast({ movieId: '5' }));
      const imgLinks = screen.getAllByTestId('SmallMovieCast-img-link');
      const nameLinks = screen.getAllByTestId('SmallMovieCast-name-link');

      expect(imgLinks[1]).toHaveAccessibleName(mockedMovieCast[1].name);
      expect(imgLinks[3]).toHaveAccessibleName(mockedMovieCast[3].name);
      expect(imgLinks[7]).toHaveAccessibleName(mockedMovieCast[7].name);

      expect(nameLinks[2]).toHaveAccessibleName(mockedMovieCast[2].name);
      expect(nameLinks[4]).toHaveAccessibleName(mockedMovieCast[4].name);
      expect(nameLinks[6]).toHaveAccessibleName(mockedMovieCast[6].name);
    });
  });

  describe('Test name and character', () => {
    test('Should have the "..." when exceeding 22 characters.', async () => {
      mockedMovieCast[0].name = 'Carl James';
      mockedMovieCast[1].name = 'VeryLongActorNameExample';

      mockedMovieCast[4].character = 'VeryLongCharacterNameExample';

      (getMovieCast as jest.Mock).mockResolvedValue(mockedMovieCast);

      render(await SmallMovieCast({ movieId: '5' }));
      const names = screen.getAllByTestId('SmallMovieCast-name');
      const characters = screen.getAllByTestId('SmallMovieCast-character');

      expect(names[0]).toHaveTextContent('Carl James');
      expect(names[1]).toHaveTextContent('VeryLongActorNameExamp...');

      expect(characters[3]).toHaveTextContent(mockedMovieCast[3].character);
      expect(characters[4]).toHaveTextContent('VeryLongCharacterNameE...');
    });
  });
});
