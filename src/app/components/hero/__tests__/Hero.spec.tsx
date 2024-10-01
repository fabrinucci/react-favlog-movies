import { render, screen } from '@testing-library/react';
import { Hero } from '../Hero';
import { getHeroMovie } from '@/lib';
import { mockedMovieResult } from '@/mocks/mockedResponse';

jest.mock('../../../lib', () => ({
  getHeroMovie: jest.fn(),
}));

describe('Testing HeroCard', () => {
  it('Should be in the document', async () => {
    (getHeroMovie as jest.Mock).mockResolvedValue(mockedMovieResult);
    render(await Hero());

    const title = screen.getByText('Movie title test');
    expect(title).toBeInTheDocument();
  });
});
