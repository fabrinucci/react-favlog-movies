import { render, screen } from '@testing-library/react';
import { HeroCard } from '@/components/hero/HeroCard';
import { transformToSlug } from '@/utils';
import { generateMockedMovie } from '@/mocks/mockers';

describe('Testing HeroCard', () => {
  const mockedMovie = generateMockedMovie();

  test('Should render the correct hero image', async () => {
    render(<HeroCard movie={mockedMovie} />);

    const heroImg = screen.getByTestId('hero-img');

    expect(heroImg).toBeInTheDocument();
    expect(heroImg).toHaveAttribute('alt', mockedMovie.title);
  });

  test('Should be in the document', async () => {
    render(<HeroCard movie={mockedMovie} />);

    const heroTitle = screen.getByTestId('hero-title');

    expect(heroTitle).toBeInTheDocument();
    expect(heroTitle).toHaveTextContent(mockedMovie.title);
  });

  test('Should render the correct release date', () => {
    render(<HeroCard movie={mockedMovie} />);

    const heroRelease = screen.getByTestId('hero-release');
    expect(heroRelease).toBeInTheDocument();
    expect(heroRelease).toHaveTextContent(
      `Released: ${mockedMovie.release_date}`
    );
  });

  test('Should render the correct rating', () => {
    render(<HeroCard movie={mockedMovie} />);

    const heroRating = screen.getByTestId('hero-rating');
    expect(heroRating).toBeInTheDocument();
    expect(heroRating).toHaveTextContent(
      `${mockedMovie.vote_average.toFixed(1)}`
    );
  });

  test('Link should render the correct href', () => {
    const newMockedMovie = { ...mockedMovie, title: 'The last kingdom' };
    render(<HeroCard movie={newMockedMovie} />);

    const viewButton = screen.getByTestId('hero-view-movie');
    expect(viewButton).toBeInTheDocument();
    expect(viewButton).toHaveAttribute(
      'href',
      `/movie/${mockedMovie.id}-${'the-last-kingdom'}`
    );
  });
});
