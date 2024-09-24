import { render, screen } from '@testing-library/react';
import { mockedMovieCrew } from '@/mocks/mockedResponse';
import { getMovieCrew } from '@/lib';
import { MovieCrew } from '../MovieCrew';

jest.mock('../../../lib', () => ({
  getMovieCrew: jest.fn(),
}));

describe('Testing <MovieCrew />', () => {
  it('Should be in the component', async () => {
    (getMovieCrew as jest.Mock).mockResolvedValue(mockedMovieCrew);

    render(await MovieCrew({ movieId: '4' }));

    const title = screen.getByText('Movie Title');
    expect(title).toBeInTheDocument();
  });
});
