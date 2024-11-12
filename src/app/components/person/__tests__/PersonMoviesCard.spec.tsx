import { render, screen } from '@testing-library/react';
import { PersonMoviesCard } from '@/components/person';
import { generateMockedCreditCast } from '@/mocks/mockers';
import { config } from '@/config';

const { MOVIE_PATH_SMALL, MOVIE_NOT_FOUND } = config;

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));

describe('Testing PersonMoviesCard', () => {
  test('Should have the correct values', async () => {
    const mockedCreditsCast = generateMockedCreditCast();
    render(<PersonMoviesCard credits={mockedCreditsCast} />);

    const title = screen.getByTestId('PersonMoviesCard-title');
    const li = screen.getByTestId('PersonMoviesCard-li');
    const img = screen.getByTestId('PersonMoviesCard-img');

    expect(title).toBeInTheDocument();
    expect(li).toBeInTheDocument();
    expect(img).toBeInTheDocument();

    expect(title).toHaveTextContent(mockedCreditsCast.title);
    expect(img).toHaveAttribute(
      'src',
      `${MOVIE_PATH_SMALL}${mockedCreditsCast.poster_path}`
    );
  });

  test('Should display not found image', async () => {
    const mockedCreditsCast = generateMockedCreditCast();
    render(
      <PersonMoviesCard
        credits={{
          ...mockedCreditsCast,
          poster_path: null,
        }}
      />
    );

    const img = screen.getByTestId('PersonMoviesCard-img');
    expect(img).toHaveAttribute('src', MOVIE_NOT_FOUND);
  });

  test('Links should have the correct href', async () => {
    const mockedCreditsCast = generateMockedCreditCast();
    render(
      <PersonMoviesCard
        credits={{ ...mockedCreditsCast, id: 15, title: 'The last kingdom' }}
      />
    );

    const titleLink = screen.getByTestId('PersonMoviesCard-title-link');
    const imgLink = screen.getByTestId('PersonMoviesCard-img-link');

    expect(titleLink).toHaveAttribute('href', '/movie/15-the-last-kingdom');
    expect(imgLink).toHaveAttribute('href', '/movie/15-the-last-kingdom');
  });
});
