import { render, screen } from '@testing-library/react';
import { Hero } from '../Hero';
import { getHeroMovie } from '@/lib';
import { mockedMovie } from '@/mocks/mockedResponse';

jest.mock('../../../lib', () => ({
  getHeroMovie: jest.fn(),
}));

describe('Testing HeroCard', () => {
  beforeEach(async () => {
    jest.clearAllMocks();
  });

  test('Should render the correct hero image', async () => {
    (getHeroMovie as jest.Mock).mockResolvedValue(mockedMovie);
    render(await Hero());

    const heroImg = screen.getByTestId('hero-img');

    expect(heroImg).toBeInTheDocument();
    expect(heroImg).toHaveAttribute('alt', mockedMovie.title);
  });

  test('Should render the correct title', async () => {
    (getHeroMovie as jest.Mock).mockResolvedValue(mockedMovie);
    render(await Hero());

    const heroTitle = screen.getByTestId('hero-title');

    expect(heroTitle).toBeInTheDocument();
    expect(heroTitle).toHaveTextContent(mockedMovie.title);
  });

  test('getHeroMovie() should been called', async () => {
    (getHeroMovie as jest.Mock).mockResolvedValue(mockedMovie);
    render(await Hero());

    expect(getHeroMovie).toHaveBeenCalled();
    expect(getHeroMovie).toHaveBeenCalledTimes(1);
  });
});
