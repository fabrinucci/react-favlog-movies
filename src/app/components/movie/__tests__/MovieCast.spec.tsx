import { render, screen } from '@testing-library/react';
import { mockedMovieCast } from '@/mocks/mockedResponse';
import { getMovieCast } from '@/lib';
import { MovieCast } from '../MovieCast';

jest.mock('../../../lib', () => ({
  getMovieCast: jest.fn(),
}));

describe('Testing <MovieCast />', () => {
  it('Should be in the component', async () => {
    (getMovieCast as jest.Mock).mockResolvedValue(mockedMovieCast);

    render(await MovieCast({ movieId: '4' }));

    const title = screen.getByText('Movie Title');
    expect(title).toBeInTheDocument();
  });
});
