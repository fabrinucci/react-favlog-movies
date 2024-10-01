import { render, screen } from '@testing-library/react';
import { SmallMovieCast } from '../SmallMovieCast';
import { getMovieCast } from '@/lib';
import { mockedMovieCast } from '@/mocks/mockedResponse';

jest.mock('../../../lib', () => ({
  getMovieCast: jest.fn(),
}));

describe('Testing <SmallMovieCast />', () => {
  it('Should be in the component', async () => {
    (getMovieCast as jest.Mock).mockResolvedValue(mockedMovieCast);

    render(await SmallMovieCast({ movieId: '5' }));

    const title = screen.getByText('Movie Title');
    expect(title).toBeInTheDocument();
  });
});
