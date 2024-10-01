import { render, screen } from '@testing-library/react';
import { mockedMovieResult } from '@/mocks/mockedResponse';
import { SearchMovieCard } from '../SearchMovieCard';

describe('Testing SearchMovieCard', () => {
  it('Should be in the component', () => {
    render(<SearchMovieCard movie={mockedMovieResult} />);

    const title = screen.getByText('Movie title test');
    expect(title).toBeInTheDocument();
  });
});
