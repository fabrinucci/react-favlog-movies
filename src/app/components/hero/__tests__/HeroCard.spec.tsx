import { HeroCard } from '@/components/hero/HeroCard';
import { mockedMovieResult } from '@/mocks/mockedResponse';
import { render, screen } from '@testing-library/react';

describe('Testing HeroCard', () => {
  it('Should be in the document', () => {
    render(<HeroCard movie={mockedMovieResult} />);

    const title = screen.getByText('Movie title test');
    expect(title).toBeInTheDocument();
  });
});
