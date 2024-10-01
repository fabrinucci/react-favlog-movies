import { render, screen } from '@testing-library/react';
import { mockedMovieResult } from '@/mocks/mockedResponse';
import { MovieCardList } from '../MovieCardList';

describe('Testing <MoviesCardList />', () => {
  it('Should be in the component', () => {
    render(<MovieCardList movie={mockedMovieResult} />);
    const title = screen.getByText('Movie title test');
    expect(title).toBeInTheDocument();
  });
});
